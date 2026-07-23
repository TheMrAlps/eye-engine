import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class OpticNerve extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "#d9a39c");
        this.element.setAttribute("stroke", "#9a665f");
        this.element.setAttribute("stroke-width", "2");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        this.element.setAttribute("d", geometry.opticNerve.path);

    }

}
