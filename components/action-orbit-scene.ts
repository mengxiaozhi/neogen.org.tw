import * as THREE from "three";

import type { ActionIndex } from "@/components/action-experience";

export interface ActionOrbitController {
  setActive(index: ActionIndex): void;
  setVisible(visible: boolean): void;
  reset(): void;
  dispose(): void;
}

type ActionOrbitOptions = {
  activeIndex: ActionIndex;
  onSelect(index: ActionIndex): void;
  onUnavailable(): void;
};

const ACTION_POSITIONS = [
  new THREE.Vector3(-1.9, -0.72, 0.5),
  new THREE.Vector3(0.1, 1.84, -0.36),
  new THREE.Vector3(1.95, -0.68, 0.42),
] as const;

export function createActionOrbitScene(
  canvas: HTMLCanvasElement,
  options: ActionOrbitOptions,
): ActionOrbitController {
  const context = canvas.getContext("webgl2", {
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  if (!context) throw new Error("WebGL2 unavailable");

  const renderer = new THREE.WebGLRenderer({
    canvas,
    context,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0xf4f4f2, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  canvas.dataset.renderer = "three";

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-4, 4, 3, -3, 0.1, 30);
  camera.position.set(0, 0, 8);
  camera.lookAt(0, 0, 0);

  const world = new THREE.Group();
  const orbitGroup = new THREE.Group();
  world.rotation.set(-0.38, 0.18, -0.05);
  orbitGroup.rotation.set(0.08, -0.1, 0);
  world.add(orbitGroup);
  scene.add(world);

  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const createMaterial = (color: number, opacity = 1) => {
    const value = new THREE.MeshBasicMaterial({
      color,
      opacity,
      transparent: opacity < 1,
    });
    materials.add(value);
    return value;
  };

  const ink = new THREE.Color(0x0a0a0a);
  const muted = new THREE.Color(0x777773);
  const orange = new THREE.Color(0xf2380a);
  const ringGeometry = new THREE.TorusGeometry(2.35, 0.018, 4, 96);
  const nodeGeometry = new THREE.IcosahedronGeometry(0.105, 0);
  const actionGeometry = new THREE.IcosahedronGeometry(0.27, 1);
  const coreGeometry = new THREE.IcosahedronGeometry(0.42, 1);
  geometries.add(ringGeometry);
  geometries.add(nodeGeometry);
  geometries.add(actionGeometry);
  geometries.add(coreGeometry);

  const ringMaterial = createMaterial(0x0a0a0a, 0.72);
  const nodeMaterial = createMaterial(0xffffff);
  const actionMaterial = createMaterial(0xffffff);
  const coreMaterial = createMaterial(0xf2380a);

  const rings = [
    new THREE.Mesh(ringGeometry, ringMaterial),
    new THREE.Mesh(ringGeometry, ringMaterial),
    new THREE.Mesh(ringGeometry, ringMaterial),
  ];
  rings[0].rotation.set(0, 0, 0);
  rings[1].rotation.set(1.02, 0.22, 0.38);
  rings[2].rotation.set(0.42, 1.08, -0.22);
  rings.forEach((ring) => orbitGroup.add(ring));

  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  orbitGroup.add(core);

  const nodeCount = 15;
  const nodes = new THREE.InstancedMesh(
    nodeGeometry,
    nodeMaterial,
    nodeCount,
  );
  const dummy = new THREE.Object3D();
  for (let index = 0; index < nodeCount; index++) {
    const angle = (index / nodeCount) * Math.PI * 2;
    const radius = 2.35;
    dummy.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius,
      Math.sin(angle * 3) * 0.34,
    );
    dummy.rotation.set(angle * 0.2, angle, -angle * 0.18);
    dummy.scale.setScalar(index % 4 === 0 ? 1.25 : 0.82);
    dummy.updateMatrix();
    nodes.setMatrixAt(index, dummy.matrix);
    nodes.setColorAt(index, index % 5 === 0 ? ink : muted);
  }
  nodes.instanceMatrix.needsUpdate = true;
  if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;
  orbitGroup.add(nodes);

  const actionNodes = new THREE.InstancedMesh(
    actionGeometry,
    actionMaterial,
    ACTION_POSITIONS.length,
  );
  actionNodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
  ACTION_POSITIONS.forEach((position, index) => {
    dummy.position.copy(position);
    dummy.rotation.set(index * 0.4, index * 0.72, index * 0.2);
    dummy.scale.setScalar(1);
    dummy.updateMatrix();
    actionNodes.setMatrixAt(index, dummy.matrix);
  });
  orbitGroup.add(actionNodes);

  const linePoints: number[] = [];
  ACTION_POSITIONS.forEach((position) => {
    linePoints.push(0, 0, 0, position.x, position.y, position.z);
  });
  const spokeGeometry = new THREE.BufferGeometry();
  spokeGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(linePoints, 3),
  );
  geometries.add(spokeGeometry);
  const spokeMaterial = new THREE.LineBasicMaterial({
    color: 0x0a0a0a,
    opacity: 0.28,
    transparent: true,
  });
  materials.add(spokeMaterial);
  const spokes = new THREE.LineSegments(spokeGeometry, spokeMaterial);
  orbitGroup.add(spokes);

  const raycaster = new THREE.Raycaster();
  const pointerPosition = new THREE.Vector2();
  let disposed = false;
  let visible = true;
  let activeIndex = options.activeIndex;
  let animationFrame = 0;
  let animationToken = 0;

  function render() {
    if (!disposed && visible) renderer.render(scene, camera);
  }

  function updateActionNodes(progress = 1) {
    ACTION_POSITIONS.forEach((position, index) => {
      const active = index === activeIndex;
      dummy.position.copy(position);
      dummy.rotation.set(
        index * 0.4 + progress * 0.16,
        index * 0.72 + progress * 0.22,
        index * 0.2,
      );
      dummy.scale.setScalar(active ? 1 + progress * 0.42 : 1);
      dummy.updateMatrix();
      actionNodes.setMatrixAt(index, dummy.matrix);
      actionNodes.setColorAt(index, active ? orange : ink);
    });
    actionNodes.instanceMatrix.needsUpdate = true;
    if (actionNodes.instanceColor) actionNodes.instanceColor.needsUpdate = true;
  }

  function animateSelection() {
    window.cancelAnimationFrame(animationFrame);
    const token = ++animationToken;
    const startedAt = performance.now();
    const fromRotation = orbitGroup.rotation.z;
    const targetRotation = (activeIndex - 1) * 0.12;

    const step = (time: number) => {
      if (disposed || !visible || token !== animationToken) return;
      const progress = Math.min(1, (time - startedAt) / 460);
      const eased = 1 - Math.pow(1 - progress, 3);
      orbitGroup.rotation.z = THREE.MathUtils.lerp(
        fromRotation,
        targetRotation,
        eased,
      );
      core.scale.setScalar(1 + Math.sin(progress * Math.PI) * 0.14);
      updateActionNodes(eased);
      render();

      if (progress < 1) animationFrame = window.requestAnimationFrame(step);
      else core.scale.setScalar(1);
    };

    animationFrame = window.requestAnimationFrame(step);
  }

  function setActive(index: ActionIndex) {
    activeIndex = index;
    updateActionNodes(0);
    if (visible) animateSelection();
  }

  function updatePointer(event: PointerEvent) {
    if (!visible) return;
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    const y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
    world.rotation.y = 0.18 + x * 0.1;
    world.rotation.x = -0.38 + y * 0.07;
    canvas.style.cursor = hitActionNode(event) !== null ? "pointer" : "default";
    render();
  }

  function hitActionNode(event: PointerEvent) {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return null;
    pointerPosition.set(
      (event.clientX - bounds.left) / bounds.width * 2 - 1,
      -(event.clientY - bounds.top) / bounds.height * 2 + 1,
    );
    raycaster.setFromCamera(pointerPosition, camera);
    const hit = raycaster.intersectObject(actionNodes, false)[0];
    return typeof hit?.instanceId === "number"
      ? (hit.instanceId as ActionIndex)
      : null;
  }

  function onPointerUp(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    const index = hitActionNode(event);
    if (index === null) return;
    options.onSelect(index);
  }

  function onPointerLeave() {
    world.rotation.set(-0.38, 0.18, -0.05);
    canvas.style.cursor = "default";
    render();
  }

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const aspect = bounds.width / bounds.height;
    const height = 5.8;
    camera.left = -height * aspect / 2;
    camera.right = height * aspect / 2;
    camera.top = height / 2;
    camera.bottom = -height / 2;
    camera.updateProjectionMatrix();
    renderer.setSize(bounds.width, bounds.height, false);
    render();
  }

  function setVisible(value: boolean) {
    visible = value;
    canvas.dataset.runtime = value ? "ready" : "paused";
    if (!value) {
      animationToken++;
      window.cancelAnimationFrame(animationFrame);
    } else {
      resize();
    }
  }

  function reset() {
    activeIndex = options.activeIndex;
    world.rotation.set(-0.38, 0.18, -0.05);
    orbitGroup.rotation.set(0.08, -0.1, 0);
    core.scale.setScalar(1);
    updateActionNodes(1);
    render();
  }

  function onContextLost(event: Event) {
    event.preventDefault();
    setVisible(false);
    options.onUnavailable();
  }

  canvas.addEventListener("pointermove", updatePointer, { passive: true });
  canvas.addEventListener("pointerup", onPointerUp);
  canvas.addEventListener("pointerleave", onPointerLeave);
  canvas.addEventListener("webglcontextlost", onContextLost);
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  updateActionNodes(1);
  resize();
  canvas.dataset.interaction = "orbit";

  return {
    setActive,
    setVisible,
    reset,
    dispose() {
      if (disposed) return;
      disposed = true;
      animationToken++;
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointermove", updatePointer);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      nodes.dispose();
      actionNodes.dispose();
      renderer.dispose();
      if (
        !context.isContextLost() &&
        context.getExtension("WEBGL_lose_context")
      ) {
        renderer.forceContextLoss();
      }
      scene.clear();
      delete canvas.dataset.renderer;
      delete canvas.dataset.runtime;
      delete canvas.dataset.interaction;
    },
  };
}
