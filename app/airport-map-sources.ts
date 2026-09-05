import type { InteriorArea } from './airport-interior-data';

export const mapSources = {
  db: { title: 'DB · long-distance station floor plan', publisher: 'DB InfraGO', url: 'https://www.bahnhof.de/downloads/station-plans/7982.pdf', file: 'db-airport-long-distance.pdf', edition: 'Edition date not identified; retrieved 6 September 2026', pages: ['Station levels and platforms 4–7'], imagePrefix: 'db-airport-long-distance' },
  rmv: { title: 'RMV · airport station and access plans', publisher: 'Rhein-Main-Verkehrsverbund', url: 'https://www.rmv.de/c/fileadmin/documents/Stationsplaene/Frankfurt-Flughafen.pdf', file: 'rmv-frankfurt-airport.pdf', edition: 'January 2024 · historical access plan, not current operating information', pages: ['Long-distance station · levels 1–3', 'Terminal 1 · bus station and connections', 'Regional station · concourse and platforms 1–3', 'Map symbols and accessibility legend'], imagePrefix: 'rmv-frankfurt-airport' },
} as const;
export function officialMapUrl(area: InteriorArea): string {
  const poi = area === 'ice' ? 'fernbahnhof' : area === 'regional' ? 'regionalbahnhof' : ['G', 'H', 'J', 't3'].includes(area) ? 'terminal-3' : 'terminal-1';
  return `https://map.frankfurt-airport.com/?poi=${poi}`;
}
// Relative asset URLs support both Sites root hosting and the GitHub Pages base path.
export function mapAsset(file: string) { return `./maps/${file}`; }
