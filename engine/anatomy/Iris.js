import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Iris extends Drawable {

    constructor(){

        super("ellipse");

        this.set({

            fill:"#7FB3D5",

            stroke:Theme.colors.navy,

            "stroke-width":4

        });

    }

    update(model){

        this.set({

            cx:model.anchors.iris,

            cy:model.center.y,

            rx:model.iris.radiusX,

            ry:model.iris.radiusY

        });

    }

}
