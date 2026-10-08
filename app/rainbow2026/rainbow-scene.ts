import * as THREE from "three";

export type RainbowSceneController = {
  setVisible: (visible: boolean) => void;
  dispose: () => void;
};

type RainbowSceneOptions = {
  onUnavailable: () => void;
};

type Ribbon = {
  start: [number, number];
  end: [number, number];
  width: number;
  colors: [string, string];
  opacity: number;
};

// Flat, rising bands echo the poster's printed ribbons while keeping its flower in front.
const ribbons: Ribbon[] = [
  { start: [-6.1, -5.7], end: [-0.6, -0.2], width: 0.7, colors: ["#fff0e9", "#ff5b6b"], opacity: 0.2 },
  { start: [-5.1, -6.1], end: [0.5, -0.5], width: 0.84, colors: ["#fff5ec", "#ffac56"], opacity: 0.2 },
  { start: [-3.7, -5.8], end: [1.2, -0.9], width: 0.64, colors: ["#fffcef", "#ffe06b"], opacity: 0.2 },
  { start: [0.3, -1.2], end: [5.7, 4.2], width: 0.73, colors: ["#c9ef6b", "#89d9cc"], opacity: 0.17 },
  { start: [1.0, -3.5], end: [6.3, 1.8], width: 0.62, colors: ["#b1ebed", "#77cfff"], opacity: 0.2 },
  { start: [0.6, -5.0], end: [6.2, 0.6], width: 0.67, colors: ["#e0f0ff", "#86a9ff"], opacity: 0.19 },
  { start: [2.0, -4.6], end: [6.9, 0.3], width: 0.85, colors: ["#f0e8ff", "#c497f5"], opacity: 0.18 },
];

export function createRainbowScene(
  canvas: HTMLCanvasElement,
  root: HTMLElement,
  options: RainbowSceneOptions,
): RainbowSceneController {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
  if (!context || context.isContextLost()) throw new Error("WebGL2 unavailable");
  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setClearColor(0xffffff, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvas.dataset.renderer = "three";

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 30);
  camera.position.set(0, 0, 15);
  const world = new THREE.Group();
  scene.add(world);
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.MeshBasicMaterial[] = [];

  ribbons.forEach((ribbon, index) => {
    const start = new THREE.Vector2(...ribbon.start);
    const end = new THREE.Vector2(...ribbon.end);
    const direction = end.clone().sub(start).normalize();
    const side = new THREE.Vector2(-direction.y, direction.x).multiplyScalar(ribbon.width / 2);
    const corners = [start.clone().add(side), start.clone().sub(side), end.clone().add(side), end.clone().sub(side)];
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(corners.flatMap((point) => [point.x, point.y, 0]), 3));
    geometry.setIndex([0, 1, 2, 2, 1, 3]);
    const startColor = new THREE.Color(ribbon.colors[0]);
    const endColor = new THREE.Color(ribbon.colors[1]);
    geometry.setAttribute("color", new THREE.Float32BufferAttribute([
      ...startColor.toArray(), ...startColor.toArray(), ...endColor.toArray(), ...endColor.toArray(),
    ], 3));
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: ribbon.opacity,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = (index - 3) * 0.11;
    world.add(mesh);
    geometries.push(geometry);
    materials.push(material);
  });

  let disposed = false;
  let visible = false;
  let frame = 0;
  let previousTime = 0;
  let targetX = 0;
  let targetY = 0;

  function render() {
    if (!disposed && visible) renderer.render(scene, camera);
  }

  function tick(time: number) {
    frame = 0;
    if (disposed || !visible) return;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 1 / 60;
    previousTime = time;
    const damping = 1 - Math.exp(-9 * dt);
    world.rotation.x += (targetX - world.rotation.x) * damping;
    world.rotation.y += (targetY - world.rotation.y) * damping;
    const settled = Math.abs(targetX - world.rotation.x) + Math.abs(targetY - world.rotation.y) < 0.0001;
    if (settled) world.rotation.set(targetX, targetY, 0);
    render();
    if (!settled) frame = window.requestAnimationFrame(tick);
    else {
      previousTime = 0;
      canvas.dataset.runtime = "still";
    }
  }

  function schedule() {
    if (disposed || !visible || frame) return;
    canvas.dataset.runtime = "moving";
    frame = window.requestAnimationFrame(tick);
  }

  function onPointerMove(event: PointerEvent) {
    // The decorative canvas never captures a pointer or interrupts touch scrolling.
    if (!visible || event.pointerType !== "mouse" || !event.isPrimary) return;
    const bounds = root.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    targetX = THREE.MathUtils.clamp((event.clientY - bounds.top) / bounds.height - 0.5, -0.5, 0.5) * 0.06;
    targetY = THREE.MathUtils.clamp((event.clientX - bounds.left) / bounds.width - 0.5, -0.5, 0.5) * 0.09;
    schedule();
  }

  function onPointerLeave() {
    targetX = 0;
    targetY = 0;
    schedule();
  }

  function setVisible(value: boolean) {
    if (disposed || visible === value) return;
    visible = value;
    window.cancelAnimationFrame(frame);
    frame = 0;
    previousTime = 0;
    targetX = 0;
    targetY = 0;
    world.rotation.set(0, 0, 0);
    canvas.dataset.runtime = value ? "still" : "paused";
    render();
  }

  function resize() {
    if (disposed) return;
    const bounds = root.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const aspect = bounds.width / bounds.height;
    camera.left = -5 * aspect;
    camera.right = 5 * aspect;
    camera.updateProjectionMatrix();
    world.scale.x = aspect;
    renderer.setSize(bounds.width, bounds.height, false);
    render();
  }

  function onContextLost(event: Event) {
    event.preventDefault();
    setVisible(false);
    options.onUnavailable();
  }

  root.addEventListener("pointermove", onPointerMove, { passive: true });
  root.addEventListener("pointerleave", onPointerLeave, { passive: true });
  canvas.addEventListener("webglcontextlost", onContextLost);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(root);
  resize();

  return {
    setVisible,
    dispose() {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      // Keep the canvas context usable if the motion preference is enabled again.
      scene.clear();
      delete canvas.dataset.renderer;
      delete canvas.dataset.runtime;
    },
  };
}
