'use client';
/* Full-resolution publisher artwork is intentionally unoptimized for legibility and static hosting. */
/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import { ExternalLink, Minus, Plus, RotateCcw, Info } from 'lucide-react';
import { mapAsset, mapSources, officialMapUrl } from './airport-map-sources';
import { interiorAreas, type InteriorArea } from './airport-interior-data';
import './airport-official-map.css';

export default function AirportOfficialMap({ area }: { area: InteriorArea }) {
  const station = area === 'ice' || area === 'regional';
  const [sourceId, setSourceId] = useState<'db' | 'rmv'>(area === 'regional' ? 'rmv' : 'db');
  const [page, setPage] = useState(area === 'regional' ? 3 : 1);
  const [zoom, setZoom] = useState(1);
  const [imageFailed, setImageFailed] = useState(false);
  const source = mapSources[sourceId];
  const url = officialMapUrl(area);
  return <div className="official-map-panel">
    <div className="map-evidence-notice"><Info size={16} /><div><strong>Source map, not a reconstruction</strong><p>{station ? 'Original publisher pages below retain their labels and legends. Zoom to inspect platforms, stairs, lifts and services.' : `Fraport’s map opens at ${['G', 'H', 'J', 't3'].includes(area) ? 'Terminal 3' : 'Terminal 1'}. Use its own floor selector and search to locate ${area.length === 1 ? `gates ${area}, ` : ''}shops, toilets and information. The selected 3D area is not registered to this map.`}</p></div></div>
    {station ? <>
      <div className="official-map-toolbar"><label>Publisher<select aria-label="Floor plan publisher" value={sourceId} onChange={e => { setSourceId(e.target.value as 'db' | 'rmv'); setPage(1); setZoom(1); setImageFailed(false); }}><option value="db">DB · long-distance station</option><option value="rmv">RMV · airport stations</option></select></label><label>Page<select aria-label="Official floor plan page" value={page} onChange={e => { setPage(Number(e.target.value)); setZoom(1); setImageFailed(false); }}>{source.pages.map((title, i) => <option key={title} value={i + 1}>{i + 1}. {title}</option>)}</select></label><div className="official-zoom"><button aria-label="Zoom out of official plan" disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - .5))}><Minus size={14} /></button><span>{Math.round(zoom * 100)}%</span><button aria-label="Zoom into official plan" disabled={zoom >= 4} onClick={() => setZoom(Math.min(4, zoom + .5))}><Plus size={14} /></button><button aria-label="Fit official plan" onClick={() => setZoom(1)}><RotateCcw size={14} /></button></div></div>
      <div className="official-plan-scroll" tabIndex={0} role="region" aria-label="Scrollable official floor plan">{imageFailed ? <p>Preview unavailable. <a href={mapAsset(source.file)} target="_blank" rel="noreferrer">Open the original PDF</a>.</p> : <img src={mapAsset(`${source.imagePrefix}-${page}.png`)} alt={`${source.publisher}: ${source.pages[page - 1]}. Original floor plan with its legend.`} style={{ width: `${zoom * 100}%` }} onError={() => setImageFailed(true)} />}</div>
      <div className="official-map-credit"><strong>{source.title}</strong><span>{source.edition}</span><a href={source.url} target="_blank" rel="noreferrer">Publisher’s original PDF <ExternalLink size={12} /></a><a href={mapAsset(source.file)} target="_blank" rel="noreferrer">Saved PDF ↗</a></div>
    </> : <>
      <iframe className="official-airport-frame" title={`Fraport official map for ${interiorAreas[area]}`} src={url} loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
      <div className="official-map-credit"><strong>Fraport · official interactive airport map</strong><span>Hosted by Fraport; content and floor controls belong to the publisher. No floor geometry has been imported into our 3D model.</span><a href={url} target="_blank" rel="noreferrer">Open full official map <ExternalLink size={12} /></a></div>
      <p className="map-embed-help">If the embedded map is blank or blocked, open the full map above. Terminal 2 is currently closed; use current airport information for operational changes.</p>
    </>}
    {station && <a className="official-current-link" href={url} target="_blank" rel="noreferrer">Also check this station on Fraport’s current map <ExternalLink size={12} /></a>}
    <div className="map-evidence-table"><div><strong>Supported by official sources</strong><p>Terminal assignments, station platform numbers, and the geometry and facilities drawn on the original publisher pages, as of their stated edition.</p></div><div><strong>Not validated by these maps</strong><p>Our generated 3D room positions, gate positions, route lengths and walking times. These require an actual geometry dataset and routing validation.</p></div></div>
  </div>;
}
