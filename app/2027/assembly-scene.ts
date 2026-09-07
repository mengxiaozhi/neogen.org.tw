import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

export interface AssemblyController {
  strike(): void;
  nextSeat(): void;
  reset(): void;
  setVisible(visible: boolean): void;
  dispose(): void;
}

interface SceneOptions {
  reducedMotion: boolean;
  onMessage(message: string): void;
  onUnavailable(): void;
}

interface Chair {
  group: THREE.Group;
  panels: THREE.Mesh[];
  material: THREE.Material;
  velocity: number;
  bounce: number;
}

export function createAssemblyScene(canvas: HTMLCanvasElement, options: SceneOptions): AssemblyController {
  const context = canvas.getContext("webgl2", { alpha: true, antialias: true, powerPreference: "low-power" });
  if (!context) throw new Error("WebGL2 unavailable");

  const renderer = new THREE.WebGLRenderer({ canvas, context, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setClearColor(0xf7f5e9, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 761 ? 1.25 : 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  canvas.dataset.renderer = "three";

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-6, 6, 6, -6, 0.1, 70);
  camera.position.set(9.5, 8.6, 12);
  camera.lookAt(0, 1.3, 0);
  const world = new THREE.Group();
  world.rotation.y = -0.12;
  scene.add(world);
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const shapeCache = new Map<string, THREE.BufferGeometry>();
  const hitTargets: THREE.Mesh[] = [];

  function material(color: string) {
    const value = new THREE.MeshStandardMaterial({ color, roughness: 0.88, metalness: 0 });
    materials.add(value);
    return value;
  }
  const green = material("#195b32");
  const orange = material("#e85505");
  const yellow = material("#ffe02c");
  const cream = material("#fffbea");
  const paper = material("#e9e5d1");
  const lightGreen = material("#acc582");
  const dark = material("#104b2a");

  function geometry(key: string, create: () => THREE.BufferGeometry) {
    if (!shapeCache.has(key)) {
      const value = create();
      shapeCache.set(key, value);
      geometries.add(value);
    }
    return shapeCache.get(key)!;
  }
  function mesh(parent: THREE.Object3D, shape: THREE.BufferGeometry, surface: THREE.Material, x = 0, y = 0, z = 0) {
    const value = new THREE.Mesh(shape, surface);
    value.position.set(x, y, z);
    value.castShadow = true;
    value.receiveShadow = true;
    parent.add(value);
    return value;
  }
  function box(parent: THREE.Object3D, w: number, h: number, d: number, surface: THREE.Material, x = 0, y = 0, z = 0) {
    const shape = geometry(`box-${w}-${h}-${d}`, () => new RoundedBoxGeometry(w, h, d, 1, Math.min(0.045, h / 4, w / 4, d / 4)));
    return mesh(parent, shape, surface, x, y, z);
  }
  function cylinder(parent: THREE.Object3D, top: number, bottom: number, height: number, surface: THREE.Material, x = 0, y = 0, z = 0) {
    const shape = geometry(`cylinder-${top}-${bottom}-${height}`, () => new THREE.CylinderGeometry(top, bottom, height, 32));
    return mesh(parent, shape, surface, x, y, z);
  }

  scene.add(new THREE.HemisphereLight(0xfff9e7, 0xaab8a3, 2.8));
  const keyLight = new THREE.DirectionalLight(0xfffaf0, 3.1);
  keyLight.position.set(-5, 10, 7);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.setScalar(window.innerWidth < 761 ? 512 : 1024);
  keyLight.shadow.camera.left = -7;
  keyLight.shadow.camera.right = 7;
  keyLight.shadow.camera.top = 7;
  keyLight.shadow.camera.bottom = -7;
  keyLight.shadow.normalBias = 0.035;
  keyLight.shadow.bias = -0.0002;
  scene.add(keyLight);
  const fillLight = new THREE.DirectionalLight(0xffe4b0, 1.1);
  fillLight.position.set(6, 4, -5);
  scene.add(fillLight);

  const floorMaterial = new THREE.ShadowMaterial({ opacity: 0.14, color: 0x195b32 });
  materials.add(floorMaterial);
  const floor = mesh(scene, geometry("floor", () => new THREE.PlaneGeometry(100, 100)), floorMaterial, 0, -0.26, 0);
  floor.rotation.x = -Math.PI / 2;
  floor.castShadow = false;
  cylinder(world, 4.6, 4.6, 0.16, green, 0, -0.13, 0);
  cylinder(world, 4.56, 4.56, 0.14, paper, 0, 0, 0);
  const ring = mesh(world, geometry("ring", () => new THREE.RingGeometry(4.08, 4.1, 80)), green, 0, 0.077, 0);
  ring.rotation.x = -Math.PI / 2;
  ring.castShadow = false;

  // A miniature civic building, not a model of the announced event venue.
  const building = new THREE.Group();
  building.position.set(0, 0.12, -1.65);
  world.add(building);
  box(building, 4.85, 0.18, 1.8, cream, 0, 0.09, 0.12);
  box(building, 4.55, 0.16, 1.6, orange, 0, 0.26, 0.08);
  box(building, 4.3, 1.65, 0.68, orange, 0, 1.15, -0.28);
  box(building, 4.52, 0.22, 1.43, cream, 0, 2.04, 0);
  box(building, 4.7, 0.15, 1.58, green, 0, 2.22, 0);
  for (let i = -2; i <= 2; i++) {
    cylinder(building, 0.13, 0.16, 1.51, cream, i * 0.82, 1.18, 0.58);
    box(building, 0.36, 0.11, 0.38, cream, i * 0.82, 0.47, 0.58);
    box(building, 0.36, 0.11, 0.38, cream, i * 0.82, 1.91, 0.58);
  }
  const pediment = new THREE.Shape();
  pediment.moveTo(-2.4, 0);
  pediment.lineTo(0, 0.91);
  pediment.lineTo(2.4, 0);
  pediment.closePath();
  mesh(building, geometry("pediment", () => new THREE.ExtrudeGeometry(pediment, { depth: 1.35, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 1, steps: 1 })), orange, 0, 2.34, -0.64);
  const roofSeal = cylinder(building, 0.22, 0.22, 0.04, yellow, 0, 2.63, 0.76);
  roofSeal.rotation.x = Math.PI / 2;
  for (const side of [-1, 1]) {
    box(building, 0.8, 1.2, 1.16, orange, side * 2.43, 0.87, -0.07);
    for (const y of [0.65, 1.08]) {
      for (const offset of [-0.19, 0.19]) box(building, 0.17, 0.23, 0.05, cream, side * 2.43 + offset, y, 0.535);
    }
  }
  for (let i = 0; i < 3; i++) box(world, 2.65 - i * 0.22, 0.13, 0.32, cream, 0, 0.14 + i * 0.13, -0.19 - i * 0.29);

  const chairs: Chair[] = [];
  const seatColors = [orange, green, yellow, green, orange, lightGreen, green];
  for (let index = 0; index < 7; index++) {
    const angle = -1.33 + index * 2.66 / 6;
    const group = new THREE.Group();
    group.position.set(Math.sin(angle) * 3.39, 0.13, Math.cos(angle) * 3.39);
    group.rotation.y = angle + Math.PI;
    world.add(group);
    const surface = seatColors[index];
    const seat = box(group, 0.7, 0.13, 0.65, surface, 0, 0.48, 0);
    const back = box(group, 0.7, 0.61, 0.115, surface, 0, 0.86, -0.275);
    back.rotation.x = -0.08;
    for (const x of [-0.26, 0.26]) {
      for (const z of [-0.235, 0.235]) box(group, 0.085, 0.44, 0.085, dark, x, 0.23, z);
      box(group, 0.073, 0.065, 0.52, dark, x, 0.21, 0);
    }
    // The warm accent on the chair backs reads like a small folded paper label.
    box(group, 0.28, 0.075, 0.012, cream, 0, 0.91, -0.342);
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.userData.chair = index;
        hitTargets.push(child);
      }
    });
    chairs.push({ group, panels: [seat, back], material: surface, velocity: 0, bounce: 0 });
  }

  cylinder(world, 0.51, 0.65, 0.55, green, 0.29, 0.43, 0.9);
  cylinder(world, 0.65, 0.65, 0.13, yellow, 0.29, 0.77, 0.9);
  cylinder(world, 0.42, 0.44, 0.11, orange, 0.29, 0.89, 0.9);
  const gavel = new THREE.Group();
  gavel.position.set(1, 1.82, 0.9);
  gavel.rotation.z = -0.42;
  world.add(gavel);
  const handle = cylinder(gavel, 0.085, 0.11, 1.3, green, -0.32, 0, 0);
  handle.rotation.z = Math.PI / 2;
  const head = cylinder(gavel, 0.28, 0.28, 0.74, orange, -1.08, 0, 0);
  head.rotation.x = Math.PI / 2;
  for (const z of [-0.39, 0.39]) {
    const cap = cylinder(gavel, 0.32, 0.32, 0.11, yellow, -1.08, 0, z);
    cap.rotation.x = Math.PI / 2;
  }
  gavel.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.userData.gavel = true;
      hitTargets.push(child);
    }
  });

  const sun = new THREE.Group();
  sun.position.set(2.55, 4.35, -2.3);
  sun.rotation.y = 0.35;
  world.add(sun);
  mesh(sun, geometry("sun", () => new THREE.SphereGeometry(0.48, 28, 20)), yellow);
  for (let i = 0; i < 10; i++) {
    const angle = i * Math.PI * 2 / 10;
    const ray = box(sun, 0.055, 0.24, 0.07, yellow, Math.sin(angle) * 0.8, Math.cos(angle) * 0.8, 0);
    ray.rotation.z = -angle;
  }
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.bezierCurveTo(-0.65, 0.45, -0.3, 1.1, 0, 1.45);
  leafShape.bezierCurveTo(0.3, 1.1, 0.65, 0.45, 0, 0);
  const leafGeometry = geometry("leaf", () => new THREE.ExtrudeGeometry(leafShape, { depth: 0.07, bevelEnabled: true, bevelSize: 0.02, bevelThickness: 0.02, bevelSegments: 1, steps: 1, curveSegments: 10 }));
  for (const side of [-1, 1]) {
    const plant = new THREE.Group();
    plant.position.set(side * 3.4, 0.12, -1.75);
    world.add(plant);
    for (let i = 0; i < 3; i++) {
      const leaf = mesh(plant, leafGeometry, i === 1 ? lightGreen : green, (i - 1) * 0.16, 0, 0);
      leaf.rotation.z = (i - 1) * 0.58;
      leaf.rotation.y = side * 0.35;
    }
  }

  const particleCount = 48;
  const confettiMaterial = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
  materials.add(confettiMaterial);
  const confetti = new THREE.InstancedMesh(geometry("confetti", () => new THREE.PlaneGeometry(0.12, 0.23)), confettiMaterial, particleCount);
  confetti.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  confetti.frustumCulled = false;
  confetti.visible = false;
  world.add(confetti);
  const dummy = new THREE.Object3D();
  const particleColors = [new THREE.Color("#ffe02c"), new THREE.Color("#e85505"), new THREE.Color("#195b32")];
  const particles = Array.from({ length: particleCount }, (_, index) => {
    confetti.setColorAt(index, particleColors[index % 3]);
    return { position: new THREE.Vector3(), velocity: new THREE.Vector3(), rotation: new THREE.Vector3() };
  });

  let disposed = false;
  let visible = true;
  let frame = 0;
  let previousTime = 0;
  let elapsed = 0;
  let strikeTime = -1;
  let burstTime = -1;
  let impactDone = false;
  let targetYaw = -0.12;
  let targetPitch = 0;
  let selectedChair = -1;
  let hoverX = 0;
  let hoverY = 0;
  let pointer: { id: number; x: number; y: number; yaw: number; pitch: number; dragging: boolean; vertical: boolean; touch: boolean } | null = null;
  const raycaster = new THREE.Raycaster();
  const pointerPosition = new THREE.Vector2();

  function render() {
    if (!disposed && visible) renderer.render(scene, camera);
  }
  function burst() {
    burstTime = elapsed;
    confetti.visible = true;
    particles.forEach((particle, index) => {
      const angle = index * 2.39996;
      const force = 1.05 + (index % 7) * 0.2;
      particle.position.set(0.29, 1.04, 0.9);
      particle.velocity.set(Math.cos(angle) * force, 2.2 + (index % 5) * 0.25, Math.sin(angle) * force);
      particle.rotation.set(angle, angle * 0.5, angle * 0.7);
    });
    chairs.forEach((chair, index) => { chair.velocity = 1.5 + Math.sin(index) * 0.45; });
  }
  function selectChair(index: number) {
    selectedChair = index;
    const chair = chairs[index];
    chair.panels.forEach((panel) => { panel.material = panel.material === yellow ? orange : yellow; });
    if (!options.reducedMotion) chair.velocity = 2.3;
    canvas.dataset.interaction = "chair";
    options.onMessage(`第 ${index + 1} 張椅子換上新色彩。每個聲音，都值得被聽見。`);
    render();
  }
  function strike() {
    canvas.dataset.interaction = "gavel";
    if (options.reducedMotion) {
      chairs.forEach((chair, index) => { chair.panels.forEach((panel) => { panel.material = index % 2 === 0 ? yellow : orange; }); });
      gavel.rotation.z = 0.68;
      render();
    } else {
      strikeTime = elapsed;
      impactDone = false;
    }
    options.onMessage("叩！讓對話開始，讓不同觀點都有位置。");
  }
  function reset() {
    strikeTime = -1;
    burstTime = -1;
    confetti.visible = false;
    targetYaw = -0.12;
    targetPitch = 0;
    hoverX = 0;
    hoverY = 0;
    selectedChair = -1;
    pointer = null;
    chairs.forEach((chair) => {
      chair.velocity = 0;
      chair.bounce = 0;
      chair.group.position.y = 0.13;
      chair.group.rotation.z = 0;
      chair.panels.forEach((panel) => { panel.material = chair.material; });
    });
    gavel.rotation.z = -0.42;
    world.rotation.set(0, targetYaw, 0);
    canvas.dataset.interaction = "reset";
    options.onMessage("小劇場已重新排好，換個角度繼續探索。");
    render();
  }

  function tick(time: number) {
    if (disposed || !visible) return;
    const dt = previousTime ? Math.min((time - previousTime) / 1000, 0.04) : 1 / 60;
    previousTime = time;
    elapsed += dt;
    const damping = 1 - Math.exp(-8 * dt);
    world.rotation.y += (targetYaw + hoverX * 0.045 - world.rotation.y) * damping;
    world.rotation.x += (targetPitch + hoverY * 0.025 - world.rotation.x) * damping;
    sun.position.y = 4.35 + Math.sin(elapsed * 0.9) * 0.055;
    sun.rotation.z = Math.sin(elapsed * 0.5) * 0.045;

    if (strikeTime >= 0) {
      const t = elapsed - strikeTime;
      if (t < 0.18) gavel.rotation.z = -0.42 - Math.sin(t / 0.18 * Math.PI / 2) * 0.34;
      else if (t < 0.4) gavel.rotation.z = -0.76 + Math.pow((t - 0.18) / 0.22, 2) * 1.44;
      else {
        if (!impactDone) { burst(); impactDone = true; }
        gavel.rotation.z = 0.68 - Math.min(1, (t - 0.4) / 0.65) * 1.1;
        if (t > 1.05) strikeTime = -1;
      }
    }
    chairs.forEach((chair, index) => {
      if (chair.bounce !== 0 || chair.velocity !== 0) {
        chair.velocity -= dt * 6.2;
        chair.bounce += chair.velocity * dt;
        if (chair.bounce < 0) { chair.bounce = 0; chair.velocity = 0; }
        chair.group.position.y = 0.13 + chair.bounce;
        chair.group.rotation.z = Math.sin(elapsed * 12 + index) * chair.bounce * 0.22;
      }
    });
    if (burstTime >= 0) {
      const age = elapsed - burstTime;
      if (age > 2) { burstTime = -1; confetti.visible = false; }
      else {
        particles.forEach((particle, index) => {
          particle.velocity.y -= 3.1 * dt;
          particle.position.addScaledVector(particle.velocity, dt);
          particle.rotation.x += dt * (2 + index % 3);
          particle.rotation.z += dt * 2.5;
          dummy.position.copy(particle.position);
          dummy.rotation.set(particle.rotation.x, particle.rotation.y, particle.rotation.z);
          dummy.scale.setScalar(particle.position.y < 0.1 ? 0 : Math.min(1, (2 - age) * 2));
          dummy.updateMatrix();
          confetti.setMatrixAt(index, dummy.matrix);
        });
        confetti.instanceMatrix.needsUpdate = true;
      }
    }
    render();
    frame = window.requestAnimationFrame(tick);
  }

  function hit(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    pointerPosition.set((event.clientX - bounds.left) / bounds.width * 2 - 1, -(event.clientY - bounds.top) / bounds.height * 2 + 1);
    raycaster.setFromCamera(pointerPosition, camera);
    return raycaster.intersectObjects(hitTargets, false)[0]?.object;
  }
  function onPointerDown(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = { id: event.pointerId, x: event.clientX, y: event.clientY, yaw: targetYaw, pitch: targetPitch, dragging: false, vertical: false, touch: event.pointerType !== "mouse" };
  }
  function onPointerMove(event: PointerEvent) {
    if (!event.isPrimary) return;
    if (pointer?.id === event.pointerId) {
      const dx = event.clientX - pointer.x;
      const dy = event.clientY - pointer.y;
      if (!pointer.dragging && pointer.touch && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 6) pointer.vertical = true;
      if (pointer.vertical) return;
      if (Math.abs(dx) + Math.abs(dy) > 6) {
        pointer.dragging = true;
        if (!canvas.hasPointerCapture(event.pointerId)) canvas.setPointerCapture(event.pointerId);
        targetYaw = THREE.MathUtils.clamp(pointer.yaw + dx * 0.005, -1.05, 1.05);
        targetPitch = pointer.touch ? 0 : THREE.MathUtils.clamp(pointer.pitch + dy * 0.0015, -0.12, 0.13);
        canvas.dataset.interaction = "rotate";
        if (options.reducedMotion) { world.rotation.set(targetPitch, targetYaw, 0); render(); }
      }
    } else if (event.pointerType === "mouse") {
      const object = hit(event);
      canvas.style.cursor = object ? "pointer" : "grab";
      hoverX = pointerPosition.x;
      hoverY = pointerPosition.y;
    }
  }
  function onPointerUp(event: PointerEvent) {
    if (pointer?.id !== event.pointerId) return;
    if (!pointer.dragging && !pointer.vertical) {
      const object = hit(event);
      if (typeof object?.userData.chair === "number") selectChair(object.userData.chair);
      else if (object?.userData.gavel) strike();
    }
    pointer = null;
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  }
  function onPointerCancel() { pointer = null; }
  function onPointerLeave() {
    hoverX = 0;
    hoverY = 0;
    if (pointer && !pointer.dragging) pointer = null;
  }
  function setVisible(value: boolean) {
    visible = value;
    canvas.dataset.runtime = value ? (options.reducedMotion ? "still" : "running") : "paused";
    window.cancelAnimationFrame(frame);
    previousTime = 0;
    if (value && !disposed) {
      if (options.reducedMotion) render();
      else frame = window.requestAnimationFrame(tick);
    }
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const aspect = bounds.width / bounds.height;
    const height = 11.3 / Math.min(aspect, 1);
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    render();
  }
  function onContextLost(event: Event) {
    event.preventDefault();
    setVisible(false);
    options.onUnavailable();
  }
  canvas.addEventListener("pointerdown", onPointerDown);
  canvas.addEventListener("pointermove", onPointerMove);
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointercancel", onPointerCancel);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("webglcontextlost", onContextLost);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();
  setVisible(true);

  return {
    strike,
    nextSeat: () => selectChair((selectedChair + 1) % chairs.length),
    reset,
    setVisible,
    dispose() {
      if (disposed) return;
      disposed = true;
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerCancel);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((value) => value.dispose());
      materials.forEach((value) => value.dispose());
      confetti.dispose();
      keyLight.shadow.dispose();
      renderer.dispose();
      if (!context.isContextLost() && context.getExtension("WEBGL_lose_context")) renderer.forceContextLoss();
      scene.clear();
      delete canvas.dataset.renderer;
      delete canvas.dataset.runtime;
      delete canvas.dataset.interaction;
    },
  };
}
