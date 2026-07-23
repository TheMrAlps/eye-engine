export default class OpticalGeometry {

    constructor(geometry, model) {

        this.surfaces = [];

        this.buildCornea(geometry, model);

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
                    cornea.thickness - cornea.posteriorRadius
                ),
                y: geometry.projectY(0)

            },

            radius: geometry.mmToPixels(cornea.posteriorRadius)

        };

        this.surfaces.push(anterior);
        this.surfaces.push(posterior);

    }

}
