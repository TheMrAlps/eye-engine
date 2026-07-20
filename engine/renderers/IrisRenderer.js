import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Iris extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "#4f86c6");

        svg.appendChild(this.element);

    }

    update(model) {

        this.element.setAttribute("cx", model.iris.x);
        this.element.setAttribute("cy", model.center.y);

        this.element.setAttribute("rx", model.iris.radiusX);
        this.element.setAttribute("ry", model.iris.radiusY);

    }

}