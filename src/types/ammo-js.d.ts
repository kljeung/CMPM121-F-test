declare module "ammo.js" {
  // Ammo.js is provided as an async factory that returns the wasm/emscripten API.
  // Keep this as a lightweight `any` declaration to silence TS errors.
  function Ammo(): Promise<any>;
  export default Ammo;
}
