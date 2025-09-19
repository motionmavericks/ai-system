#!/usr/bin/env node
/**
 * LLM Provider Abstraction Layer
 * Supports multiple LLM backends with fallback to stub for testing
 */

/**
 * Base LLM Provider Interface
 */
export class BaseLLMProvider {
  constructor(config = {}) {
    this.config = config;
    this.requestCount = 0;
    this.requestHistory = [];
    this.retryAttempts = config.retryAttempts || 3;
    this.retryDelay = config.retryDelay || 1000;
  }

  /**
   * Complete a prompt
   * @param {string} prompt - Prompt to complete
   * @param {string} promptPath - Path to prompt file (for context)
   * @returns {Promise<string>} Completion response
   */
  async complete(prompt, promptPath = '') {
    throw new Error('complete() must be implemented by provider');
  }

  /**
   * Log request for debugging
   * @param {Object} request - Request details
   * @param {Object} response - Response details
   */
  logRequest(request, response) {
    const entry = {
      timestamp: new Date().toISOString(),
      requestId: ++this.requestCount,
      request,
      response,
      duration: response.duration
    };
    this.requestHistory.push(entry);

    // Log to console if debug mode
    if (this.config.debug) {
      console.log(`[LLM Request #${entry.requestId}]`, {
        promptPath: request.promptPath,
        promptLength: request.prompt.length,
        responseLength: response.text ? response.text.length : 0,
        duration: `${response.duration}ms`
      });
    }
  }

  /**
   * Retry logic with exponential backoff
   * @param {Function} fn - Function to retry
   * @param {number} attempts - Number of attempts remaining
   * @returns {Promise<*>} Function result
   */
  async retryWithBackoff(fn, attempts = this.retryAttempts) {
    try {
      return await fn();
    } catch (error) {
      if (attempts <= 1) {
        throw error;
      }

      const delay = this.retryDelay * Math.pow(2, this.retryAttempts - attempts);

      if (this.config.debug) {
        console.log(`Retry attempt ${this.retryAttempts - attempts + 1}, waiting ${delay}ms...`);
      }

      await new Promise(resolve => setTimeout(resolve, delay));
      return this.retryWithBackoff(fn, attempts - 1);
    }
  }

  /**
   * Get request history
   * @returns {Array} Request history
   */
  getRequestHistory() {
    return this.requestHistory;
  }

  /**
   * Clear request history
   */
  clearHistory() {
    this.requestHistory = [];
    this.requestCount = 0;
  }
}

/**
 * Stubbed LLM Provider for testing
 */
export class StubLLMProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super(config);
    this.responses = config.responses || {};
    this.defaultResponses = {
      '/command.prompt.md': JSON.stringify({
        intent: 'full_run',
        summary: 'Execute full orchestration run',
        next_prompt: 'automations/prompts/orchestrations/preflight.prompt.md'
      }),
      '/preflight.prompt.md': JSON.stringify({
        ready: true,
        summary: 'All preflight checks passed',
        checks_passed: ['queue_valid', 'dependencies_installed']
      }),
      '/run.prompt.md': JSON.stringify({
        phase: 'execution',
        ticket_id: 'TEST-001',
        next_prompt: null,
        summary: 'Orchestration complete'
      }),
      '/postflight.prompt.md': JSON.stringify({
        summary: 'Postflight validation complete',
        all_clear: true
      })
    };
  }

  async complete(prompt, promptPath = '') {
    const startTime = Date.now();

    const response = await this.retryWithBackoff(async () => {
      // Check for custom responses
      for (const [pattern, resp] of Object.entries(this.responses)) {
        if (promptPath.includes(pattern)) {
          return typeof resp === 'function' ? resp(prompt, promptPath) : resp;
        }
      }

      // Check default responses
      for (const [pattern, resp] of Object.entries(this.defaultResponses)) {
        if (promptPath.includes(pattern)) {
          return resp;
        }
      }

      // Default stub response
      return JSON.stringify({
        intent: 'unknown',
        summary: 'Stubbed response',
        notes: `No configured response for ${promptPath}`
      });
    });

    const duration = Date.now() - startTime;

    this.logRequest(
      { prompt: prompt.substring(0, 500), promptPath },
      { text: response, duration }
    );

    return response;
  }
}

/**
 * OpenAI Provider (placeholder - requires API implementation)
 */
