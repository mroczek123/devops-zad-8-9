import { test } from 'node:test';
import assert from 'node:assert';
import { Settings } from '../../src/settings.js';

test("Settings is not undefined", (t) => {
  assert.notStrictEqual(Settings, undefined);
});