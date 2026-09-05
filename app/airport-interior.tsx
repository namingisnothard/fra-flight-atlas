'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { ArrowLeft, ArrowUpRight, Coffee, Info, Layers3, MapPin, Minus, Plus, RotateCcw, Search, ShoppingBag, TrainFront, Accessibility, Plane } from 'lucide-react';
import { interiorAreas, interiorFloors, placeKinds, type InteriorArea, type IndoorPlace, type PlaceKind, type IndoorFloor } from './airport-interior-data';
import './airport-interior.css';
import AirportOfficialMap from './airport-official-map';

const icons = { gate: Plane, shop: ShoppingBag, food: Coffee, wc: Accessibility, info: Info, access: Layers3, platform: TrainFront };
export default function AirportInterior({ area, onArea, onBack }: { area: InteriorArea; onArea: (area: InteriorArea) => void; onBack: () => void }) {
  const [mode, setMode] = useState<'official' | 'demo'>('official');
  const floors = useMemo(() => interiorFloors(area), [area]);
  const [floorId, setFloorId] = useState(floors[0]?.id);
  const [filter, setFilter] = useState<PlaceKind | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const floor = floors.find(f => f.id === floorId) ?? floors[0];
  const places = useMemo(() => floor?.places.filter(p => (filter === 'all' || p.kind === filter) && p.name.toLowerCase().includes(query.toLowerCase())) ?? [], [floor, filter, query]);
  const selected = places.find(p => p.id === selectedId);
  const changeFloor = (id: string) => { setFloorId(id); setSelectedId(null); setFilter('all'); setQuery(''); };
  const source = area === 'ice' ? 'https://www.bahnhof.de/en/frankfurt-am-main-flughafen-fernbahnhof' : area === 'regional' ? 'https://www.bahnhof.de/en/frankfurt-am-main-flughafen-regionalbahnhof' : 'https://www.frankfurt-airport.com/en/at-the-airport/orientation/airport-map.html';
  return <section className="interior-explorer" aria-label={`${interiorAreas[area]} indoor layout`}>
    <div className="interior-breadcrumb"><button onClick={onBack}><ArrowLeft size={14} /> Airport overview</button><span>/</span><select aria-label="Explore airport area" value={area} onChange={e => onArea(e.target.value as InteriorArea)}>{Object.entries(interiorAreas).map(([id, title]) => <option key={id} value={id}>{title}</option>)}</select></div>
    <div className="interior-heading"><div><span className="eyebrow">INSIDE THE AIRPORT · SOURCE MAPS</span><h3>{interiorAreas[area]}</h3></div><span className="interior-model-label">{mode === 'official' ? 'Official reference' : 'Unverified demo'}</span></div>
    <div className="interior-floors" aria-label="Map evidence view"><button aria-pressed={mode === 'official'} onClick={() => setMode('official')}>Official 2D map</button><button aria-pressed={mode === 'demo'} onClick={() => setMode('demo')}>3D concept · unverified</button></div>
    {mode === 'official' ? <AirportOfficialMap key={area} area={area} /> : <>
    <div className="map-demo-warning"><strong>This is a repeated design template, not this area’s actual floor plan.</strong><p>Rooms, amenities and connections below are generated examples. They are not derived from the official map and must not be used to locate facilities or calculate walking distances.</p></div>
    {!floor ? <div className="interior-closed"><Info size={28} /><h3>Terminal 2 is currently closed.</h3><p>Check your airline’s terminal and gate assignment before travelling.</p><button onClick={onBack}>Return to airport</button></div> : <>
      <div className="interior-floors" aria-label="Floor selection">{floors.map(f => <button key={f.id} aria-pressed={floor.id === f.id} onClick={() => changeFloor(f.id)}><Layers3 size={12} />{f.label}</button>)}{(area === 'A' || area === 'Z') && <button onClick={() => onArea(area === 'A' ? 'Z' : 'A')}>View {area === 'A' ? 'Z · Level 3' : 'A · Level 2'} ↗</button>}</div>
      <div className="interior-filters" aria-label="Places filter"><button aria-pressed={filter === 'all'} onClick={() => { setFilter('all'); setSelectedId(null); }}>All places</button>{(Object.keys(placeKinds) as PlaceKind[]).filter(k => floor.places.some(p => p.kind === k)).map(k => { const Icon = icons[k]; return <button key={k} aria-pressed={filter === k} onClick={() => { setFilter(k); setSelectedId(null); }}><Icon size={12} />{placeKinds[k].label}</button>; })}</div>
      <div className="interior-body"><InteriorCanvas key={floor.id} floor={floor} visibleIds={places.map(p => p.id)} selected={selected} onSelect={setSelectedId} />
        <aside className="interior-directory"><label className="interior-search"><Search size={13} /><input aria-label="Search indoor places" placeholder="Find a place…" value={query} onChange={e => { setQuery(e.target.value); setSelectedId(null); }} /></label><div className="interior-count">{places.length} places · {floor.label}</div>
          <div className="interior-place-list">{places.map(p => { const Icon = icons[p.kind]; return <button key={p.id} aria-pressed={selected?.id === p.id} onClick={() => setSelectedId(p.id)}><span style={{ background: `#${placeKinds[p.kind].color.toString(16)}33` }}><Icon size={15} /></span><span>{p.name}<small>{p.kind === 'platform' && area !== 'skyline' ? 'Verified number · schematic position' : 'Illustrative location'}</small></span><ArrowUpRight size={12} /></button>; })}{!places.length && <p className="interior-empty">No places match. Try another category or search.</p>}</div>
          <div className="interior-place-detail" aria-live="polite">{selected ? <><span className="eyebrow">{placeKinds[selected.kind].label}</span><h4>{selected.name}</h4><p>{selected.description}</p>{selected.area && <button onClick={() => onArea(selected.area!)}>Explore {interiorAreas[selected.area]} <ArrowUpRight size={13} /></button>}{selected.floor && <button onClick={() => changeFloor(selected.floor!)}>Open {floors.find(f => f.id === selected.floor)?.label} <ArrowUpRight size={13} /></button>}</> : <><MapPin size={18} /><h4>Take a closer look.</h4><p>Select a room, gate or platform to bring it into focus. You can also choose it from this list.</p></>}</div>
        </aside>
      </div>
    </>}
    <div className="interior-note"><Info size={13} /><p>Interior geometry, amenities and gate areas are illustrative, not surveyed locations. Station track numbers are verified; trains and platform assignments are not live. <a href={source} target="_blank" rel="noreferrer">Official {area === 'ice' || area === 'regional' ? 'station details' : 'airport map'} ↗</a></p></div>
    </>}
  </section>;
}

