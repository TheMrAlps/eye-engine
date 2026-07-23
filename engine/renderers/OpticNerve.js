import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class OpticNerve extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "none");
        this.element.setAttribute("stroke", "#d9a39c");
        this.element.setAttribute("stroke-linecap", "round");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        const nerve = geometry.opticNerve;

        this.element.setAttribute(
            "d",
            `M ${nerve.start.x} ${nerve.start.y} ` +
            `L ${nerve.end.x} ${nerve.end.y}`
        );

        this.element.setAttribute("stroke-width", nerve.width);

    }

}
