import { test, it } from 'node:test';
import { countProducts } from '../../src/helpers.js';
import assert from 'node:assert';

test("CountProducts", (t) => {
  it("should return 3", async () => {
    const result = await countProducts();
    console.log(result);
    assert.equal(await countProducts(), 3);
  });
});