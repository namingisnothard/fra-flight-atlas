import test from 'node:test';
import assert from 'node:assert/strict';
import { interiorAreas, interiorFloors } from '../app/airport-interior-data.ts';

test('every interior has unique selectable places and valid area/floor connections', () => {
  for (const area of Object.keys(interiorAreas)) {
    const floors = interiorFloors(area);
    assert.equal(floors.length === 0, area === 't2');
    for (const floor of floors) {
      assert.equal(new Set(floor.places.map(p => p.id)).size, floor.places.length);
      for (const p of floor.places) {
        if (p.area) assert.ok(interiorAreas[p.area]);
        if (p.floor) assert.ok(floors.some(f => f.id === p.floor));
        assert.ok(p.width > 0 && p.depth > 0);
      }
    }
  }
});
test('station views distinguish regional tracks 1–3 from long-distance tracks 4–7', () => {
  for (const [area, numbers] of [['regional', [1, 2, 3]], ['ice', [4, 5, 6, 7]]]) {
    const platforms = interiorFloors(area).find(f => f.id === 'platforms');
    assert.deepEqual(platforms.places.filter(p => p.kind === 'platform').map(p => p.name), numbers.map(n => `Platform ${n}`));
    assert.ok(platforms.places.some(p => p.floor === 'concourse'));
  }
});
test('demo interiors never fabricate a position for a real gate', () => {
  for (const area of Object.keys(interiorAreas)) for (const floor of interiorFloors(area)) {
    assert.equal(floor.places.some(p => p.gate || p.id === 'target'), false);
  }
});
