export function createPhysicsWorld(AmmoLib: any) {
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

  return {
    physicsWorld,
    collisionConfiguration,
    dispatcher,
    broadphase,
    solver,
  };
}
