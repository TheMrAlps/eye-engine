export default class Surface {

    constructor({

        name,
        nBefore = 1.0,
        nAfter = 1.0

    }) {

        this.name = name;

        this.nBefore = nBefore;
        this.nAfter = nAfter;

    }

    intersect(ray, geometry) {

        return null;

    }

    normal(point, geometry) {

        return null;

    }

}