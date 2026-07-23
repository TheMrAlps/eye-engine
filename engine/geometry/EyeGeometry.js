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
        this.macula = {};
        this.opticNerve = {};
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

        const globeRadiusX = this.mmToPixels(globe.radiusX);
        const globeRadiusY = this.mmToPixels(globe.radiusY);

        this.sclera.path = [
            `M ${upperLimbus.x} ${upperLimbus.y}`,
            `A ${globeRadiusX} ${globeRadiusY} 0 1 1`,
            `${lowerLimbus.x} ${lowerLimbus.y}`,
            `L ${upperLimbus.x} ${upperLimbus.y}`,
            "Z"
        ].join(" ");

        this.sclera.outline = [
            `M ${upperLimbus.x} ${upperLimbus.y}`,
            `A ${globeRadiusX} ${globeRadiusY} 0 1 1`,
            `${lowerLimbus.x} ${lowerLimbus.y}`
        ].join(" ");

        this.iris = {

            left: this.projectX(
                anatomy.iris.plane -
                (anatomy.iris.thickness / 2)
            ),

            right: this.projectX(
                anatomy.iris.plane +
                (anatomy.iris.thickness / 2)
            ),

            upper: this.projectY(-anatomy.iris.radius),
            lower: this.projectY(anatomy.iris.radius),

            pupilUpper: this.projectY(-anatomy.pupil.radius),
            pupilLower: this.projectY(anatomy.pupil.radius),

            outerUpper: { ...this.cornea.posterior.upper },
            outerLower: { ...this.cornea.posterior.lower }

        };

        this.pupil = {

            cx: this.projectX(anatomy.iris.plane),
            cy: this.projectY(0),
            rx: this.mmToPixels(anatomy.iris.thickness),
            ry: this.mmToPixels(anatomy.pupil.radius)

        };

        const lens = anatomy.lens;
        const lensAnteriorVertex =
            cornea.thickness + anatomy.anteriorChamberDepth;
        const lensPosteriorVertex =
            lensAnteriorVertex + lens.thickness;
        const lensSemiDiameter = lens.equatorialRadius;
        const lensAnteriorEdge =
            lensAnteriorVertex + lens.anteriorRadius -
            Math.sqrt(
                (lens.anteriorRadius * lens.anteriorRadius) -
                (lensSemiDiameter * lensSemiDiameter)
            );
        const lensPosteriorEdge =
            lensPosteriorVertex - lens.posteriorRadius +
            Math.sqrt(
                (lens.posteriorRadius * lens.posteriorRadius) -
                (lensSemiDiameter * lensSemiDiameter)
            );

        this.lens = {

            outline: {

                cx: this.projectX(
                    (lensAnteriorVertex + lensPosteriorVertex) / 2
                ),
                cy: this.projectY(0),
                rx: this.mmToPixels(lens.thickness / 2),
                ry: this.mmToPixels(lensSemiDiameter)

            },

            anterior: {

                upper: {
                    x: this.projectX(lensAnteriorEdge),
                    y: this.projectY(-lensSemiDiameter)
                },
                lower: {
                    x: this.projectX(lensAnteriorEdge),
                    y: this.projectY(lensSemiDiameter)
                },
                controlX: this.projectX(
                    (2 * lensAnteriorVertex) - lensAnteriorEdge
                )

            },

            posterior: {

                upper: {
                    x: this.projectX(lensPosteriorEdge),
                    y: this.projectY(-lensSemiDiameter)
                },
                lower: {
                    x: this.projectX(lensPosteriorEdge),
                    y: this.projectY(lensSemiDiameter)
                },
                controlX: this.projectX(
                    (2 * lensPosteriorVertex) - lensPosteriorEdge
                )

            },

            centerY: this.projectY(0),

            equator: {

                controlX: this.projectX(
                    (lensAnteriorEdge + lensPosteriorEdge) / 2
                ),

                upperControlY: this.projectY(
                    -(lensSemiDiameter + 0.3)
                ),

                lowerControlY: this.projectY(
                    lensSemiDiameter + 0.3
                )

            }

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

        // In this axial section, the fovea/macula is centred on the
        // optical axis at the posterior retinal apex.
        this.macula = {
            x: this.retina.apex.x,
            y: this.retina.apex.y,
            radius: Math.max(2, this.mmToPixels(0.22))
        };

        const opticNerve = anatomy.opticNerve;
        const nerveStart = {
            x: outerBackX - this.mmToPixels(0.15),
            y: this.projectY(0.8)
        };
        const nerveEnd = {
            x: outerBackX + this.mmToPixels(opticNerve.length),
            y: this.projectY(
                0.8 + opticNerve.downwardAngle
            )
        };

        this.opticNerve = {

            start: nerveStart,
            end: nerveEnd,
            width: this.mmToPixels(opticNerve.radius * 2)

        };

        this.optical = new OpticalGeometry(this, model);

    }

}
