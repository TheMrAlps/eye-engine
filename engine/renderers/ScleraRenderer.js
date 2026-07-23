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

   update(model, geometry) {

    this.element.setAttribute("cx", geometry.sclera.cx);

    this.element.setAttribute("cy", geometry.sclera.cy);

    this.element.setAttribute("rx", geometry.sclera.rx);

    this.element.setAttribute("ry", geometry.sclera.ry);

}

}
