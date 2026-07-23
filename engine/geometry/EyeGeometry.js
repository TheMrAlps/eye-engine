import OpticalGeometry from "./OpticalGeometry.js";

export default class EyeGeometry {

    constructor() {

        this.reset();

    }

    reset() {

        this.projection = null;
        this.opticalAxis = null;
        this.sclera = {};
        this.cornea = {};
        this.iris = {};
        this.pupil = {};
        this.lens = {};
        this.retina = {};
        this.optical = null;

    }

    mmToPixels(mm) {

        return mm * this.projection.pixelsPerMillimeter;

    }

    projectX(x) {

        return this.projection.originX + this.mmToPixels(x);

    }

    projectY(y) {

        return this.projection.originY + this.mmToPixels(y);

    }

    update(model) {

        const anatomy = model.anatomy;
        const globe = anatomy.globe;

        const drawableWidth = model.viewport.width -
            (model.viewport.padding * 2);

        const drawableHeight = model.viewport.height -
            (model.viewport.padding * 2);

        const pixelsPerMillimeter = Math.min(
            drawableWidth / anatomy.axialLength,
            drawableHeight / globe.equatorialDiameter
        );

        this.projection = {

            pixelsPerMillimeter,
            originX: (
                model.viewport.width -
                (anatomy.axialLength * pixelsPerMillimeter)
            ) / 2,
            originY: model.viewport.height / 2

        };

        this.opticalAxis = {

            physical: { x1: 0, x2: anatomy.axialLength, y: 0 },

            screen: {
                x1: this.projectX(0),
                x2: this.projectX(anatomy.axialLength),
                y: this.projectY(0)
            }

        };

        this.sclera = {

            cx: this.projectX(globe.centerX),
            cy: this.projectY(0),
            rx: this.mmToPixels(globe.radiusX),
            ry: this.mmToPixels(globe.radiusY)

        };

        const cornea = anatomy.cornea;
        const cornealSemiDiameter = cornea.diameter / 2;
        const cornealSagitta = cornea.anteriorRadius - Math.sqrt(
            (cornea.anteriorRadius * cornea.anteriorRadius) -
            (cornealSemiDiameter * cornealSemiDiameter)
        );

        this.cornea = {

            cx: this.projectX(cornealSagitta / 2),
            cy: this.projectY(0),
            rx: this.mmToPixels(cornealSagitta / 2),
            ry: this.mmToPixels(cornealSemiDiameter)

        };

        this.iris = {

            cx: this.projectX(anatomy.iris.plane),
            cy: this.projectY(0),
            rx: this.mmToPixels(anatomy.iris.thickness / 2),
            ry: this.mmToPixels(anatomy.iris.radius)

        };

        this.pupil = {

            cx: this.projectX(anatomy.iris.plane),
            cy: this.projectY(0),
            rx: this.mmToPixels(anatomy.iris.thickness),
            ry: this.mmToPixels(anatomy.pupil.radius)

        };

        this.lens = {

            cx: this.projectX(
                cornea.thickness +
                anatomy.anteriorChamberDepth +
                (anatomy.lens.thickness / 2)
            ),
            cy: this.projectY(0),
            rx: this.mmToPixels(anatomy.lens.thickness / 2),
            ry: this.mmToPixels(anatomy.lens.equatorialRadius)

        };

        this.retina = {

            x: this.projectX(anatomy.axialLength),
            y: this.projectY(0),
            thickness: this.mmToPixels(anatomy.retina.thickness)

        };

        this.optical = new OpticalGeometry(this, model);

    }

}
