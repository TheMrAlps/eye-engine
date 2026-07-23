import EyeModel from "../EyeModel.js";
import EyeGeometry from "./geometry/EyeGeometry.js";
import AnatomyRenderer from "./renderers/AnatomyRenderer.js";
import OpticalEngine from "./optics/OpticalEngine.js";
import Labels from "./labels/Labels.js";

export default class Eye {

    constructor(svg) {

        this.svg = svg;

        // Core model
        this.model = new EyeModel();

        // Derived geometry
        this.geometry = new EyeGeometry();

        // Optical engine
       this.optics = new OpticalEngine(svg);

        // Anatomy renderer
        this.anatomy = new AnatomyRenderer(svg);
        this.labels = new Labels(svg);

    }

    update() {

        // 1. Update derived geometry
        this.geometry.update(this.model);

        // 2. Update optical engine
        this.optics.update(
            this.model,
            this.geometry
        );

        // 3. Render anatomy
        this.anatomy.update(
            this.model,
            this.geometry
        );

        this.labels.update(
            this.model,
            this.geometry
        );

    }

    reset() {

        this.model.reset();

        this.update();

    }

}
