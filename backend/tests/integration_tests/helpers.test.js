// helpers.test.js
import { describe, it, expect } from 'vitest';
import { countProducts } from '../../src/helpers';

describe('countProducts', () => {
  it('countProducts returns 3', () => {
    expect(countProducts()).toBe(3);
  });
});