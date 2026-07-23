import Sclera from "./ScleraRenderer.js";
import Cornea from "./CorneaRenderer.js";
import Iris from "./IrisRenderer.js";
import Pupil from "./PupilRenderer.js";
import Lens from "./LensRenderer.js";
import Retina from "./RetinaRenderer.js";
import Macula from "./MaculaRenderer.js";
import OpticNerve from "./OpticNerve.js";

export default class Anatomy {

    constructor(svg) {

        this.parts = [

            new OpticNerve(svg),
            new Sclera(svg),
            new Retina(svg),
            new Macula(svg),
            new Cornea(svg),
            new Iris(svg),
            new Pupil(svg),
            new Lens(svg)

        ];

    }

  update(model, geometry) {

    for (const part of this.parts) {

        part.update(model, geometry);

    }

}

}