export class OpenAIProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super(config);
    this.apiKey = config.apiKey || process.env.OPENAI_API_KEY;
    this.model = config.model || 'gpt-4';
    this.temperature = config.temperature || 0.7;
    this.maxTokens = config.maxTokens || 2000;

    if (!this.apiKey) {
      console.warn('OpenAI API key not configured, falling back to stub provider');
    }
  }

  async complete(prompt, promptPath = '') {
    if (!this.apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const startTime = Date.now();

    // Placeholder for actual API call
    // In production, this would use the OpenAI API client
    const response = await this.retryWithBackoff(async () => {
      // This would be the actual API call:
      // const completion = await openai.createChatCompletion({
      //   model: this.model,
      //   messages: [{ role: 'user', content: prompt }],
      //   temperature: this.temperature,
      //   max_tokens: this.maxTokens
      // });
      // return completion.data.choices[0].message.content;

      // For now, throw to indicate not implemented
      throw new Error('OpenAI provider not yet implemented - API integration pending');
    });

    const duration = Date.now() - startTime;

    this.logRequest(
      { prompt: prompt.substring(0, 500), promptPath, model: this.model },
      { text: response, duration }
    );

    return response;
  }
}

/**
 * Anthropic Provider (placeholder - requires API implementation)
 */
export class AnthropicProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super(config);
    this.apiKey = config.apiKey || process.env.ANTHROPIC_API_KEY;
    this.model = config.model || 'claude-3-opus-20240229';
    this.maxTokens = config.maxTokens || 2000;

    if (!this.apiKey) {
      console.warn('Anthropic API key not configured, falling back to stub provider');
    }
  }

  async complete(prompt, promptPath = '') {
    if (!this.apiKey) {
      throw new Error('Anthropic API key not configured');
    }

    const startTime = Date.now();

    // Placeholder for actual API call
    const response = await this.retryWithBackoff(async () => {
      // This would be the actual API call:
      // const completion = await anthropic.complete({
      //   model: this.model,
      //   prompt: prompt,
      //   max_tokens: this.maxTokens
      // });
      // return completion.text;

      // For now, throw to indicate not implemented
      throw new Error('Anthropic provider not yet implemented - API integration pending');
    });

    const duration = Date.now() - startTime;

    this.logRequest(
      { prompt: prompt.substring(0, 500), promptPath, model: this.model },
      { text: response, duration }
    );

    return response;
  }
}

/**
 * Local Model Provider (placeholder for local LLM support)
 */
export class LocalModelProvider extends BaseLLMProvider {
  constructor(config = {}) {
    super(config);
    this.modelPath = config.modelPath;
    this.modelType = config.modelType || 'llama';
  }

  async complete(prompt, promptPath = '') {
    // Placeholder for local model execution
    // This would integrate with llama.cpp, ollama, or similar
    throw new Error('Local model provider not yet implemented');
  }
}

/**
 * LLM Provider Factory
 */
export class LLMProviderFactory {
  static providers = {
    stub: StubLLMProvider,
    openai: OpenAIProvider,
    anthropic: AnthropicProvider,
    local: LocalModelProvider
  };

  /**
   * Create an LLM provider instance
   * @param {string} type - Provider type
   * @param {Object} config - Provider configuration
   * @returns {BaseLLMProvider} Provider instance
   */
  static create(type = null, config = {}) {
    // Determine provider type from environment if not specified
    if (!type) {
      if (process.env.LLM_PROVIDER) {
        type = process.env.LLM_PROVIDER.toLowerCase();
      } else if (process.env.OPENAI_API_KEY) {
        type = 'openai';
      } else if (process.env.ANTHROPIC_API_KEY) {
        type = 'anthropic';
      } else {
        type = 'stub';
      }
    }

    const ProviderClass = this.providers[type];

    if (!ProviderClass) {
      console.warn(`Unknown provider type: ${type}, falling back to stub`);
      return new StubLLMProvider(config);
    }

    try {
      const provider = new ProviderClass(config);

      // Test if provider is functional (has API key if needed)
      if (type !== 'stub' && type !== 'local') {
        const hasApiKey = (type === 'openai' && process.env.OPENAI_API_KEY) ||
                         (type === 'anthropic' && process.env.ANTHROPIC_API_KEY);

        if (!hasApiKey) {
          console.warn(`No API key for ${type} provider, falling back to stub`);
          return new StubLLMProvider(config);
        }
      }

      console.log(`✅ Using ${type} LLM provider`);
      return provider;
    } catch (error) {
      console.warn(`Failed to initialize ${type} provider: ${error.message}, falling back to stub`);
      return new StubLLMProvider(config);
    }
  }

  /**
   * Register a custom provider
   * @param {string} name - Provider name
   * @param {Class} providerClass - Provider class
   */
  static register(name, providerClass) {
    this.providers[name] = providerClass;
  }
}

/**
 * Default export - create provider from environment
 */
export function createLLMProvider(config = {}) {
  return LLMProviderFactory.create(null, config);
}