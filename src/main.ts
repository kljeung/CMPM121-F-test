import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import initAmmo from "./ammo-demo";

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

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const controls = new OrbitControls(camera, renderer.domElement);

const clock = new THREE.Clock();
let ammoDemo: any = null;

initAmmo(scene).then((demo) => {
  ammoDemo = demo;
});

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.005;
  cube.rotation.z += 0.01;

  if (ammoDemo && typeof ammoDemo.update === "function") {
    ammoDemo.update(delta);
  }

  controls.update();
  renderer.render(scene, camera);
}

animate();
