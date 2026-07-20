import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Lens extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "rgba(220,220,255,.45)");
        this.element.setAttribute("stroke", "#666");

        svg.appendChild(this.element);

    }

    update(model) {

        this.element.setAttribute("cx", model.lens.x);
        this.element.setAttribute("cy", model.center.y);

        this.element.setAttribute("rx", model.lens.radiusX);
        this.element.setAttribute("ry", model.lens.radiusY);

    }

}