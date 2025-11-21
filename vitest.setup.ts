import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

// Ensure fetch exists for tests; individual tests can override.
if (!global.fetch) {
  global.fetch = vi.fn();
}

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

