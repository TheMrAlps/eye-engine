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

        const posteriorLimbusX =
            cornea.thickness +
            cornea.posteriorRadius -
            Math.sqrt(
                (cornea.posteriorRadius * cornea.posteriorRadius) -
                (cornealSemiDiameter * cornealSemiDiameter)
            );

        const limbus = {

            anteriorX: cornealSagitta,
            posteriorX: posteriorLimbusX,
            y: cornealSemiDiameter

        };

        this.cornea = {

            anterior: {

                radius: this.mmToPixels(cornea.anteriorRadius),
                upper: {
                    x: this.projectX(limbus.anteriorX),
                    y: this.projectY(-limbus.y)
                },
                lower: {
                    x: this.projectX(limbus.anteriorX),
                    y: this.projectY(limbus.y)
                }

            },

            posterior: {

                radius: this.mmToPixels(cornea.posteriorRadius),
                upper: {
                    x: this.projectX(limbus.posteriorX),
                    y: this.projectY(-limbus.y)
                },
                lower: {
                    x: this.projectX(limbus.posteriorX),
                    y: this.projectY(limbus.y)
                }

            }

        };

        const upperLimbus = {

            x: this.projectX(limbus.posteriorX),
            y: this.projectY(-limbus.y)

        };

        const lowerLimbus = {

            x: this.projectX(limbus.posteriorX),
            y: this.projectY(limbus.y)

        };

        const outerBackX = this.projectX(
            globe.centerX + globe.radiusX
        );

        const outerTopY = this.projectY(-globe.radiusY);
        const outerBottomY = this.projectY(globe.radiusY);

        this.sclera.path = [
            `M ${upperLimbus.x} ${upperLimbus.y}`,
            `C ${this.projectX(6)} ${outerTopY}`,
            `${this.projectX(20)} ${outerTopY}`,
            `${outerBackX} ${this.projectY(0)}`,
            `C ${this.projectX(20)} ${outerBottomY}`,
            `${this.projectX(6)} ${outerBottomY}`,
            `${lowerLimbus.x} ${lowerLimbus.y}`,
            `L ${upperLimbus.x} ${upperLimbus.y}`,
            "Z"
        ].join(" ");

        this.sclera.outline = [
            `M ${upperLimbus.x} ${upperLimbus.y}`,
            `C ${this.projectX(6)} ${outerTopY}`,
            `${this.projectX(20)} ${outerTopY}`,
            `${outerBackX} ${this.projectY(0)}`,
            `C ${this.projectX(20)} ${outerBottomY}`,
            `${this.projectX(6)} ${outerBottomY}`,
            `${lowerLimbus.x} ${lowerLimbus.y}`
        ].join(" ");

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

        const retinaHalfHeight = anatomy.retina.height / 2;
        const innerRadiusX =
            globe.radiusX - anatomy.sclera.thickness;
        const innerRadiusY =
            globe.radiusY - anatomy.sclera.thickness;

        const retinaEdgeX = globe.centerX +
            (innerRadiusX * Math.sqrt(
                1 -
                ((retinaHalfHeight * retinaHalfHeight) /
                (innerRadiusY * innerRadiusY))
            ));

        const retinaApexX = anatomy.axialLength;

        this.retina = {

            apex: {
                x: this.projectX(retinaApexX),
                y: this.projectY(0)
            },

            upper: {
                x: this.projectX(retinaEdgeX),
                y: this.projectY(-retinaHalfHeight)
            },

            lower: {
                x: this.projectX(retinaEdgeX),
                y: this.projectY(retinaHalfHeight)
            },

            controlX: this.projectX(
                (2 * retinaApexX) - retinaEdgeX
            ),

            thickness: this.mmToPixels(anatomy.retina.thickness)

        };

        this.optical = new OpticalGeometry(this, model);

    }

}
