import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import initAmmo from "./ammo-demo";
import loadAmmo from "./physics/ammo-loader";

type InputState = {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
};

type AmmoBodyEntry = {
  mesh: THREE.Mesh;
  body: any; 
};

type AmmoDemo = {
  bodies: AmmoBodyEntry[];
  update: (delta: number) => void;
};

const CAMERA_FOV = 75;
const CAMERA_NEAR = 0.1;
const CAMERA_FAR = 1000;
const CAMERA_ZOOM = 4;

const MOVE_SPEED = 0.5;

const WIN_ZONE_MIN = 0;
const WIN_ZONE_MAX = 0.1;
const WIN_MAX_HEIGHT = 1;

const DEBUG_LOG_POSITIONS = false;

const AmmoLib = await loadAmmo();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  CAMERA_FOV,
  window.innerWidth / window.innerHeight,
  CAMERA_NEAR,
  CAMERA_FAR,
);
camera.position.z = CAMERA_ZOOM;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();

let ammoDemo: AmmoDemo | null = null;
let hasWon = false;

const input: InputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

const movementImpulse = new AmmoLib.btVector3(0, 0, 0);

function getPlayer(): AmmoBodyEntry | null {
  if (!ammoDemo || !ammoDemo.bodies || ammoDemo.bodies.length === 0) return null;
  return ammoDemo.bodies[0];
}

function handleKeyDown(event: KeyboardEvent) {
  switch (event.code) {
    case "KeyW":
      input.forward = true;
      break;
    case "KeyS":
      input.backward = true;
      break;
    case "KeyA":
      input.left = true;
      break;
    case "KeyD":
      input.right = true;
      break;
  }
}

function handleKeyUp(event: KeyboardEvent) {
  switch (event.code) {
    case "KeyW":
      input.forward = false;
      break;
    case "KeyS":
      input.backward = false;
      break;
    case "KeyA":
      input.left = false;
      break;
    case "KeyD":
      input.right = false;
      break;
  }
}

function applyMovement() {
  const player = getPlayer();
  if (!player) return;

  const { body, mesh } = player;

  if (DEBUG_LOG_POSITIONS) {
    console.log("Player position:", mesh.position.x, mesh.position.y, mesh.position.z);
  }

  movementImpulse.setValue(0, 0, 0);

  if (input.forward) {
    movementImpulse.op_add(new AmmoLib.btVector3(0, MOVE_SPEED, 0));
  }
  if (input.backward) {
    movementImpulse.op_add(new AmmoLib.btVector3(0, -MOVE_SPEED, 0));
  }
  if (input.left) {
    movementImpulse.op_add(new AmmoLib.btVector3(-MOVE_SPEED, 0, 0));
  }
  if (input.right) {
    movementImpulse.op_add(new AmmoLib.btVector3(MOVE_SPEED, 0, 0));
  }

  body.applyCentralImpulse(movementImpulse);
}

function checkWinCondition() {
  const player = getPlayer();
  if (!player || hasWon) return;

  const { mesh } = player;
  const { x, y, z } = mesh.position;

  const insideX = x > WIN_ZONE_MIN && x < WIN_ZONE_MAX;
  const insideZ = z > WIN_ZONE_MIN && z < WIN_ZONE_MAX;

  if (insideX && insideZ && y < WIN_MAX_HEIGHT) {
    hasWon = true;

    const material = mesh.material as THREE.MeshBasicMaterial | THREE.Material | THREE.Material[];
    if (Array.isArray(material)) {
      material.forEach((mat) => {
        const basic = mat as THREE.MeshBasicMaterial;
        if ((basic as any).color) {
          basic.color.setHex(0x00ff00);
        }
      });
    } else {
      const basic = material as THREE.MeshBasicMaterial;
      if ((basic as any).color) {
        basic.color.setHex(0x00ff00);
      }
    }

    console.log("WIN!", x, z);
  }
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (ammoDemo && typeof ammoDemo.update === "function") {
    ammoDemo.update(delta);
  }

  controls.update();
  applyMovement();
  checkWinCondition();

  renderer.render(scene, camera);
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

initAmmo(scene).then((demo) => {
  ammoDemo = demo as AmmoDemo;
});

animate();
