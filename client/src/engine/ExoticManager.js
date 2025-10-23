export class ExoticManager {
  constructor(scene) {
    this.scene = scene;
    this.modules = new Map();
  }

  async loadModule(name, url) {
    try {
      const mod = await import(/* @vite-ignore */ url);
      if (mod.init) mod.init(this.scene, {});
      this.modules.set(name, mod);
      console.log(`[ExoticManager] Loaded: ${name}`);
    } catch (err) {
      console.error(`[ExoticManager] Failed to load module: ${name}`, err);
    }
  }

  update(dt) {
    for (const mod of this.modules.values()) {
      if (mod.update) mod.update(dt);
    }
  }

  dispose() {
    for (const mod of this.modules.values()) {
      if (mod.dispose) mod.dispose();
    }
    this.modules.clear();
  }
}
