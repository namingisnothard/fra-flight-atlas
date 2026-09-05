import type { Concourse, Origin } from './airport-data';

export type InteriorArea = Concourse | Origin | 't2' | 'skyline';
export type PlaceKind = 'gate' | 'shop' | 'food' | 'wc' | 'info' | 'access' | 'platform';
export type IndoorPlace = { id: string; name: string; kind: PlaceKind; x: number; z: number; width: number; depth: number; description: string; area?: InteriorArea; floor?: string; gate?: string };
export type IndoorFloor = { id: string; label: string; places: IndoorPlace[]; station?: boolean };
export const interiorAreas: Record<InteriorArea, string> = { A: 'Concourse A', Z: 'Concourse Z', B: 'Concourse B', C: 'Concourse C', G: 'Concourse G', H: 'Concourse H', J: 'Concourse J', t1: 'Terminal 1', t3: 'Terminal 3', t2: 'Terminal 2 · closed', regional: 'Regional station', ice: 'Long-distance station', skyline: 'Sky Line' };
export const placeKinds: Record<PlaceKind, { label: string; color: number; short: string }> = {
  gate: { label: 'Gates', color: 0x7f9a85, short: 'GATE' }, shop: { label: 'Shops', color: 0xc6ad80, short: 'SHOP' }, food: { label: 'Food & coffee', color: 0xc69b78, short: 'CAFÉ' }, wc: { label: 'Toilets', color: 0x7caaa8, short: 'WC' }, info: { label: 'Information', color: 0x9ca6c0, short: 'INFO' }, access: { label: 'Lifts & connections', color: 0xb5b7a2, short: '↕' }, platform: { label: 'Platforms', color: 0x8eaaa0, short: 'TRACK' },
};
const illustrative = 'Illustrative location in this cutaway. Check the official map for the actual position and availability.';
function room(id: string, name: string, kind: PlaceKind, x: number, z: number, width = 18, depth = 14, description = illustrative): IndoorPlace { return { id, name, kind, x, z, width, depth, description }; }
const amenities = (): IndoorPlace[] => [room('coffee', 'Coffee & bakery', 'food', -42, -20), room('shop', 'Travel essentials', 'shop', -20, -20), room('wc', 'Toilets / WC', 'wc', 3, -20), room('info', 'Information point', 'info', 26, -20), room('dining', 'Dining area', 'food', 49, -20), room('lift', 'Lift & stairs', 'access', -57, 0, 9, 10)];

export function interiorFloors(area: InteriorArea): IndoorFloor[] {
  if (area === 't2') return [];
  if (area === 'regional' || area === 'ice') {
    const tracks = area === 'regional' ? [1, 2, 3] : [4, 5, 6, 7];
    const pairs = area === 'regional' ? [[1], [2, 3]] : [[4, 5], [6, 7]];
    const platforms: IndoorPlace[] = tracks.map((track, i) => room(`track-${track}`, `Platform ${track}`, 'platform', 0, -27 + i * (54 / (tracks.length - 1)), 116, 9, `Track ${track} at ${interiorAreas[area]}. Platform numbers are verified; geometry is schematic. Check the station departure board for your train and platform changes.`));
    return [
      { id: 'concourse', label: 'Station concourse', places: [...amenities().filter(p => p.id !== 'lift'), ...pairs.map((pair, i) => ({ ...room(`down-${i}`, `To platforms ${pair.join(' / ')}`, 'access', -27 + i * 54, 20, 30, 16, 'Select to view the platform level. Lift and stair locations are illustrative.'), floor: 'platforms' })), { ...room('exit', 'Airport connection', 'access', 57, 0, 10, 12, 'Continue toward Terminal 1. For Terminal 3 follow the airport’s current transfer signs.'), area: 't1' }] },
      { id: 'platforms', label: `Platforms ${tracks[0]}–${tracks.at(-1)}`, station: true, places: [...platforms, { ...room('up', 'Lift / stairs to concourse', 'access', -44, 0, 17, 10, 'Return to the station concourse. Verify working lifts and the accessible route with the operator.'), floor: 'concourse' }] },
    ];
  }
  if (area === 'skyline') return [{ id: 'station', label: 'Station & boarding', places: [room('boarding', 'Boarding platform', 'platform', 0, 20, 115, 16, 'Schematic boarding area. Follow the signs for your terminal and passenger zone.'), room('train', 'Sky Line train', 'platform', 0, -15, 100, 10, 'Illustrative train position. No real-time train information.'), ...(['t1', 't3'] as const).map((id, i) => ({ ...room(id, `To ${interiorAreas[id]}`, 'access', -30 + i * 60, -34, 32, 12), area: id })), room('info', 'Passenger information', 'info', -48, 0, 16, 12)] }];
  if (area === 't1' || area === 't3') {
    const gates: Concourse[] = area === 't1' ? ['A', 'B', 'C', 'Z'] : ['G', 'H', 'J'];
    return [{ id: 'departures', label: 'Departures hall', places: [
      ...gates.map((c, i) => ({ ...room(`to-${c}`, `Gates ${c}`, 'gate', -45 + i * 30, 23, 24, 16, `Open the ${c} concourse cutaway. Follow airport signs for the actual security and border-control route.`), area: c })),
      room('checkin', 'Check-in counters', 'info', -42, -22, 26, 16), room('bags', 'Bag drop', 'info', -10, -22, 23, 16), room('wc', 'Toilets / WC', 'wc', 18, -22, 20, 16), room('shop', 'Shops & refreshments', 'shop', 45, -22, 23, 16),
      { ...room('skyline', 'Sky Line connection', 'access', 59, 0, 10, 12), area: 'skyline' }, { ...room('level', 'Lift / arrivals', 'access', -59, 0, 10, 12), floor: 'arrivals' },
    ] }, { id: 'arrivals', label: 'Arrivals hall', places: [room('baggage', 'Baggage reclaim', 'info', -28, 22, 48, 18), room('customs', 'Customs exit', 'access', 26, 22, 36, 18), ...amenities().filter(p => p.id !== 'lift'), { ...room('level', 'Lift / departures', 'access', -59, 0, 10, 12), floor: 'departures' }] }];
  }
  // This optional demo must never place a user's real gate in invented geometry.
  const c = area as Concourse;
  const places = [...amenities(), ...Array.from({ length: 5 }, (_, i) => room(`gate-${i}`, `Gate area ${i + 1}`, 'gate', -44 + i * 22, 23, 18, 18, 'Example boarding area, not an actual gate assignment. Gate numbers and positions must be checked on the official airport map.'))];
  const terminal = ['A', 'B', 'C', 'Z'].includes(c) ? 't1' : 't3';
  places.push({ ...room('exit', `Back to ${interiorAreas[terminal]}`, 'access', 59, 0, 10, 12), area: terminal });
  if (c === 'A' || c === 'Z') {
    const lift = places.find(p => p.id === 'lift')!;
    lift.area = c === 'A' ? 'Z' : 'A';
    lift.description = 'A and Z occupy different levels. This switches the model view, not an unrestricted walking route. Follow passport control and security signs for your journey.';
  }
  return [{ id: 'gates', label: c === 'A' ? 'Level 2 · A gates' : c === 'Z' ? 'Level 3 · Z gates' : 'Gate concourse', places }];
}
