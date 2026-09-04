import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { zoomAt, interpolateCamera, markerDiameter, MIN_ZOOM, MAX_ZOOM } from '../app/atlas-camera.ts';
import { flights } from '../app/flights.ts';
import { routes } from '../app/routes.ts';
const meta = JSON.parse(fs.readFileSync(new URL('../app/flight-data-meta.json', import.meta.url)));

test('zoom preserves the map point under the cursor, including at zoom limits', () => {
  for (const base of [.38, 1, 1.4]) for (const factor of [.01, .75, 1.4, 100]) {
    const camera = { x: 535, y: 180, zoom: 3 };
    const anchor = { x: 173, y: -96 };
    const next = zoomAt(camera, factor, anchor, base);
    assert.ok(Math.abs(camera.x + anchor.x / (base * camera.zoom) - next.x - anchor.x / (base * next.zoom)) < 1e-9);
    assert.ok(Math.abs(camera.y + anchor.y / (base * camera.zoom) - next.y - anchor.y / (base * next.zoom)) < 1e-9);
    assert.ok(next.zoom >= MIN_ZOOM && next.zoom <= MAX_ZOOM);
  }
});
test('airport dots stay legible and restrained at every supported zoom', () => {
  for (let zoom = MIN_ZOOM; zoom <= MAX_ZOOM; zoom += .1) assert.ok(markerDiameter(zoom) >= 3.8 && markerDiameter(zoom) <= 7);
});
test('refreshed week uses unambiguous consecutive dates across month boundaries', () => {
  assert.equal(meta.dates.length, 7);
  meta.dates.forEach((date, i) => { if (i) assert.equal(Date.parse(date) - Date.parse(meta.dates[i - 1]), 86400000); });
  assert.ok(meta.availableDates.includes(meta.selectedDate));
  assert.equal(meta.failures.length, 0);
});
test('every flight is unique and maps to a known destination with valid timezone', () => {
  const airports = new Map(routes.map(route => [route.iata, route]));
  assert.equal(new Set(flights.map(flight => JSON.stringify(flight))).size, flights.length);
  assert.equal(meta.recordCount, flights.length);
  for (const flight of flights) {
    assert.ok(meta.availableDates.includes(flight[0]));
    assert.notEqual(flight[2], 'FRA');
    assert.ok(airports.has(flight[2]), `Missing ${flight[2]}`);
    assert.match(flight[3], /^(\d{2}:\d{2}|—)$/);
    assert.match(flight[4], /^(\d{2}:\d{2}|—)$/);
  }
  for (const route of routes) {
    assert.ok(Math.abs(route.lat) <= 90 && Math.abs(route.lng) <= 180);
    assert.doesNotThrow(() => new Intl.DateTimeFormat('en', { timeZone: route.timezone }));
  }
});

test('animated zoom holds its cursor anchor throughout every intermediate frame', () => {
  const start = { x: 510, y: 220, zoom: 1 };
  const anchor = { x: -214, y: 87 }; const base = .8;
  const end = zoomAt(start, 4, anchor, base);
  const worldX = start.x + anchor.x / (base * start.zoom);
  const worldY = start.y + anchor.y / (base * start.zoom);
  for (let amount = 0; amount <= 1; amount += .05) {
    const frame = interpolateCamera(start, end, amount);
    assert.ok(Math.abs((worldX - frame.x) * base * frame.zoom - anchor.x) < 1e-9);
    assert.ok(Math.abs((worldY - frame.y) * base * frame.zoom - anchor.y) < 1e-9);
  }
});
