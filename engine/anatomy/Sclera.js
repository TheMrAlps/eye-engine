/* ==========================================================
   Eye Engine

   Sclera.js

   Draws the outer wall of the eye.

========================================================== */

import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Sclera extends Drawable {

    constructor() {

        super("path");

        this.set({

            fill: Theme.colors.white,

            stroke: Theme.colors.navy,

            "stroke-width": Theme.strokes.sclera

        });

    }

    update(model) {

        const front = model.sclera.front;
        const back = model.sclera.back;

        const top = model.sclera.top;
        const bottom = model.sclera.bottom;

        /*
        Build the scleral outline from the
        anatomical model.
        */

        const d = `

            M ${front} 250

            C
            120 ${top}
            300 90
            ${back} 250

            C
            300 410
            120 ${bottom}
            ${front} 250

            Z

        `;

        this.set({

            d

        });

    }

}
