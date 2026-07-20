class OpticalEngine {

    constructor(scene){

        this.scene = scene;

        this.model = new OpticalModel();

        this.tracer = new RayTracer();

        this.renderer = new OpticsRenderer(scene);

    }

    update(eyeModel, geometry){

        const opticalScene =
            this.tracer.trace(
                eyeModel,
                geometry,
                this.model
            );

        this.renderer.render(opticalScene);

    }

}