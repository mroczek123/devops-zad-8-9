import { test, it } from 'node:test';
import { countProducts } from '../../src/helpers.js';
import assert from 'node:assert';

test("CountProducts", async (t) => {
  const result = await countProducts();
  t.diagnostic(result);
  assert.equal(result, 3);
});