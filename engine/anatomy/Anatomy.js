import Sclera from "./Sclera.js";
import Cornea from "./Cornea.js";
import Iris from "./Iris.js";
import Pupil from "./Pupil.js";
import Lens from "./Lens.js";

export default class Anatomy {

    constructor(svg){

        this.parts = [

            new Sclera(svg),
            new Cornea(svg),
            new Iris(svg),
            new Pupil(svg),
            new Lens(svg)

        ];

    }

    update(model){

        this.parts.forEach(

            part => part.update(model)

        );

    }

}
