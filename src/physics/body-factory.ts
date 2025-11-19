export function createBoxBody(
  AmmoLib: any,
  halfExtentsVec3: any,
  positionVec3: any,
  mass: number,
) {
  const shape = new AmmoLib.btBoxShape(halfExtentsVec3);
  const transform = new AmmoLib.btTransform();
  transform.setIdentity();
  transform.setOrigin(positionVec3);

  const localInertia = new AmmoLib.btVector3(0, 0, 0);
  if (mass > 0) shape.calculateLocalInertia(mass, localInertia);

  const motionState = new AmmoLib.btDefaultMotionState(transform);
  const rbInfo = new AmmoLib.btRigidBodyConstructionInfo(
    mass,
    motionState,
    shape,
    localInertia,
  );
  const body = new AmmoLib.btRigidBody(rbInfo);

  return { body, shape, motionState, rbInfo, transform };
}
