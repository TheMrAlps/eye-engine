import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Cornea extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "rgba(170,220,255,.25)");
        this.element.setAttribute("stroke", "#3c8fd8");
        this.element.setAttribute("stroke-width", "2");

        svg.appendChild(this.element);

    }

   update(model) {

    this.element.setAttribute(
        "cx",
        model.sclera.x - model.sclera.radiusX - model.cornea.protrusion / 2
    );

    this.element.setAttribute(
        "cy",
        model.sclera.y
    );

    this.element.setAttribute(
        "rx",
        model.cornea.radius
    );

    this.element.setAttribute(
        "ry",
        model.cornea.radius
    );

}

}