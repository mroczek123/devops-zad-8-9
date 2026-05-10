import {countProducts} from "./helpers.js"

test('countProducts returns number', () => {
  expect(countProducts()).toBe("number");
});