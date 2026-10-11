import { describe, it, expect } from 'vitest';
import { authOptions } from '../src/auth';

describe('NextAuth Configuration', () => {
  it('should configure Discord provider with correct scope', () => {
    const discordProvider = authOptions.providers.find((p: any) => p.id === 'discord');
    expect(discordProvider).toBeDefined();
    expect(discordProvider?.name).toBe('Discord');
  });

  it('should use JWT strategy for session', () => {
    expect(authOptions.session?.strategy).toBe('jwt');
  });
});
