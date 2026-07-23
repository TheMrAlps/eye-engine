import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Iris extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "#4f86c6");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        this.element.setAttribute("cx", geometry.iris.cx);
        this.element.setAttribute("cy", geometry.iris.cy);

        this.element.setAttribute("rx", geometry.iris.rx);
        this.element.setAttribute("ry", geometry.iris.ry);

    }

}
