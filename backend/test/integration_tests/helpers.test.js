import { test, it, assert } from 'node:test';
import { countProducts } from '../../src/helpers.js';
// import assert from 'node:assert';

test("CountProducts", (t) => {
  it("should return 3", async () => {
    assert.equal(await countProducts(), 3);
  });
});