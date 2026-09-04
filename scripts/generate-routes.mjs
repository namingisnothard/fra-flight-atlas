import fs from 'node:fs';
import tzlookup from 'tz-lookup';

const html = fs.readFileSync('/tmp/fra-routes.html', 'utf8');
const csv = fs.readFileSync('/tmp/airports.csv', 'utf8');

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"' && quoted && line[i + 1] === '"') { current += '"'; i += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === ',' && !quoted) { values.push(current); current = ''; }
    else current += char;
  }
  values.push(current);
  return values;
}

const airportRows = csv.split('\n').slice(1).map(parseCsvLine);
const airportByIata = new Map();
for (const row of airportRows) {
  const iata = row[13];
  if (iata && !airportByIata.has(iata)) {
    airportByIata.set(iata, { lat: Number(row[4]), lng: Number(row[5]) });
  }
}
airportByIata.set('QEF', { lat: 49.959, lng: 8.643 });

const rowPattern = /<tr>\s*<td>(?:<a href="\/airports\/[^\"]+">)?([^<]+)(?:<\/a>)?<span class="dest-code">([^<]+)<\/span><\/td>\s*<td>([^<]+)<\/td>\s*<td class="airlines-cell">([^<]+)<\/td>\s*<td>([^<]+)<\/td>\s*<\/tr>/g;
const routes = [];
let match;
while ((match = rowPattern.exec(html))) {
  const [, city, iata, country, airlines, frequency] = match;
  const coordinates = airportByIata.get(iata);
  if (!coordinates) { console.warn(`Missing coordinates: ${city} (${iata})`); continue; }
  routes.push({ city, iata, country, airlines: airlines.split(', '), frequency, ...coordinates, timezone: tzlookup(coordinates.lat, coordinates.lng) });
}

const output = `export type Route = { city: string; iata: string; country: string; airlines: string[]; frequency: string; lat: number; lng: number; timezone: string };\n\nexport const routes: Route[] = ${JSON.stringify(routes, null, 2)};\n`;
fs.writeFileSync('app/routes.ts', output);
console.log(`Generated ${routes.length} routes.`);
