/*
==========================================================

Eye Engine

EyeGeometry.js

Computes derived geometry from the anatomical model.
This class contains no rendering logic.

==========================================================
*/

import OpticalGeometry from "./OpticalGeometry.js";

export default class EyeGeometry {

    constructor() {

        this.reset();

    }

    reset() {

        this.opticalAxis = null;

        this.sclera = {};
        this.cornea = {};
        this.iris = {};
        this.pupil = {};
        this.lens = {};
        this.retina = {};
        this.vitreous = {};
        this.opticNerve = {};

        this.optical = null;

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
        Sclera
        --------------------------------------------
        */

        this.sclera = {

            cx: model.sclera.x,
            cy: model.sclera.y,

            rx: model.sclera.radiusX,
            ry: model.sclera.radiusY

        };



        /*
        --------------------------------------------
        Cornea
        --------------------------------------------
        */

        this.cornea = {

            cx:
                model.sclera.x -
                model.sclera.radiusX -
                (model.cornea.protrusion / 2),

            cy: model.sclera.y,

            rx: model.cornea.radius,
            ry: model.cornea.radius

        };



        /*
        --------------------------------------------
        Iris
        --------------------------------------------
        */

        this.iris = {

            cx: model.iris.x,
            cy: model.center.y,

            rx: model.iris.radiusX,
            ry: model.iris.radiusY

        };



        /*
        --------------------------------------------
        Pupil
        --------------------------------------------
        */

        this.pupil = {

            cx: model.iris.x,
            cy: model.center.y,

            rx: model.pupil.radiusX,
            ry: model.pupil.radiusY

        };



        /*
        --------------------------------------------
        Lens
        --------------------------------------------
        */

        this.lens = {

            cx: model.lens.x,
            cy: model.center.y,

            rx: model.lens.radiusX,
            ry: model.lens.radiusY

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

            y: model.center.y,

            inset: model.retina.inset,
            thickness: model.retina.thickness

        };



        /*
        --------------------------------------------
        Vitreous
        --------------------------------------------
        */

        this.vitreous = {

            inset: model.vitreous.inset

        };



        /*
        --------------------------------------------
        Optic Nerve
        --------------------------------------------
        */

        this.opticNerve = {

            x:
                model.sclera.x +
                model.sclera.radiusX,

            y: model.center.y,

            length: model.opticNerve.length,
            width: model.opticNerve.width

        };



        /*
        --------------------------------------------
        Optical Geometry
        --------------------------------------------
        */

        this.optical = new OpticalGeometry(this);

    }

}