import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import initAmmo from "./ammo-demo";
import loadAmmo from "./physics/ammo-loader";

const AmmoLib = await loadAmmo();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 3;

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
let ammoDemo: any = null;

initAmmo(scene).then((demo) => {
  ammoDemo = demo;
});

const input = { forward: false, backward: false, left: false, right: false };

window.addEventListener("keydown", (event) => {
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
});

window.addEventListener("keyup", (event) => {
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
});

function checkWinCondition() {
  if (!ammoDemo) return;
  const boxMesh = ammoDemo.bodies[0].mesh;

  const boxX = boxMesh.position.x;
  const boxY = boxMesh.position.y;
  const boxZ = boxMesh.position.z;

  //potentially can change this to dyanmic size of the barriers
  const insideX = boxX > -1 && boxX < 1;
  const insideZ = boxZ > -1 && boxZ < 1;

  if (insideX && insideZ && boxY < 1) {
    console.log("WIN!");
  }
}

function applyMovement() {
  if (!ammoDemo) return;

  const body = ammoDemo.bodies[0].body;

  const impulse = new AmmoLib.btVector3(0, 0, 0);
  const moveSpeed = 1;

  if (input.forward) {
    impulse.op_add(new AmmoLib.btVector3(0, moveSpeed, 0));
  }
  if (input.backward) {
    impulse.op_add(new AmmoLib.btVector3(0, -moveSpeed, 0));
  }
  if (input.left) {
    impulse.op_add(new AmmoLib.btVector3(-moveSpeed, 0, 0));
  }
  if (input.right) {
    impulse.op_add(new AmmoLib.btVector3(moveSpeed, 0, 0));
  }

  body.applyCentralImpulse(impulse);
}

//like update in unity
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

animate();
