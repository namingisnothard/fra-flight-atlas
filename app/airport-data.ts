// Schematic concourse geometry. Coordinates are drawing units, not surveyed meters.
// Terminal assignments verified against Fraport's airport map on 2026-09-05.
export type Point = [number, number, number];
export const concourses = {
  A: { terminal: 1, point: [-67, 7, 15] as Point, junction: [-38, 7, -17] as Point, walk: 16, level: 'Level 2 · Schengen' },
  Z: { terminal: 1, point: [-67, 13, 15] as Point, junction: [-38, 13, -17] as Point, walk: 19, level: 'Level 3 · above A' },
  B: { terminal: 1, point: [-7, 7, 23] as Point, junction: [-7, 7, -17] as Point, walk: 12, level: 'Follow your gate’s signs' },
  C: { terminal: 1, point: [32, 7, 4] as Point, junction: [27, 7, -17] as Point, walk: 17, level: 'Follow your gate’s signs' },
  G: { terminal: 3, point: [14, 7, 113] as Point, junction: [14, 7, 85] as Point, walk: 16, level: 'Terminal 3 · Pier G' },
  H: { terminal: 3, point: [48, 7, 118] as Point, junction: [48, 7, 85] as Point, walk: 13, level: 'Terminal 3 · Pier H' },
  J: { terminal: 3, point: [82, 7, 118] as Point, junction: [82, 7, 85] as Point, walk: 17, level: 'Terminal 3 · Pier J' },
} as const;
export type Concourse = keyof typeof concourses;
export const origins = {
  regional: { label: 'Regional station · S-Bahn', terminal: 1, point: [-15, 7, -40] as Point, walk: 5 },
  ice: { label: 'Long-distance station · ICE', terminal: 1, point: [-30, 7, -61] as Point, walk: 10 },
  t1: { label: 'Terminal 1 · departures hall', terminal: 1, point: [-15, 7, -27] as Point, walk: 0 },
  t3: { label: 'Terminal 3 · departures hall', terminal: 3, point: [48, 7, 75] as Point, walk: 0 },
} as const;
export type Origin = keyof typeof origins;
export function parseGate(value: string): Concourse | null {
  const match = value.trim().toUpperCase().replace(/\s/g, '').match(/^([ABCZGHJ])(?:[1-9]\d{0,2})?$/);
  return match ? match[1] as Concourse : null;
}
export function routePoints(origin: Origin, concourse: Concourse): Point[] {
  const start = origins[origin]; const end = concourses[concourse];
  const points: Point[] = [start.point];
  if (start.terminal === 1) points.push([-15, 7, -27]);
  else points.push([48, 7, 75]);
  if (start.terminal !== end.terminal) {
    const transfer: Point[] = [[-15, 7, -36], [103, 7, -36], [103, 7, 75], [48, 7, 75]];
    points.push(...(start.terminal === 1 ? transfer : [...transfer].reverse()), end.terminal === 1 ? [-15, 7, -27] : [48, 7, 75]);
  }
  points.push(end.terminal === 1 ? [-15, 7, -17] : [48, 7, 85], end.junction, end.point);
  return points.filter((p, i) => !i || p.some((v, j) => v !== points[i - 1][j]));
}
export function estimateJourney(origin: Origin, concourse: Concourse, pace: number, security: number, passport: number, bag: number, buffer: number) {
  const walking = Math.ceil((origins[origin].walk + concourses[concourse].walk) * pace);
  const train = origins[origin].terminal === concourses[concourse].terminal ? 0 : 12; // 8 minute ride + 4 minute assumed wait.
  const journey = walking + train + security + passport + bag;
  return { walking, train, journey, total: journey + buffer };
}
export function frankfurtInput(timestamp: number): string {
  const p = new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Berlin', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(timestamp);
  const get = (name: string) => p.find(part => part.type === name)!.value;
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour')}:${get('minute')}`;
}
export function frankfurtTimestamp(input: string): number | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(input)) return null;
  const utc = Date.parse(`${input}Z`);
  if (!Number.isFinite(utc)) return null;
  // Check both German UTC offsets. Nonexistent / ambiguous DST wall times need clarification.
  const matches = [utc - 3600000, utc - 7200000].filter(time => frankfurtInput(time) === input);
  return matches.length === 1 ? matches[0] : null;
}
