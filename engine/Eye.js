import EyeModel from "../EyeModel.js";
import EyeGeometry from "./geometry/EyeGeometry.js";
import Anatomy from "./renderers/AnatomyRenderer.js";

export default class Eye {

    constructor(svg) {

        this.svg = svg;

        this.model = new EyeModel();

        this.geometry = new EyeGeometry();

        this.anatomy = new Anatomy(svg);

    }

    update() {

        this.geometry.update(this.model);

        this.anatomy.update(this.model, this.geometry);

    }

    reset() {

        this.model.reset();

        this.update();

    }

}