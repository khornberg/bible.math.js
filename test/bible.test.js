import { test } from 'qunit';
import Bible from '../bible2';

test('Can istantiate Bible', assert => {
  assert.ok(new Bible());
});

test('Can call Bible method', assert => {
  assert.ok(new Bible().aFunction());
});
