import test from 'node:test';
import assert from 'node:assert/strict';
import { parseGate, estimateJourney, routePoints, origins, concourses, frankfurtTimestamp, frankfurtInput } from '../app/airport-data.ts';

test('gate input rejects closed Terminal 2 and malformed identifiers', () => {
  for (const gate of ['D12', 'E5', '', 'Z0', 'A-12', 'ABC', 'B9999']) assert.equal(parseGate(gate), null);
  assert.equal(parseGate(' z 50 '), 'Z');
  assert.equal(parseGate('J'), 'J');
});
test('all available origin/concourse combinations have continuous schematic paths with correct endpoints', () => {
  for (const [origin, start] of Object.entries(origins)) for (const [concourse, end] of Object.entries(concourses)) {
    const path = routePoints(origin, concourse);
    assert.deepEqual(path[0], start.point);
    assert.deepEqual(path.at(-1), end.point);
    for (let i = 1; i < path.length; i++) assert.notDeepEqual(path[i], path[i - 1]);
    const timing = estimateJourney(origin, concourse, 1, 20, 10, 0, 15);
    assert.equal(timing.train, start.terminal === end.terminal ? 0 : 12);
  }
});
test('queue, walking, transfer and buffer allowances all contribute without double counting', () => {
  const base = estimateJourney('ice', 'Z', 1, 20, 10, 0, 15);
  assert.equal(base.walking, 29);
  assert.equal(base.journey, 59);
  assert.equal(base.total, 74);
  const slower = estimateJourney('ice', 'Z', 1.4, 20, 10, 25, 15);
  assert.equal(slower.total - base.total, 37);
  const direct = estimateJourney('t3', 'H', 1, 0, 0, 0, 0);
  assert.equal(direct.total, 13);
});
test('Frankfurt time is independent of the viewer’s timezone and handles midnight and DST', () => {
  assert.equal(frankfurtTimestamp('2026-09-06T00:30'), Date.parse('2026-09-05T22:30:00Z'));
  assert.equal(frankfurtTimestamp('2026-01-06T12:30'), Date.parse('2026-01-06T11:30:00Z'));
  assert.equal(frankfurtTimestamp('2026-03-29T02:30'), null); // clock jumps ahead
  assert.equal(frankfurtTimestamp('2026-10-25T02:30'), null); // ambiguous hour
  assert.equal(frankfurtTimestamp('2026-02-30T12:30'), null);
  assert.equal(frankfurtTimestamp(''), null);
  assert.equal(frankfurtInput(Date.parse('2026-09-05T22:30:00Z')), '2026-09-06T00:30');
});
