import Drawable from "./Drawable.js";
import Theme from "../../config/Theme.js";

export default class Pupil extends Drawable {

    constructor(){

        super("ellipse");

        this.set({

            fill:Theme.colors.navy

        });

    }

    update(model){

        this.set({

            cx:model.anchors.iris,

            cy:model.center.y,

            rx:model.pupil.radiusX,

            ry:model.pupil.radiusY

        });

    }

}
