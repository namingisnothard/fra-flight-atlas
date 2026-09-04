export type Camera = { x: number; y: number; zoom: number };
export const WORLD_CAMERA: Camera = { x: 520, y: 208, zoom: 1 };
export const EUROPE_CAMERA: Camera = { x: 542, y: 108, zoom: 4.3 };
export const MIN_ZOOM = 1;
export const MAX_ZOOM = 10;

// The point under the cursor stays fixed when the camera scale changes.
export function zoomAt(camera: Camera, factor: number, anchor: { x: number; y: number }, base: number): Camera {
  const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, camera.zoom * factor));
  return {
    x: camera.x + anchor.x / base * (1 / camera.zoom - 1 / zoom),
    y: camera.y + anchor.y / base * (1 / camera.zoom - 1 / zoom),
    zoom,
  };
}

export function markerDiameter(zoom: number) {
  return Math.min(7, 3.8 + Math.log2(zoom) * .9);
}

// Interpolate translation and scale together to keep the zoom anchor steady
// throughout the animation, not only at its endpoint.
export function interpolateCamera(start: Camera, end: Camera, amount: number): Camera {
  const zoom = start.zoom + (end.zoom - start.zoom) * amount;
  return {
    zoom,
    x: (start.x * start.zoom * (1 - amount) + end.x * end.zoom * amount) / zoom,
    y: (start.y * start.zoom * (1 - amount) + end.y * end.zoom * amount) / zoom,
  };
}
