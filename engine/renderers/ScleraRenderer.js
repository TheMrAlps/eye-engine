import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Sclera extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "#f8f8f8");
        this.element.setAttribute("stroke", "none");

        svg.appendChild(this.element);

        this.outline = document.createElementNS(SVG_NS, "path");

        this.outline.setAttribute("fill", "none");
        this.outline.setAttribute("stroke", "#444");
        this.outline.setAttribute("stroke-width", "2");

        svg.appendChild(this.outline);

    }

   update(model, geometry) {

    this.element.setAttribute("d", geometry.sclera.path);

    this.outline.setAttribute("d", geometry.sclera.outline);

}

}
