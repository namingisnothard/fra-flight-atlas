import fs from 'node:fs/promises';
import tzlookup from 'tz-lookup';

function csvLine(line) {
  const values = []; let value = ''; let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"' && quoted && line[i + 1] === '"') { value += '"'; i++; }
    else if (c === '"') quoted = !quoted;
    else if (c === ',' && !quoted) { values.push(value); value = ''; }
    else value += c;
  }
  values.push(value); return values;
}
export async function completeAirportDirectory(root, flights, csvPath) {
  const source = await fs.readFile(`${root}/app/routes.ts`, 'utf8');
  const [header, body] = source.split('export const routes: Route[] = ');
  const routes = JSON.parse(body.trim().replace(/;$/, ''));
  const known = new Set(routes.map(route => route.iata));
  const missing = [...new Set(flights.map(f => f[2]))].filter(code => !known.has(code) && code !== 'FRA');
  if (!missing.length) return source;
  const csv = csvPath ? await fs.readFile(csvPath, 'utf8') : await fetch('https://davidmegginson.github.io/ourairports-data/airports.csv', { signal: AbortSignal.timeout(30000) }).then(response => { if (!response.ok) throw new Error('Airport coordinates unavailable'); return response.text(); });
  const [columns, ...lines] = csv.trim().split('\n');
  const keys = csvLine(columns);
  const airports = new Map(lines.map(line => { const row = Object.fromEntries(csvLine(line).map((value, i) => [keys[i], value])); return [row.iata_code, row]; }));
  // FlightStats retains these former codes for the same physical airports.
  const aliases = { TSE: 'NQZ', KIV: 'RMO' };
  const countryNames = new Intl.DisplayNames(['en'], { type: 'region' });
  for (const code of missing) {
    const airport = airports.get(aliases[code] || code);
    if (!airport) throw new Error(`No verified airport coordinates for ${code}; existing data preserved.`);
    const lat = Number(airport.latitude_deg); const lng = Number(airport.longitude_deg);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) throw new Error(`Invalid coordinates for ${code}`);
    routes.push({ city: airport.municipality || airport.name, iata: code, country: countryNames.of(airport.iso_country), airlines: [...new Set(flights.filter(f => f[2] === code).map(f => f[6]))], frequency: 'See selected day', lat, lng, timezone: tzlookup(lat, lng) });
  }
  return `${header}export const routes: Route[] = ${JSON.stringify(routes, null, 2)};\n`;
}
