//SCENE IS TEMPORARY-> ONLY USED TO SEE IF AMMO.JS IS WORKING

import * as THREE from "three";
export default async function initAmmo(scene: THREE.Scene) {
  // dynamically import ammo.js and support several export shapes:
  // - CommonJS where module.exports = AmmoFactory()
  // - ESM where default is the factory
  // - namespace where `Ammo` is already the initialized API
  const mod = (await import("ammo.js")) as any;

  let AmmoLib: any = null;

  if (typeof mod === "function") {
    const maybe = mod();
    AmmoLib = maybe && typeof maybe.then === "function" ? await maybe : maybe;
  } else if (mod && typeof mod.default === "function") {
    const maybe = mod.default();
    AmmoLib = maybe && typeof maybe.then === "function" ? await maybe : maybe;
  } else if (mod && typeof mod.Ammo === "function") {
    AmmoLib = mod.Ammo;
  } else if (mod && typeof mod.default === "object") {
    AmmoLib = mod.default;
  } else {
    // fallback: use the module as-is
    AmmoLib = mod;
  }

  if (!AmmoLib) throw new Error("Failed to load Ammo.js library");

  const collisionConfiguration = new AmmoLib.btDefaultCollisionConfiguration();
  const dispatcher = new AmmoLib.btCollisionDispatcher(collisionConfiguration);
  const broadphase = new AmmoLib.btDbvtBroadphase();
  const solver = new AmmoLib.btSequentialImpulseConstraintSolver();
  const physicsWorld = new AmmoLib.btDiscreteDynamicsWorld(
    dispatcher,
    broadphase,
    solver,
    collisionConfiguration,
  );
  physicsWorld.setGravity(new AmmoLib.btVector3(0, -9.8, 0));

  // Ground (three.js)
  const groundSize = 50;
  const groundGeometry = new THREE.BoxGeometry(groundSize, 1, groundSize);
  const groundMat = new THREE.MeshBasicMaterial({ color: 0x888888 });
  const groundMesh = new THREE.Mesh(groundGeometry, groundMat);
  groundMesh.position.set(0, -0.5, 0);
  groundMesh.receiveShadow = true;
  scene.add(groundMesh);

  // Ground (Ammo)
  const groundShape = new AmmoLib.btBoxShape(
    new AmmoLib.btVector3(groundSize / 2, 0.5, groundSize / 2),
  );
  const groundTransform = new AmmoLib.btTransform();
  groundTransform.setIdentity();
  groundTransform.setOrigin(new AmmoLib.btVector3(0, -0.5, 0));
  const groundMass = 0;
  const groundLocalInertia = new AmmoLib.btVector3(0, 0, 0);
  const groundMotionState = new AmmoLib.btDefaultMotionState(groundTransform);
  const groundRbInfo = new AmmoLib.btRigidBodyConstructionInfo(
    groundMass,
    groundMotionState,
    groundShape,
    groundLocalInertia,
  );
  const groundBody = new AmmoLib.btRigidBody(groundRbInfo);
  physicsWorld.addRigidBody(groundBody);

  // Dynamic box (three.js)
  const boxSize = 1;
  const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
  const boxMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const boxMesh = new THREE.Mesh(boxGeometry, boxMat);
  // spawn closer so it's visible with the default camera position
  boxMesh.position.set(0, 2, 0);
  boxMesh.castShadow = true;
  scene.add(boxMesh);

  // Dynamic box (Ammo)
  const boxShape = new AmmoLib.btBoxShape(
    new AmmoLib.btVector3(boxSize / 2, boxSize / 2, boxSize / 2),
  );
  const boxTransform = new AmmoLib.btTransform();
  boxTransform.setIdentity();
  boxTransform.setOrigin(new AmmoLib.btVector3(0, 2, 0));
  const boxMass = 1;
  const boxLocalInertia = new AmmoLib.btVector3(0, 0, 0);
  boxShape.calculateLocalInertia(boxMass, boxLocalInertia);
  const boxMotionState = new AmmoLib.btDefaultMotionState(boxTransform);
  const boxRbInfo = new AmmoLib.btRigidBodyConstructionInfo(
    boxMass,
    boxMotionState,
    boxShape,
    boxLocalInertia,
  );
  const boxBody = new AmmoLib.btRigidBody(boxRbInfo);
  physicsWorld.addRigidBody(boxBody);

  // Return an updater to be called each frame
  const bodies = [{ mesh: boxMesh, body: boxBody }];

  return {
    physicsWorld,
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
