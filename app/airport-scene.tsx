'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Maximize2, Minus, Plus, RotateCcw, Layers3 } from 'lucide-react';
import { concourses, origins, routePoints, type Concourse, type Origin, type Point } from './airport-data';
import type { InteriorArea } from './airport-interior-data';

export default function AirportScene({ origin, concourse, gate, onOpen }: { origin: Origin; concourse: Concourse | null; gate: string; onOpen: (area: InteriorArea) => void }) {
  const host = useRef<HTMLDivElement>(null);
  const api = useRef<{ reset: () => void; zoom: (factor: number) => void; top: () => void; update: (o: Origin, c: Concourse | null, g: string) => void } | null>(null);
  const callback = useRef(onOpen);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [top, setTop] = useState(false);
  useEffect(() => { callback.current = onOpen; }, [onOpen]);
  useEffect(() => {
    const element = host.current!;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); } catch { const frame = requestAnimationFrame(() => setFailed(true)); return () => cancelAnimationFrame(frame); }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0xf0eadc, 0);
    element.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-label', 'Interactive schematic of Frankfurt airport. Drag to rotate, pinch to zoom. Select concourses using the buttons below.');
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-130, 130, 110, -110, 1, 700);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; controls.dampingFactor = .08;
    controls.minZoom = .55; controls.maxZoom = 3.5;
    controls.maxPolarAngle = Math.PI / 2.15;
    const reset = () => { camera.position.set(172, 210, 230); controls.target.set(10, 0, 25); camera.zoom = 1; camera.updateProjectionMatrix(); controls.update(); };
    reset();
    scene.add(new THREE.HemisphereLight(0xfffaf0, 0x8e9d83, 2.8));
    const sun = new THREE.DirectionalLight(0xfff6e5, 3); sun.position.set(-70, 150, 70); sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048); Object.assign(sun.shadow.camera, { left: -180, right: 180, top: 180, bottom: -180, far: 400 }); sun.shadow.bias = -.001;
    scene.add(sun);
    const staticGroup = new THREE.Group(); scene.add(staticGroup);
    const routeGroup = new THREE.Group(); scene.add(routeGroup);
    const pickables: THREE.Object3D[] = [];
    const materials: Partial<Record<Concourse, THREE.MeshStandardMaterial>> = {};
    function box(x: number, y: number, z: number, w: number, h: number, d: number, color: number, group = staticGroup) {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshStandardMaterial({ color, roughness: .88 }));
      mesh.position.set(x, y, z); mesh.castShadow = true; mesh.receiveShadow = true; group.add(mesh);
      return mesh;
    }
    function label(text: string, position: Point, width = 32, color = '#41554b', group = staticGroup) {
      const canvas = document.createElement('canvas'); canvas.width = 512; canvas.height = 96;
      const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#f8f4e9'; ctx.fillRect(0, 0, 512, 96);
      ctx.strokeStyle = '#c6bba3'; ctx.lineWidth = 3; ctx.strokeRect(2, 2, 508, 92);
      ctx.fillStyle = color; ctx.font = '600 36px Arial'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 256, 49);
      const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, depthTest: false }));
      sprite.position.set(...position); sprite.scale.set(width, width * 96 / 512, 1); sprite.renderOrder = 5; group.add(sprite); return sprite;
    }
    function line(points: Point[], color: number, radius: number, group = staticGroup) {
      const path = new THREE.CurvePath<THREE.Vector3>();
      for (let i = 1; i < points.length; i++) path.add(new THREE.LineCurve3(new THREE.Vector3(...points[i - 1]), new THREE.Vector3(...points[i])));
      const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, 100, radius, 6, false), new THREE.MeshStandardMaterial({ color, roughness: .6 })); group.add(mesh); return path;
    }
    box(10, -2, 27, 260, 3, 235, 0xe0ddc9);
    const grid = new THREE.GridHelper(260, 52, 0xc4c7b3, 0xd0d0bd); grid.position.set(10, -.35, 27); staticGroup.add(grid);
    // Airfield as context between the northern and southern terminal campuses.
    box(0, -.1, 51, 218, .2, 9, 0xb9bdac);
    for (let x = -99; x < 108; x += 12) box(x, .07, 51, 5, .06, .4, 0xf2efde);
    label('AIRFIELD · DISTANCES COMPRESSED', [-30, 1, 61], 57, '#8b907e');
    const clickable = (object: THREE.Object3D, area: InteriorArea) => { object.userData.area = area; pickables.push(object); };
    clickable(box(-15, 2.5, -23, 102, 6, 21, 0xd3ceba), 't1');
    clickable(box(48, 2.5, 80, 92, 6, 19, 0xd3ceba), 't3');
    clickable(box(70, 2, -15, 39, 5, 24, 0xc8c8bb), 't2');
    clickable(label('T2 · CLOSED', [70, 13, -18], 29, '#91907f'), 't2');
    clickable(label('TERMINAL 1', [-12, 17, -24], 35), 't1');
    clickable(label('TERMINAL 3', [49, 16, 80], 35), 't3');
    clickable(box(-30, 2, -61, 69, 5, 11, 0x94a7a0), 'ice');
    clickable(box(-15, 1.4, -40, 50, 3, 9, 0xb1bcb0), 'regional');
    clickable(label('ICE · LONG-DISTANCE', [-30, 13, -63], 40), 'ice');
    clickable(label('S-BAHN', [-15, 9, -41], 23), 'regional');
    box(-25, 1, -49, 7, 2, 17, 0xc9c6b3);
    line([[-15, 1, -36], [103, 1, -36], [103, 1, 75], [48, 1, 75]], 0xa2936e, .65);
    clickable(label('SKY LINE · 8 MIN RIDE', [105, 6, 38], 39, '#967c4a'), 'skyline');
    for (const [id, data] of Object.entries(concourses)) {
      const c = id as Concourse;
      const begin = new THREE.Vector3(...data.junction), end = new THREE.Vector3(...data.point);
      const mid = begin.clone().lerp(end, .5); const length = begin.distanceTo(end);
      const pier = box(mid.x, c === 'Z' ? 8.5 : 2.5, mid.z, c === 'Z' ? 7 : 11, c === 'Z' ? 4 : 6, length + 5, 0xb0bca8);
      pier.rotation.y = Math.atan2(end.x - begin.x, end.z - begin.z);
      materials[c] = pier.material; clickable(pier, c);
      const tag = label(c === 'Z' ? 'Z · LEVEL 3' : c === 'A' ? 'A · LEVEL 2' : `GATES ${c}`, [end.x, c === 'A' ? 9 : c === 'Z' ? 22 : 13, end.z + (c === 'A' ? 9 : 0)], 25);
      clickable(tag, c);
      if (c === 'Z') continue;
      for (let i = 1; i < 5; i++) {
        const p = begin.clone().lerp(end, i / 5);
        for (const side of [-1, 1]) {
          box(p.x + side * 8, 2, p.z, 6, 2, 2, 0xc5c5b3);
          // Small abstract parked-aircraft silhouettes give scale and orientation.
          const aircraft = new THREE.Group(); aircraft.position.set(p.x + side * 15, 1, p.z); aircraft.rotation.y = side * Math.PI / 2;
          staticGroup.add(aircraft);
          box(0, .5, 0, 1.1, 1, 9, 0xf1eee2, aircraft);
          box(0, .5, 0, 8, .35, 1.7, 0xf1eee2, aircraft);
          box(0, 1, 3.4, 3, .5, 1.1, 0xd2b27b, aircraft);
        }
      }
    }
    const disposeGroup = (group: THREE.Group) => {
      group.traverse(object => {
        const item = object as THREE.Mesh;
        item.geometry?.dispose();
        if (item.material) for (const mat of Array.isArray(item.material) ? item.material : [item.material]) { (mat as THREE.SpriteMaterial).map?.dispose(); mat.dispose(); }
      }); group.clear();
    };
    let route: THREE.CurvePath<THREE.Vector3> | null = null;
    let traveler: THREE.Mesh | null = null;
    const update = (o: Origin, c: Concourse | null, g: string) => {
      disposeGroup(routeGroup); route = null; traveler = null;
      for (const [key, material] of Object.entries(materials)) material.color.setHex(key === c ? 0x6f8d77 : 0xb0bca8);
      if (!c) return;
      const points = routePoints(o, c);
      route = line(points, 0xc28c3b, .85, routeGroup);
      points.filter((_, i) => i === 0 || i === points.length - 1).forEach((p, i) => {
        const pin = new THREE.Mesh(new THREE.CylinderGeometry(1.8, 1.8, 2, 24), new THREE.MeshStandardMaterial({ color: i ? 0xc28c3b : 0x344f47 }));
        pin.position.set(...p); routeGroup.add(pin);
      });
      const startLabel = label('START HERE', [origins[o].point[0], 20, origins[o].point[2]], 28, '#344f47', routeGroup); startLabel.userData.area = o;
      const gateLabel = label(`${g} · CONCOURSE AREA`, [concourses[c].point[0], 30, concourses[c].point[2]], 43, '#98702f', routeGroup); gateLabel.userData.area = c;
      traveler = new THREE.Mesh(new THREE.SphereGeometry(1.4, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfff8dd })); routeGroup.add(traveler);
    };
    const resize = () => { const w = element.clientWidth, h = element.clientHeight; if (!w || !h) return; renderer.setSize(w, h); const aspect = w / h; camera.left = -116 * aspect; camera.right = 116 * aspect; camera.top = 116; camera.bottom = -116; camera.updateProjectionMatrix(); };
    const observer = new ResizeObserver(resize); observer.observe(element); resize();
    api.current = { reset, zoom: (factor) => { camera.zoom = THREE.MathUtils.clamp(camera.zoom * factor, .55, 3.5); camera.updateProjectionMatrix(); }, top: () => { camera.position.set(10, 290, 25.1); controls.target.set(10, 0, 25); controls.update(); } , update };
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2(); let down: [number, number] = [0, 0];
    const pointerDown = (e: PointerEvent) => { down = [e.clientX, e.clientY]; };
    const pointerUp = (e: PointerEvent) => {
      if (Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
      const bounds = renderer.domElement.getBoundingClientRect(); pointer.set((e.clientX - bounds.left) / bounds.width * 2 - 1, -(e.clientY - bounds.top) / bounds.height * 2 + 1);
      raycaster.setFromCamera(pointer, camera); const hit = raycaster.intersectObjects([...pickables, ...routeGroup.children.filter(child => child.userData.area)])[0]; if (hit) callback.current(hit.object.userData.area);
    };
    renderer.domElement.addEventListener('pointerdown', pointerDown); renderer.domElement.addEventListener('pointerup', pointerUp);
    const lost = (event: Event) => { event.preventDefault(); setFailed(true); };
    renderer.domElement.addEventListener('webglcontextlost', lost);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let firstFrame = true;
    renderer.setAnimationLoop((time) => { controls.update(); if (route && traveler) traveler.position.copy(route.getPoint(reduced ? .55 : (time % 14000) / 14000)); renderer.render(scene, camera); if (firstFrame) { firstFrame = false; setReady(true); } });
    return () => { api.current = null; observer.disconnect(); controls.dispose(); renderer.setAnimationLoop(null); renderer.domElement.removeEventListener('pointerdown', pointerDown); renderer.domElement.removeEventListener('pointerup', pointerUp); renderer.domElement.removeEventListener('webglcontextlost', lost); disposeGroup(staticGroup); disposeGroup(routeGroup); sun.shadow.dispose(); renderer.dispose(); renderer.domElement.remove(); };
  }, []);
  useEffect(() => { if (ready) api.current?.update(origin, concourse, gate); }, [origin, concourse, gate, ready]);
  return <div className="airport-scene-wrap"><div ref={host} className="airport-canvas" />
    {(!ready || failed) && <div className="scene-fallback">{failed ? <>3D is unavailable in this browser.<br />Your gate selector and time planner still work.</> : 'Unfolding Frankfurt Airport…'}</div>}
    <div className="scene-tools"><button aria-label="Zoom in" disabled={failed} onClick={() => api.current?.zoom(1.2)}><Plus size={16} /></button><button aria-label="Zoom out" disabled={failed} onClick={() => api.current?.zoom(1 / 1.2)}><Minus size={16} /></button><button aria-label="Reset airport view" disabled={failed} onClick={() => { api.current?.reset(); setTop(false); }}><RotateCcw size={15} /></button><button aria-label="Top-down view" aria-pressed={top} disabled={failed} onClick={() => { if (top) api.current?.reset(); else api.current?.top(); setTop(!top); }}><Layers3 size={16} /></button></div>
    <div className="scene-caption"><Maximize2 size={11} /> Drag to orbit · zoom · click a building to go inside</div>
    <div className="model-stamp">FRA<span>50.0379° N<br />8.5622° E</span></div>
  </div>;
}
