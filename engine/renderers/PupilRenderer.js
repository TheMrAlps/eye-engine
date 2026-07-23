import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Pupil extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "ellipse");

        this.element.setAttribute("fill", "#111");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        this.element.setAttribute("cx", geometry.pupil.cx);
        this.element.setAttribute("cy", geometry.pupil.cy);

        this.element.setAttribute("rx", geometry.pupil.rx);
        this.element.setAttribute("ry", geometry.pupil.ry);

    }

}
