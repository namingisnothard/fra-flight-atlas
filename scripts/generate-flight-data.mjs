import fs from 'node:fs';

const sourceDirectory = '/tmp/fra-flightstats-week';
const records = new Map();

for (const filename of fs.readdirSync(sourceDirectory).filter(name => name.endsWith('.html'))) {
  const matchName = filename.match(/^(arrivals|departures)-(\d{2})-(\d{1,2})\.html$/);
  if (!matchName) continue;
  const [, sourceDirection, dayText] = matchName;
  const html = fs.readFileSync(`${sourceDirectory}/${filename}`, 'utf8');
  const matchData = html.match(/__NEXT_DATA__\s*=\s*(\{.*?\});__NEXT_LOADED_PAGES__/s);
  if (!matchData) continue;
  const data = JSON.parse(matchData[1]);
  const flights = data.props?.initialState?.flightTracker?.route?.flights || [];

  for (const flight of flights) {
    if (flight.isCodeshare || !flight.airport?.fs || !flight.carrier?.fs) continue;
    const direction = sourceDirection === 'arrivals' ? 'Arrivals' : 'Departures';
    const day = Number(dayText);
    const airlineCode = String(flight.carrier.fs).replace(/\*/g, '');
    const record = [day, direction === 'Arrivals' ? 'A' : 'D', flight.airport.fs, flight.departureTime?.time24 || '—', flight.arrivalTime?.time24 || '—', `${airlineCode} ${flight.carrier.flightNumber}`, flight.carrier.name];
    records.set(`${direction}-${day}-${flight.url}`, record);
  }
}

const flights = [...records.values()].sort((a, b) => a[0] - b[0] || a[1].localeCompare(b[1]) || a[3].localeCompare(b[3]));
const output = `export type FlightRecord = [day: number, direction: 'A' | 'D', iata: string, departureTime: string, arrivalTime: string, number: string, airline: string];\n\nexport const flights: FlightRecord[] = ${JSON.stringify(flights)};\n`;
fs.writeFileSync('app/flights.ts', output);
console.log(`Generated ${flights.length} primary flight records.`);
