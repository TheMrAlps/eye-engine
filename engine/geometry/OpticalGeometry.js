export default class OpticalGeometry {

    constructor(geometry) {

        this.surfaces = [];

        this.buildCornea(geometry);

    }

    buildCornea(geometry) {

        const anterior = {

            id: "anterior-cornea",

            name: "Anterior Cornea",

            center: {

                x: geometry.cornea.cx,
                y: geometry.cornea.cy

            },

            radius: geometry.cornea.rx

        };

        const posterior = {

            id: "posterior-cornea",

            name: "Posterior Cornea",

            center: {

                x: geometry.cornea.cx + 6,
                y: geometry.cornea.cy

            },

            radius: geometry.cornea.rx - 4

        };

        this.surfaces.push(anterior);
        this.surfaces.push(posterior);

    }

}