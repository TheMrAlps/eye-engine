import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Sclera extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "#f8f8f8");
        this.element.setAttribute("stroke", "#444");
        this.element.setAttribute("stroke-width", "2");

        svg.appendChild(this.element);

    }

   update(model) {

    this.element.setAttribute("cx", model.sclera.x);

    this.element.setAttribute("cy", model.sclera.y);

    this.element.setAttribute("rx", model.sclera.radiusX);

    this.element.setAttribute("ry", model.sclera.radiusY);

}

}