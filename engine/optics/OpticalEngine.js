import OpticalModel from "./OpticalModel.js";
import RayTracer from "./RayTracer.js";
import OpticalScene from "./OpticalScene.js";
import OpticsRenderer from "./OpticsRenderer.js";

export default class OpticalEngine {

    constructor(svg) {

        this.model = new OpticalModel();
        this.scene = new OpticalScene();

        this.tracer = new RayTracer();
        this.renderer = new OpticsRenderer(svg);

    }

    update(model, geometry) {

        this.scene = this.tracer.trace(
            model,
            geometry,
            this.model
        );

        this.renderer.update(this.scene);

    }

}