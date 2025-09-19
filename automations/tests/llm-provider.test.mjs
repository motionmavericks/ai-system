#!/usr/bin/env node
import { describe, it } from 'node:test';
import assert from 'assert';
import {
  BaseLLMProvider,
  StubLLMProvider,
  OpenAIProvider,
  AnthropicProvider,
  LLMProviderFactory,
  createLLMProvider
} from '../lib/llm-provider.mjs';

describe('LLM Provider Abstraction', () => {
  describe('BaseLLMProvider', () => {
    it('should require complete() implementation', async () => {
      const provider = new BaseLLMProvider();
      await assert.rejects(
        async () => await provider.complete('test'),
        /complete\(\) must be implemented/,
        'Should throw error for unimplemented complete()'
      );
    });

    it('should track request history', async () => {
      const provider = new BaseLLMProvider({ debug: false });
      provider.logRequest(
        { prompt: 'test prompt', promptPath: 'test.md' },
        { text: 'response', duration: 100 }
      );

      const history = provider.getRequestHistory();
      assert.equal(history.length, 1, 'Should have one request in history');
      assert.equal(history[0].request.prompt, 'test prompt');
      assert.equal(history[0].response.text, 'response');
      assert.equal(history[0].requestId, 1);
    });

    it('should clear history', () => {
      const provider = new BaseLLMProvider();
      provider.logRequest({ prompt: 'test' }, { text: 'response', duration: 50 });
      provider.clearHistory();

      assert.equal(provider.getRequestHistory().length, 0, 'History should be empty');
      assert.equal(provider.requestCount, 0, 'Request count should reset');
    });

    it('should handle retry with backoff', async () => {
      const provider = new BaseLLMProvider({ retryAttempts: 3, retryDelay: 10 });
      let attemptCount = 0;

      const result = await provider.retryWithBackoff(async () => {
        attemptCount++;
        if (attemptCount < 3) {
          throw new Error('Temporary failure');
        }
        return 'success';
      });

      assert.equal(result, 'success', 'Should eventually succeed');
      assert.equal(attemptCount, 3, 'Should retry correct number of times');
    });

    it('should throw after max retries', async () => {
      const provider = new BaseLLMProvider({ retryAttempts: 2, retryDelay: 10 });

      await assert.rejects(
        async () => await provider.retryWithBackoff(async () => {
          throw new Error('Persistent failure');
        }),
        /Persistent failure/,
        'Should throw original error after retries'
      );
    });
  });

  describe('StubLLMProvider', () => {
    it('should provide default responses', async () => {
      const provider = new StubLLMProvider();

      const response = await provider.complete('test', 'automations/prompts/orchestrations/command.prompt.md');
      const parsed = JSON.parse(response);

      assert.equal(parsed.intent, 'full_run', 'Should return default command response');
      assert.ok(parsed.next_prompt, 'Should have next prompt');
    });

    it('should use custom responses', async () => {
      const customResponse = JSON.stringify({ custom: true, data: 'test' });
      const provider = new StubLLMProvider({
        responses: {
          'custom.prompt': customResponse
        }
      });

      const response = await provider.complete('test', 'path/to/custom.prompt.md');
      const parsed = JSON.parse(response);

      assert.equal(parsed.custom, true, 'Should use custom response');
      assert.equal(parsed.data, 'test', 'Should have custom data');
    });

    it('should support function responses', async () => {
      const provider = new StubLLMProvider({
        responses: {
          'dynamic': (prompt, path) => JSON.stringify({
            received_prompt: prompt.substring(0, 10),
            received_path: path
          })
        }
      });

      const response = await provider.complete('test prompt content', 'dynamic.prompt.md');
      const parsed = JSON.parse(response);

      assert.equal(parsed.received_prompt, 'test promp', 'Should pass prompt to function');
      assert.equal(parsed.received_path, 'dynamic.prompt.md', 'Should pass path to function');
    });

    it('should return default stub for unknown prompts', async () => {
      const provider = new StubLLMProvider();
      const response = await provider.complete('test', 'unknown/path.md');
      const parsed = JSON.parse(response);

      assert.equal(parsed.intent, 'unknown', 'Should return unknown intent');
      assert.ok(parsed.notes.includes('No configured response'), 'Should indicate no configured response');
    });

    it('should log requests in debug mode', async () => {
      const provider = new StubLLMProvider({ debug: true });
      await provider.complete('test', 'test.prompt.md');

      const history = provider.getRequestHistory();
      assert.equal(history.length, 1, 'Should log request');
      assert.ok(history[0].response.duration >= 0, 'Should track duration');
    });
  });

  describe('OpenAIProvider', () => {
    it('should warn when API key is missing', () => {
      const originalEnv = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const provider = new OpenAIProvider();
      assert.ok(!provider.apiKey, 'Should not have API key');

      // Restore env
      if (originalEnv) process.env.OPENAI_API_KEY = originalEnv;
    });

    it('should throw error when attempting to use without API key', async () => {
      const originalEnv = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const provider = new OpenAIProvider();

      await assert.rejects(
        async () => await provider.complete('test'),
        /API key not configured/,
        'Should throw when no API key'
      );

      // Restore env
      if (originalEnv) process.env.OPENAI_API_KEY = originalEnv;
    });

    it('should configure model and parameters', () => {
      const provider = new OpenAIProvider({
        apiKey: 'test-key',
        model: 'gpt-3.5-turbo',
        temperature: 0.5,
        maxTokens: 1000
      });

      assert.equal(provider.model, 'gpt-3.5-turbo', 'Should set custom model');
      assert.equal(provider.temperature, 0.5, 'Should set custom temperature');
      assert.equal(provider.maxTokens, 1000, 'Should set custom max tokens');
    });
  });

  describe('AnthropicProvider', () => {
    it('should warn when API key is missing', () => {
      const originalEnv = process.env.ANTHROPIC_API_KEY;
      delete process.env.ANTHROPIC_API_KEY;

      const provider = new AnthropicProvider();
      assert.ok(!provider.apiKey, 'Should not have API key');

      // Restore env
      if (originalEnv) process.env.ANTHROPIC_API_KEY = originalEnv;
    });

    it('should throw error when attempting to use without API key', async () => {
      const originalEnv = process.env.ANTHROPIC_API_KEY;
      delete process.env.ANTHROPIC_API_KEY;

      const provider = new AnthropicProvider();

      await assert.rejects(
        async () => await provider.complete('test'),
        /API key not configured/,
        'Should throw when no API key'
      );

      // Restore env
      if (originalEnv) process.env.ANTHROPIC_API_KEY = originalEnv;
    });

    it('should configure model and parameters', () => {
      const provider = new AnthropicProvider({
        apiKey: 'test-key',
        model: 'claude-3-haiku',
        maxTokens: 500
      });

      assert.equal(provider.model, 'claude-3-haiku', 'Should set custom model');
      assert.equal(provider.maxTokens, 500, 'Should set custom max tokens');
    });
  });

  describe('LLMProviderFactory', () => {
    it('should create stub provider by default', () => {
      const originalEnv = {
        provider: process.env.LLM_PROVIDER,
        openai: process.env.OPENAI_API_KEY,
        anthropic: process.env.ANTHROPIC_API_KEY
      };

      // Clear all env vars
      delete process.env.LLM_PROVIDER;
      delete process.env.OPENAI_API_KEY;
      delete process.env.ANTHROPIC_API_KEY;

      const provider = LLMProviderFactory.create();
      assert.ok(provider instanceof StubLLMProvider, 'Should create stub provider');

      // Restore env
      if (originalEnv.provider) process.env.LLM_PROVIDER = originalEnv.provider;
      if (originalEnv.openai) process.env.OPENAI_API_KEY = originalEnv.openai;
      if (originalEnv.anthropic) process.env.ANTHROPIC_API_KEY = originalEnv.anthropic;
    });

    it('should create provider based on LLM_PROVIDER env', () => {
      const originalEnv = process.env.LLM_PROVIDER;

      process.env.LLM_PROVIDER = 'stub';
      const stubProvider = LLMProviderFactory.create();
      assert.ok(stubProvider instanceof StubLLMProvider, 'Should create stub provider');

      // Restore env
      if (originalEnv) {
        process.env.LLM_PROVIDER = originalEnv;
      } else {
        delete process.env.LLM_PROVIDER;
      }
    });

    it('should fall back to stub for unknown provider types', () => {
      const provider = LLMProviderFactory.create('unknown-provider');
      assert.ok(provider instanceof StubLLMProvider, 'Should fall back to stub');
    });

    it('should fall back to stub when API key is missing', () => {
      const originalEnv = process.env.OPENAI_API_KEY;
      delete process.env.OPENAI_API_KEY;

      const provider = LLMProviderFactory.create('openai');
      assert.ok(provider instanceof StubLLMProvider, 'Should fall back to stub without API key');

      // Restore env
      if (originalEnv) process.env.OPENAI_API_KEY = originalEnv;
    });

    it('should register custom providers', () => {
      class CustomProvider extends BaseLLMProvider {
        async complete(prompt) {
          return 'custom response';
        }
      }

      LLMProviderFactory.register('custom', CustomProvider);
      const provider = LLMProviderFactory.create('custom');
      assert.ok(provider instanceof CustomProvider, 'Should create custom provider');
    });
  });

  describe('createLLMProvider helper', () => {
    it('should create provider with config', () => {
      const provider = createLLMProvider({ debug: true, retryAttempts: 5 });
      assert.ok(provider, 'Should create provider');
      assert.equal(provider.config.debug, true, 'Should pass debug config');
      assert.equal(provider.retryAttempts, 5, 'Should pass retry config');
    });

    it('should respect USE_STUBBED_LLM environment variable', () => {
      const originalEnv = process.env.USE_STUBBED_LLM;
      process.env.USE_STUBBED_LLM = 'true';

      const provider = createLLMProvider();
      assert.ok(provider instanceof StubLLMProvider, 'Should use stubbed LLM when USE_STUBBED_LLM=true');

      // Restore env
      if (originalEnv) {
        process.env.USE_STUBBED_LLM = originalEnv;
      } else {
        delete process.env.USE_STUBBED_LLM;
      }
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete orchestration flow with stub', async () => {
      const provider = new StubLLMProvider();

      // Command prompt
      const cmdResponse = await provider.complete('start', 'orchestrations/command.prompt.md');
      const cmdParsed = JSON.parse(cmdResponse);
      assert.equal(cmdParsed.intent, 'full_run');
      assert.ok(cmdParsed.next_prompt.includes('preflight'));

      // Preflight prompt
      const preflightResponse = await provider.complete('preflight', cmdParsed.next_prompt);
      const preflightParsed = JSON.parse(preflightResponse);
      assert.equal(preflightParsed.ready, true);
      assert.ok(preflightParsed.checks_passed.includes('queue_valid'));

      // Run prompt
      const runResponse = await provider.complete('run', 'orchestrations/run.prompt.md');
      const runParsed = JSON.parse(runResponse);
      assert.equal(runParsed.phase, 'execution');
      assert.ok(runParsed.ticket_id);

      // Postflight prompt
      const postResponse = await provider.complete('post', 'orchestrations/postflight.prompt.md');
      const postParsed = JSON.parse(postResponse);
      assert.equal(postParsed.all_clear, true);
    });

    it('should track metrics across multiple requests', async () => {
      const provider = new StubLLMProvider({ debug: false });

      // Make several requests
      await provider.complete('test1', 'prompt1.md');
      await provider.complete('test2', 'prompt2.md');
      await provider.complete('test3', 'prompt3.md');

      const history = provider.getRequestHistory();
      assert.equal(history.length, 3, 'Should track all requests');
      assert.equal(history[0].requestId, 1, 'Should number requests sequentially');
      assert.equal(history[2].requestId, 3, 'Should continue numbering');

      // Each should have duration
      history.forEach(entry => {
        assert.ok(entry.response.duration >= 0, 'Should track duration');
        assert.ok(entry.timestamp, 'Should have timestamp');
      });
    });
  });
});

// Run the tests
if (import.meta.url.startsWith('file:')) {
  console.log('🧪 Running LLM Provider Tests...\n');
}