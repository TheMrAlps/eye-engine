import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Retina extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "none");
        this.element.setAttribute("stroke", "#d45b62");
        this.element.setAttribute("stroke-linecap", "round");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        const retina = geometry.retina;

        this.element.setAttribute(
            "d",
            [
                `M ${retina.upper.x} ${retina.upper.y}`,
                `Q ${retina.controlX} ${retina.apex.y}`,
                `${retina.lower.x} ${retina.lower.y}`
            ].join(" ")
        );

        this.element.setAttribute(
            "stroke-width",
            Math.max(2, retina.thickness)
        );

    }

}