function InteriorCanvas({ floor, visibleIds, selected, onSelect }: { floor: IndoorFloor; visibleIds: string[]; selected?: IndoorPlace; onSelect: (id: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const callback = useRef(onSelect);
  const api = useRef<{ focus: (place?: IndoorPlace) => void; filter: (ids: string[]) => void; zoom: (factor: number) => void; top: (enabled: boolean) => void } | null>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [top, setTop] = useState(false);
  useEffect(() => { callback.current = onSelect; }, [onSelect]);
  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { const frame = requestAnimationFrame(() => setFailed(true)); return () => cancelAnimationFrame(frame); }
    element.appendChild(renderer.domElement); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.setAttribute('aria-label', 'Interactive indoor cutaway. Use the adjacent directory for keyboard access.');
    const scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xfffaf0, 0x969987, 3));
    const light = new THREE.DirectionalLight(0xfff5df, 2.5); light.position.set(-40, 100, 40); scene.add(light);
    const camera = new THREE.OrthographicCamera(-90, 90, 70, -70, .1, 700);
    camera.position.set(90, 125, 135); camera.zoom = .55;
    const controls = new OrbitControls(camera, renderer.domElement); controls.enableDamping = true; controls.minZoom = .5; controls.maxZoom = 3.5; controls.maxPolarAngle = Math.PI / 2.2;
    const content = new THREE.Group(); scene.add(content);
    const pickables: THREE.Object3D[] = []; const rooms = new Map<string, THREE.Group>();
    function box(x: number, y: number, z: number, w: number, h: number, d: number, color: number, group = content) {
      const object = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: .9 })); object.position.set(x, y, z); group.add(object); return object;
    }
    function label(text: string, x: number, z: number, group: THREE.Group, width: number) {
      const canvas = document.createElement('canvas'); canvas.width = 640; canvas.height = 112;
      const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#fbf8ef'; ctx.fillRect(0, 0, 640, 112); ctx.strokeStyle = '#cabda0'; ctx.lineWidth = 3; ctx.strokeRect(1, 1, 638, 110);
      ctx.font = '600 34px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#344f47'; ctx.fillText(text, 320, 58, 610);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false })); sprite.position.set(x, 8, z); sprite.scale.set(width, width * 112 / 640, 1); sprite.renderOrder = 10; group.add(sprite); return sprite;
    }
    box(0, -1, 0, 132, 2, 84, 0xd4cfba);
    box(0, .05, 0, 128, .1, 78, 0xf3eddc);
    box(0, 2, -40, 132, 4, 1, 0xc4c2af); box(-65, 2, 0, 1, 4, 80, 0xc4c2af); box(65, 2, 0, 1, 4, 80, 0xc4c2af);
    // A single unobstructed schematic circulation spine, with open room fronts.
    if (!floor.station) { box(0, .14, 0, 118, .12, 11, 0xe1d9bc); for (let x = -48; x < 54; x += 12) box(x, .25, 0, 4, .08, .25, 0xb89b64); }
    for (const p of floor.places) {
      const group = new THREE.Group(); content.add(group); rooms.set(p.id, group);
      const color = placeKinds[p.kind].color;
      const tile = box(p.x, .4, p.z, p.width, .6, p.depth, color, group); tile.userData.place = p.id; pickables.push(tile);
      const tag = label(p.name, p.x, p.z, group, p.kind === 'platform' ? 28 : Math.max(18, p.width + 2)); tag.userData.place = p.id; pickables.push(tag);
      if (p.kind === 'platform') {
        // Track bed and two rails beside the passenger platform.
        box(p.x, .15, p.z + p.depth / 2 + 2, p.width, .15, 3, 0x969c91, group);
        for (const dz of [1.1, 2.8]) box(p.x, .35, p.z + p.depth / 2 + dz, p.width, .2, .15, 0x5f726a, group);
        box(p.x, .76, p.z + p.depth / 2 - .5, p.width - 2, .06, .25, 0xf5de91, group);
        for (const x of [-34, 0, 34]) box(x, 1.2, p.z - 1.5, 7, 1.1, 1.6, 0x617e73, group);
      } else if (p.kind === 'access') {
        for (let i = 0; i < 6; i++) box(p.x - 3 + i, .8 + i * .4, p.z + 2, 1, .5 + i * .7, 4, 0xf1efdc, group);
        box(p.x + 3, 2, p.z - 2, 3, 3, 3, 0xd7ddce, group);
      } else {
        const sign = p.z > 0 ? 1 : -1;
        box(p.x, 2, p.z + sign * (p.depth / 2), p.width, 3, .45, 0xd6d4c3, group);
        for (const side of [-1, 1]) box(p.x + side * p.width / 2, 1.4, p.z, .4, 2, p.depth, 0xd6d4c3, group);
        if (p.kind === 'gate') for (const row of [-2, 2]) for (let col = -5; col <= 5; col += 2.5) box(p.x + col, 1.4, p.z + row, 1.8, 1.2, 1.8, 0xe8eddd, group);
        if (p.kind === 'shop') for (const row of [-3, 1, 4]) box(p.x, 1.8, p.z + row, p.width - 5, 2, 1.3, 0xe8dfc7, group);
        if (p.kind === 'food') for (const x of [-4, 4]) for (const z of [-3, 3]) { box(p.x + x, 1.5, p.z + z, 2.8, 1.5, 2.8, 0xeee5d1, group); }
        if (p.kind === 'wc') for (const x of [-4, 0, 4]) box(p.x + x, 1.6, p.z + sign * 3, 2.7, 2.4, 3, 0xd9eeea, group);
        if (p.kind === 'info') box(p.x, 1.5, p.z + 2, p.width - 5, 2, 3, 0xe2e6ee, group);
      }
    }
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.2, 2.7, 32), new THREE.MeshBasicMaterial({ color: 0x9c6425, side: THREE.DoubleSide, depthTest: false })); ring.rotation.x = -Math.PI / 2; ring.visible = false; ring.renderOrder = 11; content.add(ring);
    let target = new THREE.Vector3(0, 0, 0), zoom = 1, animating = true;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const focus = (p?: IndoorPlace) => { target = new THREE.Vector3(p?.x ?? 0, 0, p?.z ?? 0); zoom = p ? p.kind === 'platform' ? 1.25 : 1.65 : 1; animating = true; ring.visible = !!p; if (p) ring.position.set(p.x, 1, p.z); };
    api.current = { focus, filter: ids => { rooms.forEach((group, id) => { group.visible = ids.includes(id); }); }, zoom: factor => { animating = false; camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, .5, 3.5); camera.updateProjectionMatrix(); }, top: enabled => { camera.position.copy(controls.target).add(enabled ? new THREE.Vector3(0, 200, .1) : new THREE.Vector3(90, 125, 135)); controls.update(); } };
    const cancelTransition = () => { animating = false; }; controls.addEventListener('start', cancelTransition);
    const resize = () => { const w = element.clientWidth, h = element.clientHeight; if (!w || !h) return; renderer.setSize(w, h); camera.left = -70 * w / h; camera.right = 70 * w / h; camera.top = 70; camera.bottom = -70; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    const ray = new THREE.Raycaster(); let down = new THREE.Vector2();
    const pointerDown = (event: PointerEvent) => { down = new THREE.Vector2(event.clientX, event.clientY); };
    const pointerUp = (event: PointerEvent) => {
      if (down.distanceTo(new THREE.Vector2(event.clientX, event.clientY)) > 5) return;
      const bounds = renderer.domElement.getBoundingClientRect(); ray.setFromCamera(new THREE.Vector2((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1), camera);
      const hit = ray.intersectObjects(pickables.filter(object => object.parent?.visible))[0]; if (hit) callback.current(hit.object.userData.place);
    };
    const lost = (event: Event) => { event.preventDefault(); setFailed(true); };
    renderer.domElement.addEventListener('pointerdown', pointerDown); renderer.domElement.addEventListener('pointerup', pointerUp); renderer.domElement.addEventListener('webglcontextlost', lost);
    let firstFrame = true;
    renderer.setAnimationLoop(() => {
      if (animating) { const next = controls.target.clone().lerp(target, reduced ? 1 : .09); camera.position.add(next.clone().sub(controls.target)); controls.target.copy(next); camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoom, reduced ? 1 : .09); camera.updateProjectionMatrix(); if (next.distanceTo(target) < .02 && Math.abs(camera.zoom - zoom) < .002) animating = false; }
      controls.update(); renderer.render(scene, camera); if (firstFrame) { firstFrame = false; setReady(true); }
    });
    return () => { api.current = null; renderer.setAnimationLoop(null); observer.disconnect(); controls.removeEventListener('start', cancelTransition); controls.dispose(); renderer.domElement.removeEventListener('pointerdown', pointerDown); renderer.domElement.removeEventListener('pointerup', pointerUp); renderer.domElement.removeEventListener('webglcontextlost', lost); content.traverse(obj => { const mesh = obj as THREE.Mesh; mesh.geometry?.dispose(); if (mesh.material) for (const mat of Array.isArray(mesh.material) ? mesh.material : [mesh.material]) { (mat as THREE.SpriteMaterial).map?.dispose(); mat.dispose(); } }); renderer.dispose(); renderer.domElement.remove(); };
  }, [floor]);
  const visibilityKey = visibleIds.join('|');
  useEffect(() => { api.current?.filter(visibilityKey.split('|')); }, [visibilityKey, floor, ready]);
  useEffect(() => { api.current?.focus(selected); }, [selected, floor, ready]);
  return <div className="interior-canvas-wrap"><div ref={host} className="interior-canvas" />{failed && <div className="scene-fallback">3D is unavailable. Explore every place in the directory.</div>}
    <div className="scene-tools"><button aria-label="Zoom into interior" disabled={failed} onClick={() => api.current?.zoom(1.2)}><Plus size={15} /></button><button aria-label="Zoom out of interior" disabled={failed} onClick={() => api.current?.zoom(1 / 1.2)}><Minus size={15} /></button><button aria-label="Fit interior layout" disabled={failed} onClick={() => api.current?.focus()}><RotateCcw size={15} /></button><button aria-label="Interior top-down view" disabled={failed} aria-pressed={top} onClick={() => { api.current?.top(!top); setTop(!top); }}><Layers3 size={15} /></button></div>
    <span className="interior-cutaway-stamp">ROOF REMOVED<br /><small>{floor.station ? 'PLATFORM LEVEL' : 'INTERIOR CUTAWAY'}</small></span><span className="scene-caption">Drag to orbit · scroll to zoom · click a place</span>
  </div>;
}
