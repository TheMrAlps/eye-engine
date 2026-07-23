import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Cornea extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "rgba(170,220,255,.25)");
        this.element.setAttribute("stroke", "#3c8fd8");
        this.element.setAttribute("stroke-width", "2");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        const anterior = geometry.cornea.anterior;
        const posterior = geometry.cornea.posterior;

        this.element.setAttribute(
            "d",
            [
                `M ${anterior.upper.x} ${anterior.upper.y}`,
                `A ${anterior.radius} ${anterior.radius} 0 0 0`,
                `${anterior.lower.x} ${anterior.lower.y}`,
                `L ${posterior.lower.x} ${posterior.lower.y}`,
                `A ${posterior.radius} ${posterior.radius} 0 0 1`,
                `${posterior.upper.x} ${posterior.upper.y}`,
                "Z"
            ].join(" ")
        );

    }

}
