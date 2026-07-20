import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Lens extends Drawable {

    constructor(){

        super("ellipse");

        this.set({

            fill:"#FFFFFF",

            "fill-opacity":0.9,

            stroke:Theme.colors.blue,

            "stroke-width":4

        });

    }

    update(model){

        this.set({

            cx:model.anchors.lens,

            cy:model.center.y,

            rx:model.lens.radiusX,

            ry:model.lens.radiusY

        });

    }

}
