import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Cornea extends Drawable{

    constructor(svg){

        super(svg,"path");

        this.set({

            fill:"none",

            stroke:Theme.colors.blue,

            "stroke-width":Theme.strokes.cornea,

            "stroke-linecap":"round"

        });

    }

    update(model){

        const x = model.eye.front;

        const y = model.center.y;

        const p = model.cornea.protrusion;

        const r = model.cornea.radius;

        this.set({

            d:`

M ${x} ${y}

C
${x+p} ${y-r}
${x+p} ${y+r}
${x} ${y}

`

        });

    }

}
