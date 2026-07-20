export default class Drawable {

    constructor(svg) {

        this.svg = svg;
        this.element = null;

    }

    update(model) {
        // Override in subclasses
    }

}