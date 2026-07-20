/* ==========================================================
   Eye Engine

   Anatomy.js

========================================================== */

import Sclera from "./Sclera.js";
import Cornea from "./Cornea.js";
import Iris from "./Iris.js";
import Pupil from "./Pupil.js";
import Lens from "./Lens.js";

export default class Anatomy {

    constructor(svg) {

        this.parts = [

            new Sclera(),
            new Cornea(),
            new Iris(),
            new Pupil(),
            new Lens()

        ];

        this.parts.forEach(

            part => part.appendTo(svg)

        );

    }

    update(model) {

        this.parts.forEach(

            part => part.update(model)

        );

    }

}
