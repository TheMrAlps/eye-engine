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

    update(model, geometry) {

        this.element.setAttribute("cx", geometry.cornea.cx);
        this.element.setAttribute("cy", geometry.cornea.cy);

        this.element.setAttribute("rx", geometry.cornea.rx);
        this.element.setAttribute("ry", geometry.cornea.ry);

    }

}