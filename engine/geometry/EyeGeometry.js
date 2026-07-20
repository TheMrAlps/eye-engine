/*
==========================================================

Eye Engine

EyeGeometry.js

Computes derived geometry from the anatomical model.
This class contains no rendering logic.

==========================================================
*/

export default class EyeGeometry {

    constructor() {

        this.reset();

    }

    reset() {

        this.opticalAxis = null;

        this.cornea = {};

        this.lens = {};

        this.retina = {};

    }

    update(model) {

        /*
        --------------------------------------------
        Optical Axis
        --------------------------------------------
        */

        this.opticalAxis = {

            x1: 0,
            y1: model.center.y,

            x2: 1000,
            y2: model.center.y

        };


        /*
        --------------------------------------------
        Cornea
        --------------------------------------------
        */

        this.cornea = {

            center: {

                x: model.sclera.x -
                   model.sclera.radiusX -
                   model.cornea.protrusion / 2,

                y: model.sclera.y

            },

            radius: model.cornea.radius

        };


        /*
        --------------------------------------------
        Lens
        --------------------------------------------
        */

        this.lens = {

            center: {

                x: model.lens.x,

                y: model.sclera.y

            },

            radiusX: model.lens.radiusX,

            radiusY: model.lens.radiusY

        };


        /*
        --------------------------------------------
        Retina
        --------------------------------------------
        */

        this.retina = {

            x:

                model.sclera.x +

                model.sclera.radiusX -

                model.retina.inset,

            y: model.sclera.y

        };

    }

}