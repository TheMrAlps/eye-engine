export default class OpticalScene {

    constructor() {

        this.clear();

    }

    clear() {

        this.principalAxis = null;

        this.rays = [];

        this.focusPoint = null;

    }

    addRay(ray) {

        this.rays.push(ray);

    }

}