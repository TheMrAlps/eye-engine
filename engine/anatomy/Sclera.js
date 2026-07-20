import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Sclera extends Drawable {

    constructor(svg){

        super(svg,"path");

        this.set({

            fill:Theme.colors.white,

            stroke:Theme.colors.navy,

            "stroke-width":Theme.strokes.sclera

        });

    }

    update(model){

        const front = model.eye.front;
        const back = model.eye.back;

        const top = model.eye.top;
        const bottom = model.eye.bottom;

        this.set({

            d:`

M ${front} 250

C
150 ${top}
330 110
${back} 250

C
330 390
150 ${bottom}
${front} 250

Z

`

        });

    }

}
