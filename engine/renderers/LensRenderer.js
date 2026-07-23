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

    update(model, geometry) {

        this.element.setAttribute("cx", geometry.lens.cx);
        this.element.setAttribute("cy", geometry.lens.cy);

        this.element.setAttribute("rx", geometry.lens.rx);
        this.element.setAttribute("ry", geometry.lens.ry);

    }

}
