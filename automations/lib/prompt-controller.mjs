#!/usr/bin/env node
import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createLLMProvider } from './llm-provider.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');

/**
 * Prompt Controller - Manages execution of orchestration and agent prompts
 * This module loads prompt files, executes them via LLM, and controls the flow
 */

export class PromptController {
  constructor(llmInterface) {
    this.llm = llmInterface;
    this.promptCache = new Map();
  }

  /**
   * Load a prompt file from disk
   * @param {string} promptPath - Relative path to prompt file
   * @returns {Promise<string>} Prompt content
   */
  async loadPrompt(promptPath) {
    if (this.promptCache.has(promptPath)) {
      return this.promptCache.get(promptPath);
    }

    const fullPath = resolve(repoRoot, promptPath);
    if (!existsSync(fullPath)) {
      throw new Error(`Prompt file not found: ${promptPath}`);
    }

    const content = await readFile(fullPath, 'utf8');
    this.promptCache.set(promptPath, content);
    return content;
  }

  /**
   * Build context object for prompt execution
   * @param {Object} params - Context parameters
   * @returns {Object} Structured context
   */
  buildContext(params) {
    const {
      operatorIntent,
      runState,
      queue,
      ticket,
      memoryPaths,
      guardResults,
      agentOutput,
      phase
    } = params;

    return {
      operator_intent: operatorIntent,
      run_state: runState,
      queue: queue,
      current_ticket: ticket,
      memory_paths: memoryPaths || {},
      guard_evaluation: guardResults,
      previous_agent_output: agentOutput,
      current_phase: phase,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Execute a prompt with given context
   * @param {string} promptPath - Path to prompt file
   * @param {Object} context - Execution context
   * @returns {Promise<Object>} Structured response from LLM
   */
  async executePrompt(promptPath, context) {
    const promptContent = await this.loadPrompt(promptPath);

    // Build the full prompt with context
    const enrichedContext = {
      prompt_path: promptPath,
      ...(context || {})
    };

    const fullPrompt = this.formatPrompt(promptContent, enrichedContext);

    // Call the LLM interface
    const response = await this.llm.complete(fullPrompt, promptPath);

    // Parse and validate the response
    return this.parseResponse(response);
  }

  /**
   * Format prompt with context injection
   * @param {string} promptContent - Raw prompt content
   * @param {Object} context - Context to inject
   * @returns {string} Formatted prompt
   */
  formatPrompt(promptContent, context) {
    // Inject context at the beginning of the prompt
    const contextBlock = `
## Current Context
\`\`\`json
${JSON.stringify(context, null, 2)}
\`\`\`

`;

    return contextBlock + promptContent;
  }

  /**
   * Parse LLM response and extract structured data
   * @param {string} response - Raw LLM response
   * @returns {Object} Parsed response object
   */
  parseResponse(response) {
    // Extract JSON from the response
    const jsonMatch = response.match(/```json\n([\s\S]*?)\n```/);
    if (!jsonMatch) {
      // Try to parse the entire response as JSON
      try {
        return JSON.parse(response);
      } catch (e) {
        throw new Error('Failed to parse LLM response as JSON: ' + e.message);
      }
    }

    try {
      return JSON.parse(jsonMatch[1]);
    } catch (e) {
      throw new Error('Failed to parse JSON from LLM response: ' + e.message);
    }
  }

  /**
   * Execute the control loop for orchestration
   * @param {string} startPrompt - Initial prompt to execute
   * @param {Object} initialContext - Initial context
   * @returns {Promise<Object>} Final execution result
   */
  async runControlLoop(startPrompt, initialContext) {
    let currentPrompt = startPrompt;
    let context = { ...initialContext };
    let history = [];
    const maxIterations = 100; // Safety limit

    for (let i = 0; i < maxIterations; i++) {
      // Execute current prompt
      const result = await this.executePrompt(currentPrompt, context);
      history.push({
        prompt: currentPrompt,
        response: result,
        timestamp: new Date().toISOString()
      });

      // Check for completion
      if (!result.next_prompt) {
        return {
          completed: true,
          final_result: result,
          history,
          iterations: i + 1
        };
      }

      // Check for clarification needed
      if (result.intent === 'clarify') {
        return {
          completed: false,
          clarification_needed: true,
          question: result.notes,
          history,
          iterations: i + 1
        };
      }

      // Update context with response data
      if (result.updates) {
        context = this.mergeContext(context, result.updates);
      }

      // Add previous result to context for next iteration
      context.previous_agent_output = result;

      // Move to next prompt
      currentPrompt = result.next_prompt;

      // Handle follow-on prompts if specified
      if (result.follow_on && result.follow_on.length > 0) {
        context.follow_on_prompts = result.follow_on;
      }
    }

    throw new Error('Control loop exceeded maximum iterations');
  }

  /**
   * Merge context updates
   * @param {Object} current - Current context
   * @param {Object} updates - Updates to apply
   * @returns {Object} Merged context
   */
  mergeContext(current, updates) {
    const merged = { ...current };

    if (updates.run_state) {
      merged.run_state = { ...merged.run_state, ...updates.run_state };
    }

    if (updates.memory) {
      merged.memory_paths = {
        ...merged.memory_paths,
        updated: [...(merged.memory_paths.updated || []), ...updates.memory]
      };
    }

    if (updates.telemetry) {
      merged.telemetry_commands = [...(merged.telemetry_commands || []), ...updates.telemetry];
    }

    return merged;
  }

  /**
   * Clear the prompt cache
   */
  clearCache() {
    this.promptCache.clear();
  }
}

/**
 * Stubbed LLM interface for testing
 * Replace this with actual LLM integration
 */
export class StubbedLLMInterface {
  constructor(responses = {}) {
    this.responses = responses;
    this.callCount = 0;
    this.callHistory = [];
  }

  async complete(prompt, promptPath = '') {
    this.callHistory.push({
      call: this.callCount++,
      prompt,
      promptPath,
      timestamp: new Date().toISOString()
    });

    if (promptPath) {
      for (const [pattern, response] of Object.entries(this.responses)) {
        if (promptPath.endsWith(pattern) || promptPath.includes(pattern)) {
          return typeof response === 'function' ? response(prompt, promptPath) : response;
        }
      }
    }

    // Check for predefined response based on prompt content
    for (const [pattern, response] of Object.entries(this.responses)) {
      if (prompt.includes(pattern) || (promptPath && promptPath.includes(pattern))) {
        return typeof response === 'function' ? response(prompt) : response;
      }
    }

    // Default response for testing
    return JSON.stringify({
      intent: 'full_run',
      summary: 'Stubbed LLM response',
      next_prompt: null,
      follow_on: [],
      notes: 'This is a stubbed response for testing'
    });
  }

  getCallHistory() {
    return this.callHistory;
  }

  reset() {
    this.callCount = 0;
    this.callHistory = [];
  }
}

/**
 * Factory function to create a prompt controller
 * @param {Object} llmInterface - LLM interface implementation
 * @returns {PromptController} Controller instance
 */
export function createPromptController(llmInterface = null) {
  // Use the new LLM provider abstraction if no interface provided
  const llm = llmInterface || createLLMProvider({
    debug: process.env.LLM_DEBUG === 'true',
    retryAttempts: parseInt(process.env.LLM_RETRY_ATTEMPTS || '3'),
    retryDelay: parseInt(process.env.LLM_RETRY_DELAY || '1000')
  });
  return new PromptController(llm);
}
