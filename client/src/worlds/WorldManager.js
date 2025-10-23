import { createFractalCityWorld } from "./FractalCityWorld";
import { createOrbitalRingWorld } from "./OrbitalRingWorld";
import { createCraterWorld } from "./CraterWorld";
import { createLatticeWorld } from "./LatticeWorld";
import { createHyperloopWorld } from "./HyperloopWorld";
import { createCrystalCoreWorld } from "./CrystalCoreWorld";
import { createFractalCanyonWorld } from "./FractalCanyonWorld";
import { createObservatoryWorld } from "./ObservatoryWorld";
import { createSuspendedStageWorld } from "./SuspendedStageWorld";
import { createStageWorld } from "./StageWorld";
import { createGridWorld } from "./GridWorld";
import { createSphereWorld } from "./SphereWorld";
import { createSlantedWorld } from "./SlantedWorld";
import { createCubeWorld } from "./CubeWorld";
import { createCrystalWorld } from "./CrystalWorld";
import { createAlienWorld } from "./AlienWorld";
import { createCoreWorld } from "./CoreWorld";

export const worlds = {
  grid: createGridWorld,
  sphere: createSphereWorld,
  slanted: createSlantedWorld,
  cube: createCubeWorld,
  crystal: createCrystalWorld,
  alien: createAlienWorld,
  core: createCoreWorld,
  stage: createStageWorld,
  suspended: createSuspendedStageWorld,
  fractalcity: createFractalCityWorld,
  orbitalring: createOrbitalRingWorld,
  crater: createCraterWorld,
  lattice: createLatticeWorld,
  hyperloop: createHyperloopWorld,
  crystalcore: createCrystalCoreWorld,
  fractalcanyon: createFractalCanyonWorld,
  observatory: createObservatoryWorld,
};

export function createWorld(name="grid"){const fn=worlds[name];return fn?fn():worlds.grid();}
