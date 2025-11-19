//SCENE IS TEMPORARY-> ONLY USED TO SEE IF AMMO.JS IS WORKING

import * as THREE from "three";
import loadAmmo from "./physics/ammo-loader";
import { createPhysicsWorld } from "./physics/world";
import { createBoxBody } from "./physics/body-factory";
import Ammo from "ammo.js";

export default async function initAmmo(scene: THREE.Scene) {
  const AmmoLib = await loadAmmo();
  const { physicsWorld } = createPhysicsWorld(AmmoLib);

  // Ground (three.js)
  const groundSize = 50;
  const groundGeometry = new THREE.BoxGeometry(groundSize, 1, groundSize);
  const groundMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMat);
  groundMesh.position.set(0, -0.5, 0);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Ground (Ammo) using factory helper
  const groundHalf = new AmmoLib.btVector3(groundSize / 2, 0.5, groundSize / 2);
  const groundPos = new AmmoLib.btVector3(0, -0.5, 0);
  const ground = createBoxBody(AmmoLib, groundHalf, groundPos, 0);
  physicsWorld.addRigidBody(ground.body);

  // Dynamic box (three.js)
  const boxSize = 0.5;
  const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const boxMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMat);
  boxMesh.position.set(0, 5, 0);
  scene.add(boxMesh);

  // Dynamic box (Ammo)
  const boxHalf = new AmmoLib.btVector3(boxSize / 2, boxSize / 2, boxSize / 2);
  const boxPos = new AmmoLib.btVector3(0, 2, 0);
  const box = createBoxBody(AmmoLib, boxHalf, boxPos, 1);
  boxMesh.userData.physicsBody = box.body;
  physicsWorld.addRigidBody(box.body);

  const bodies: { mesh: THREE.Mesh; body: any }[] = [
    { mesh: boxMesh, body: box.body },
  ];

  function makeBarrier(posX: number, posY: number, posZ: number) {
    const size = { x: 1, y: 0.5, z: 1 };
    const half = new AmmoLib.btVector3(size.x / 2, size.y / 2, size.z / 2);
    const pos = new AmmoLib.btVector3(posX, posY, posZ);
    const barrier = createBoxBody(AmmoLib, half, pos, 0);
    physicsWorld.addRigidBody(barrier.body);

    const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(posX, posY, posZ);
    scene.add(boxMesh);
    bodies.push({ mesh: boxMesh, body: barrier.body });
  }

  function makeGoal(posX: number, posY: number, posZ: number) {
    const size = { x: 1, y: 0.5, z: 1 };
    const half = new AmmoLib.btVector3(size.x / 2, size.y / 2, size.z / 2);
    const pos = new AmmoLib.btVector3(posX, posY, posZ);
    const goal = createBoxBody(AmmoLib, half, pos, 0);
    physicsWorld.addRigidBody(goal.body);

    const boxGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    boxMesh.position.set(posX, posY, posZ);
    boxMesh.userData.physicsBody = goal.body;
    scene.add(boxMesh);
    bodies.push({ mesh: boxMesh, body: goal.body });
  }

  makeBarrier(0, 0.25, -1);
  makeBarrier(0, 0.25, 1);
  makeBarrier(-1, 0.25, 0);
  makeBarrier(1, 0.25, 0);

  makeGoal(0, 0.1, 0);

  //stuff other class can access
  return {
    physicsWorld,
    bodies,
    update(deltaTime: number) {
      physicsWorld.stepSimulation(deltaTime, 10);

      for (const obj of bodies) {
        const motionState = obj.body.getMotionState();
        if (motionState) {
          const transform = new AmmoLib.btTransform();
          motionState.getWorldTransform(transform);
          const origin = transform.getOrigin();
          const rotation = transform.getRotation();
          obj.mesh.position.set(origin.x(), origin.y(), origin.z());
          obj.mesh.quaternion.set(
            rotation.x(),
            rotation.y(),
            rotation.z(),
            rotation.w(),
          );
        }
      }
    },
  };
}
