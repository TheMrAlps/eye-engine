import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Macula extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "circle");
        this.element.setAttribute("fill", "#9d3943");
        this.element.setAttribute("stroke", "#ffffff");
        this.element.setAttribute("stroke-width", "1.5");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        const macula = geometry.macula;

        this.element.setAttribute("cx", macula.x);
        this.element.setAttribute("cy", macula.y);
        this.element.setAttribute("r", macula.radius);

    }

}
