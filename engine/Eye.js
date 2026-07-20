import EyeModel from "./EyeModel.js";
import Anatomy from "./anatomy/Anatomy.js";

export default class Eye {

    constructor(svg){

        this.svg = svg;

        this.model = new EyeModel();

        this.anatomy = new Anatomy(svg);

    }

    draw(){

        this.anatomy.update(this.model);

    }

    update(){

        this.draw();

    }

    reset(){

        this.model.reset();

        this.draw();

    }

}
