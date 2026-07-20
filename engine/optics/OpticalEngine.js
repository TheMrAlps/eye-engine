import OpticalModel from "./OpticalModel.js";
import RayTracer from "./RayTracer.js";
import OpticalScene from "./OpticalScene.js";
import OpticsRenderer from "./OpticsRenderer.js";

export default class OpticalEngine {

    constructor() {

        this.model = new OpticalModel();
        this.scene = new OpticalScene();

        this.tracer = new RayTracer();
        this.renderer = new OpticsRenderer();

    }

    update(eyeModel, geometry) {

        // Future:
        // this.scene = this.tracer.trace(
        //     eyeModel,
        //     geometry,
        //     this.model
        // );

    }

}