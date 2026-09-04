'use client';

import { memo, useCallback, useEffect, useMemo, useRef, useState, type PointerEvent, type KeyboardEvent } from 'react';
import { Compass, LocateFixed, Minus, Plus } from 'lucide-react';
import { geoArea, geoCentroid, geoEquirectangular, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import worldData from 'world-atlas/countries-110m.json';
import type { Feature, Geometry } from 'geojson';
import type { Topology, GeometryCollection } from 'topojson-specification';
import type { Route } from './routes';
import { EUROPE_CAMERA, WORLD_CAMERA, MAX_ZOOM, MIN_ZOOM, markerDiameter, zoomAt, interpolateCamera, type Camera } from './atlas-camera';

const projection = geoEquirectangular().translate([500, 250]).scale(500 / Math.PI);
const path = geoPath(projection);
const topology = worldData as unknown as Topology<{ countries: GeometryCollection }>;
const palette = ['#ded1aa', '#d8c4a4', '#c2cbb0', '#d2ccac', '#c6cbb8', '#e1d6b7', '#bfcfc1', '#d9bfaa'];
const overrides: Record<string, [number, number]> = { 'United States of America': [-101, 39], Canada: [-106, 60], Russia: [95, 61], France: [2, 47], Norway: [9, 64], Indonesia: [117, -3], Malaysia: [103, 4], 'New Zealand': [172, -42] };
const countries = feature(topology, topology.objects.countries).features.map((country, index) => {
  // Use the largest landmass so overseas territories do not displace labels.
  const geometry = country.geometry;
  const mainland: Feature<Geometry> = geometry.type === 'MultiPolygon'
    ? { ...country, geometry: { type: 'Polygon', coordinates: [...geometry.coordinates].sort((a, b) => geoArea({ type: 'Polygon', coordinates: b }) - geoArea({ type: 'Polygon', coordinates: a }))[0] } }
    : country;
  const name = String((country.properties as { name?: string })?.name || '');
  const point = projection(overrides[name] || geoCentroid(mainland))!;
  return { id: country.id ?? name, name: name === 'United States of America' ? 'United States' : name, d: path(country) || '', point, area: path.area(mainland), fill: palette[index % palette.length] };
}).filter(country => country.name !== 'Antarctica').sort((a, b) => b.area - a.area);
const Geography = memo(function Geography() {
  return <>{countries.map(country => <path key={country.id} d={country.d} fill={country.fill} />)}</>;
});
const pixel = (value: number) => Math.round(value * 100) / 100;
const pointFor = (location: { lat: number; lng: number }) => ({ x: (location.lng + 180) / 360 * 1000, y: (90 - location.lat) / 180 * 500 });
const frankfurt = pointFor({ lat: 50.0379, lng: 8.5622 });

type Props = { routes: Route[]; selected: Route; region: 'World' | 'Europe'; direction: string; onSelect: (route: Route) => void; onHover: (route: Route | null) => void };
export default function AtlasMap({ routes, selected, region, direction, onSelect, onHover }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1000, height: 620 });
  const [camera, setCamera] = useState<Camera>(WORLD_CAMERA);
  const current = useRef(camera);
  const target = useRef(camera);
  const frame = useRef(0);
  const reducedMotion = useRef(false);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const gesture = useRef<{ x: number; y: number; distance: number } | null>(null);
  const dragged = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const base = size.width / 1000;
  const scale = base * camera.zoom;
  const screen = (point: { x: number; y: number }) => ({ x: pixel((point.x - camera.x) * scale + size.width / 2), y: pixel((point.y - camera.y) * scale + size.height / 2) });

  const moveCamera = useCallback((next: Camera, immediate = false) => {
    target.current = next;
    cancelAnimationFrame(frame.current);
    if (immediate || reducedMotion.current) { current.current = next; setCamera(next); return; }
    let previous = performance.now();
    const animate = (now: number) => {
      const alpha = 1 - Math.exp(-Math.min(now - previous, 48) / 70);
      previous = now;
      const old = current.current;
      const end = target.current;
      const done = Math.abs(old.x - end.x) + Math.abs(old.y - end.y) < .015 && Math.abs(old.zoom - end.zoom) < .001;
      const next = done ? end : interpolateCamera(old, end, alpha);
      current.current = next; setCamera(next);
      if (!done) frame.current = requestAnimationFrame(animate);
    };
    frame.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => setSize({ width: entry.contentRect.width, height: entry.contentRect.height }));
    observer.observe(node);
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reducedMotion.current = media.matches; };
    update(); media.addEventListener('change', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); cancelAnimationFrame(frame.current); };
  }, []);

  useEffect(() => { moveCamera(region === 'Europe' ? EUROPE_CAMERA : WORLD_CAMERA); }, [region, moveCamera]);
  useEffect(() => {
    const node = container.current;
    if (!node) return;
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = node.getBoundingClientRect();
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? rect.height : 1);
      const factor = Math.exp(-Math.max(-180, Math.min(180, delta)) * (event.ctrlKey ? .008 : .002));
      moveCamera(zoomAt(target.current, factor, { x: event.clientX - rect.left - rect.width / 2, y: event.clientY - rect.top - rect.height / 2 }, rect.width / 1000));
    };
    node.addEventListener('wheel', wheel, { passive: false });
    return () => node.removeEventListener('wheel', wheel);
  }, [moveCamera]);

  const zoom = (factor: number) => moveCamera(zoomAt(target.current, factor, { x: 0, y: 0 }, base));
  const reset = () => moveCamera(region === 'Europe' ? EUROPE_CAMERA : WORLD_CAMERA);
  const gestureNow = () => {
    const points = [...pointers.current.values()];
    return points.length > 1 ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2, distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) } : { ...points[0], distance: 0 };
  };
  const down = (event: PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest('.atlas-controls')) return;
    cancelAnimationFrame(frame.current); target.current = current.current;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gesture.current = gestureNow(); dragged.current = false;
    // Keep button click/focus intact; capture the map surface only when panning begins.
    if (!(event.target as HTMLElement).closest('button')) event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointers.current.has(event.pointerId) || !gesture.current) return;
    pointers.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const next = gestureNow(); const old = gesture.current;
    if (!dragged.current && Math.hypot(next.x - old.x, next.y - old.y) < 3 && pointers.current.size === 1) return;
    dragged.current = true; setDragging(true); onHover(null); setHovered(null);
    event.currentTarget.setPointerCapture(event.pointerId);
    let view = current.current;
    if (next.distance && old.distance) {
      const rect = event.currentTarget.getBoundingClientRect();
      view = zoomAt(view, next.distance / old.distance, { x: old.x - rect.left - size.width / 2, y: old.y - rect.top - size.height / 2 }, base);
    }
    moveCamera({ ...view, x: Math.max(0, Math.min(1000, view.x - (next.x - old.x) / (base * view.zoom))), y: Math.max(20, Math.min(480, view.y - (next.y - old.y) / (base * view.zoom))) }, true);
    gesture.current = next;
  };
  const up = (event: PointerEvent<HTMLDivElement>) => {
    pointers.current.delete(event.pointerId);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    gesture.current = pointers.current.size ? gestureNow() : null;
    if (!pointers.current.size) setDragging(false);
  };
  const key = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const shifts: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (shifts[event.key]) {
      event.preventDefault(); const [x, y] = shifts[event.key];
      moveCamera({ ...target.current, x: target.current.x + x * 60 / scale, y: target.current.y + y * 60 / scale });
    } else if (['+', '=', '-', '0', 'Home'].includes(event.key)) { event.preventDefault(); if (event.key === '0' || event.key === 'Home') reset(); else zoom(event.key === '-' ? 1 / 1.4 : 1.4); }
  };

  const labels = useMemo(() => {
    const occupied: { x: number; y: number; width: number }[] = [];
    return countries.flatMap(country => {
      const x = (country.point[0] - camera.x) * scale + size.width / 2;
      const y = (country.point[1] - camera.y) * scale + size.height / 2;
      const width = country.name.length * 6.5 + 12;
      if (country.area * scale * scale < 320 || x < 15 || x > size.width - 15 || y < 65 || y > size.height - 20) return [];
      if (occupied.some(label => Math.abs(label.x - x) < (label.width + width) / 2 && Math.abs(label.y - y) < 21)) return [];
      occupied.push({ x, y, width });
      return [{ ...country, x: pixel(x), y: pixel(y) }];
    });
  }, [camera, scale, size]);
  const selectedPoint = screen(pointFor(selected));
  const fraPoint = screen(frankfurt);
  const selectedPath = useMemo(() => path({ type: 'LineString', coordinates: [[8.5622, 50.0379], [selected.lng, selected.lat]] }) || '', [selected]);

  return <div ref={container} className={`world-map atlas-map direction-${direction.toLowerCase()} ${dragging ? 'dragging' : ''}`} tabIndex={0} role="region" aria-label="Interactive flight atlas. Arrow keys to pan, plus or minus to zoom, zero to reset." onKeyDown={key} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onLostPointerCapture={up} onDoubleClick={event => { if (!(event.target as HTMLElement).closest('button')) reset(); }} onClickCapture={event => { if (dragged.current) { event.stopPropagation(); dragged.current = false; } }}>
    <div className="atlas-grid" style={{ backgroundSize: `${scale * 83.333}px ${scale * 83.333}px`, backgroundPosition: `${size.width / 2 - camera.x * scale}px ${size.height / 2 - camera.y * scale}px` }} />
    <svg className="atlas-geography" width={size.width} height={size.height} aria-hidden="true">
      <g transform={`translate(${size.width / 2 - camera.x * scale} ${size.height / 2 - camera.y * scale}) scale(${scale})`}>
        <Geography />
        <path className="atlas-route-line" d={selectedPath} />
      </g>
    </svg>
    <div className="atlas-labels" aria-hidden="true">{labels.map(label => <span key={label.id} className="country-label" style={{ left: label.x, top: label.y }}>{label.name}</span>)}
      {camera.zoom < 2 && <><span className="ocean-label" style={{ left: screen({ x: 338, y: 230 }).x, top: screen({ x: 338, y: 230 }).y }}>Atlantic<br />Ocean</span><span className="ocean-label" style={{ left: screen({ x: 727, y: 326 }).x, top: screen({ x: 727, y: 326 }).y }}>Indian Ocean</span><span className="ocean-label" style={{ left: screen({ x: 110, y: 260 }).x, top: screen({ x: 110, y: 260 }).y }}>Pacific<br />Ocean</span></>}
    </div>
    {routes.map(route => {
      const p = screen(pointFor(route)); const active = route.iata === selected.iata; const hot = route.iata === hovered;
      if (p.x < -20 || p.x > size.width + 20 || p.y < -20 || p.y > size.height + 20) return null;
      return <button key={route.iata} className={`atlas-airport ${active ? 'is-selected' : ''} ${hot ? 'is-hovered' : ''}`} style={{ left: p.x, top: p.y, width: camera.zoom < 2 ? 14 : 24, height: camera.zoom < 2 ? 14 : 24 }} aria-label={`Select ${route.city}, ${route.country}, ${route.iata}`} aria-pressed={active} onMouseEnter={() => { if (!dragging) { setHovered(route.iata); onHover(route); } }} onMouseLeave={() => { setHovered(null); onHover(null); }} onFocus={() => { setHovered(route.iata); onHover(route); }} onBlur={() => { setHovered(null); onHover(null); }} onClick={() => onSelect(route)}><i style={{ width: active || hot ? 9 : markerDiameter(camera.zoom), height: active || hot ? 9 : markerDiameter(camera.zoom) }} />{hot && !active && <span className="airport-name">{route.iata} · {route.city}</span>}</button>;
    })}
    <div className="atlas-home" style={{ left: fraPoint.x, top: fraPoint.y }}><i /><span>FRANKFURT<small>FRA · HOME PORT</small></span></div>
    {selectedPoint.x > 0 && selectedPoint.x < size.width && selectedPoint.y > 30 && selectedPoint.y < size.height - 30 && <div className={`atlas-destination ${selectedPoint.x > size.width - 180 ? 'align-left' : ''}`} style={{ left: selectedPoint.x, top: selectedPoint.y }}><strong>{selected.iata}</strong><span>{selected.city}</span></div>}
    <div className="atlas-cartouche" aria-hidden="true"><span>THE NONSTOP COLLECTION</span><strong>{region === 'World' ? 'A world within reach.' : 'The European chapter.'}</strong><small>FRANKFURT AM MAIN · A FLIGHT ATLAS</small></div>
    <div className="compass-rose" aria-hidden="true"><span>N</span><Compass size={48} strokeWidth={.7} /><small>50°02′ N · 8°34′ E</small></div>
    <div className="atlas-controls" aria-label="Map controls"><button onClick={() => zoom(1.4)} disabled={camera.zoom >= MAX_ZOOM - .01} aria-label="Zoom in"><Plus size={17} /></button><span>{Math.round(camera.zoom * 100)}%</span><button onClick={() => zoom(1 / 1.4)} disabled={camera.zoom <= MIN_ZOOM + .01} aria-label="Zoom out"><Minus size={17} /></button><button onClick={reset} aria-label="Reset map view" title="Reset view (0)"><LocateFixed size={16} /></button></div>
    <div className="atlas-scale" aria-hidden="true"><i />{Math.round(60 / scale * 40)} km at equator</div>
  </div>;
}
