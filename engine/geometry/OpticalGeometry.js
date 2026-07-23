export default class OpticalGeometry {

    constructor(geometry, model) {

        this.surfaces = [];

        this.buildCornea(geometry, model);
        this.buildLens(geometry, model);

    }

    buildCornea(geometry, model) {

        const cornea = model.anatomy.cornea;

        const anterior = {

            id: "anterior-cornea",

            name: "Anterior Cornea",

            center: {

                x: geometry.projectX(cornea.anteriorRadius),
                y: geometry.projectY(0)

            },

            radius: geometry.mmToPixels(cornea.anteriorRadius)

        };

        const posterior = {

            id: "posterior-cornea",

            name: "Posterior Cornea",

            center: {

                x: geometry.projectX(
                    cornea.thickness + cornea.posteriorRadius
                ),
                y: geometry.projectY(0)

            },

            radius: geometry.mmToPixels(cornea.posteriorRadius)

        };

        this.surfaces.push(anterior);
        this.surfaces.push(posterior);

    }

    buildLens(geometry, model) {

        const anatomy = model.anatomy;
        const lens = anatomy.lens;

        const anteriorVertex =
            anatomy.cornea.thickness +
            anatomy.anteriorChamberDepth;

        const posteriorVertex =
            anteriorVertex + lens.thickness;

        const anterior = {

            id: "anterior-lens",

            name: "Anterior Lens",

            center: {

                x: geometry.projectX(
                    anteriorVertex + lens.anteriorRadius
                ),
                y: geometry.projectY(0)

            },

            radius: geometry.mmToPixels(lens.anteriorRadius)

        };

        const posterior = {

            id: "posterior-lens",

            name: "Posterior Lens",

            center: {

                x: geometry.projectX(
                    posteriorVertex - lens.posteriorRadius
                ),
                y: geometry.projectY(0)

            },

            radius: geometry.mmToPixels(lens.posteriorRadius)

        };

        this.surfaces.push(anterior);
        this.surfaces.push(posterior);

    }

}
