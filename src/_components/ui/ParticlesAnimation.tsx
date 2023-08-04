import { hooks, renderToString } from "lume/deps/preact.ts";
import { loadFull } from "npm:tsparticles";
import options from "./particles.options.json" assert { type: "json" };
import Particles from "npm:preact-particles";
import type { Container, Engine } from "npm:tsparticles-engine";

export default () => {
  const particlesInit = hooks.useCallback(async (engine: Engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = hooks.useCallback(async (container: Container) => {
    await console.log(container);
  }, []);

  const fragment = (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
      />
    </>
  );

  // return renderToString(fragment);
  return fragment;
};
