// helpers.test.js
import { describe, it, expect } from 'vitest';
import { Settings } from '../../src/settings';

describe('Settings', () => {
  it('Settings is not undefined', () => {
    expect(Settings).toBeDefined();
  });
});