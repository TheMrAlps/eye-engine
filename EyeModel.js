/* ==========================================================
   Eye Engine

   EyeModel.js

   Anatomical model describing the eye.
   This file contains measurements and proportions only.
   No SVG rendering belongs here.

========================================================== */

export default class EyeModel {

    constructor() {

        this.reset();

    }

    reset() {

        /*
        --------------------------------------------
        Overall Eye
        --------------------------------------------
        */

        this.center = {

            x: 430,
            y: 250

        };

        this.viewport = {

            width: 900,
            height: 500,
            padding: 50

        };

        /*
        --------------------------------------------
        Sclera
        --------------------------------------------
        */

        this.sclera = {

            x: 405,

            y: 250,

            radiusX: 315,

            radiusY: 130

        };

        /*
        --------------------------------------------
        Cornea
        --------------------------------------------
        */

        this.cornea = {

            // Rendering/Layout only

            protrusion: 28

        };

        /*
        --------------------------------------------
        Iris
        --------------------------------------------
        */

        this.iris = {

            x: 185,

            radiusX: 56,

            radiusY: 72

        };

        /*
        --------------------------------------------
        Pupil
        --------------------------------------------
        */

        this.pupil = {

            radiusX: 24,

            radiusY: 36

        };

        /*
        --------------------------------------------
        Lens
        --------------------------------------------
        */

        this.lens = {

            x: 305,

            radiusX: 38,

            radiusY: 66

        };

        /*
        --------------------------------------------
        Vitreous Chamber
        --------------------------------------------
        */

        this.vitreous = {

            inset: 60

        };

        /*
        --------------------------------------------
        Retina
        --------------------------------------------
        */

        this.retina = {

            inset: 18,

            thickness: 12

        };

        /*
        --------------------------------------------
        Optic Nerve
        --------------------------------------------
        */

        this.opticNerve = {

            length: 45,

            width: 24

        };

        /*
        --------------------------------------------
        Optical State
        --------------------------------------------
        */

        this.optics = {

            focusX: 720,

            blur: 0,

            debug: {

                showIntersections: false,
                showFocus: false

            }

        };

        this.annotations = {

            showLabels: false,
            showAxialLength: false

        };

        /*
        --------------------------------------------
        Physical Anatomy (mm)
        --------------------------------------------
        */

        this.anatomy = {

            axialLength: 23.5,

            globe: {

                centerX: 12.25,
                radiusX: 12.25,
                // The sagittal eye is slightly wider than it is tall.
                radiusY: 10.0,
                equatorialDiameter: 20.0

            },

            sclera: {

                thickness: 1.0

            },

            cornea: {

                anteriorRadius: 7.8,
                posteriorRadius: 6.5,
                thickness: 0.55,
                diameter: 11.8

            },

            anteriorChamberDepth: 3.0,

            lens: {

                thickness: 4.0,
                anteriorRadius: 11.85,
                posteriorRadius: 7.1,
                equatorialRadius: 4.5

            },

            vitreousLength: 15.95,

            iris: {

                plane: 3.2,
                radius: 5.5,
                thickness: 0.25

            },

            pupil: {

                radius: 2.0

            },

            retina: {

                thickness: 0.3,
                height: 10.0

            },

            opticNerve: {

                length: 3.5,
                radius: 0.65,
                downwardAngle: 0.9

            }

        };

    }

    setAxialLength(axialLength) {

        const anatomy = this.anatomy;

        const fixedAnteriorLength =
            anatomy.cornea.thickness +
            anatomy.anteriorChamberDepth +
            anatomy.lens.thickness;

        if (!Number.isFinite(axialLength) ||
            axialLength <= fixedAnteriorLength) {

            throw new RangeError(
                "Axial length must extend beyond the anterior segment."
            );

        }

        anatomy.axialLength = axialLength;
        anatomy.vitreousLength = axialLength - fixedAnteriorLength;

        const outerGlobeLength =
            axialLength + anatomy.sclera.thickness;

        anatomy.globe.centerX = outerGlobeLength / 2;
        anatomy.globe.radiusX = outerGlobeLength / 2;

    }

}
