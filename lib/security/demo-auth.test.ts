// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as signin } from '@/app/api/auth/signin/route';
import { POST as signup } from '@/app/api/auth/signup/route';
import { GET as google } from '@/app/api/auth/google/route';
import { demoAuthenticationUnavailable } from './demo-auth';
import { GET as withdrawal } from '@/app/api/wallet/withdraw/[withdrawalId]/route';

afterEach(() => vi.unstubAllEnvs());

describe('demo authentication isolation', () => {
  it.each(['production', 'test'])('blocks all mock routes in %s even with the flag enabled', async (mode) => {
    vi.stubEnv('NODE_ENV', mode);
    vi.stubEnv('ENABLE_DEMO_AUTH', 'true');
    for (const handler of [signin, signup, google]) {
      const response = await handler(new NextRequest('http://localhost/api/auth/test'));
      expect(response.status).toBe(503);
      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.data).toBeUndefined();
    }
  });
  it('requires explicit opt-in in development', () => {
    vi.stubEnv('NODE_ENV', 'development');
    vi.stubEnv('ENABLE_DEMO_AUTH', '');
    expect(demoAuthenticationUnavailable()?.status).toBe(503);
    vi.stubEnv('ENABLE_DEMO_AUTH', 'true');
    expect(demoAuthenticationUnavailable()).toBeNull();
  });
});

it('does not expose demo withdrawal records in production', async () => {
  vi.stubEnv('NODE_ENV', 'production');
  vi.stubEnv('ENABLE_DEMO_AUTH', 'true');
  const response = await withdrawal(new NextRequest('http://localhost/api/wallet/withdraw/test'), {
    params: Promise.resolve({ withdrawalId: 'test' }),
  });
  expect(response.status).toBe(503);
  expect((await response.json()).data).toBeUndefined();
});
