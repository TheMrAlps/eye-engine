import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Pupil extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "#111");

        svg.appendChild(this.element);

    }

    update(model) {

        this.element.setAttribute("cx", model.iris.x);
        this.element.setAttribute("cy", model.center.y);

        this.element.setAttribute("rx", model.pupil.radiusX);
        this.element.setAttribute("ry", model.pupil.radiusY);

    }

}