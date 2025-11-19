export default async function loadAmmo(): Promise<any> {
  // dynamic import so bundlers can handle the package appropriately
  const mod = await import("ammo.js");
  const factory = (mod as any).default ?? mod;

  // If the module is a factory function, call it. It may return a Promise (wasm build)
  if (typeof factory === "function") {
    const maybe = factory();
    return maybe && typeof (maybe as any).then === "function"
      ? await maybe
      : maybe;
  }

  // Otherwise return the imported module object
  return factory;
}
