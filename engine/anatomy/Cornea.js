import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Cornea extends Drawable {

    constructor() {

        super("path");

        this.set({

            fill: "none",

            stroke: Theme.colors.blue,

            "stroke-width": Theme.strokes.cornea

        });

    }

    update(model) {

        const x = model.sclera.front;

        const y = model.center.y;

        const r = model.cornea.radius;

        const p = model.cornea.protrusion;

        const d = `

            M ${x} ${y}

            C
            ${x+p} ${y-r}
            ${x+p} ${y+r}
            ${x} ${y}

        `;

        this.set({ d });

    }

}
