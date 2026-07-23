import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class Iris extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "#4f86c6");

        svg.appendChild(this.element);

    }

    update(model, geometry) {

        const iris = geometry.iris;

        this.element.setAttribute(
            "d",
            [
                `M ${iris.left} ${iris.upper}`,
                `L ${iris.right} ${iris.upper}`,
                `L ${iris.right} ${iris.pupilUpper}`,
                `L ${iris.left} ${iris.pupilUpper}`,
                "Z",
                `M ${iris.left} ${iris.pupilLower}`,
                `L ${iris.right} ${iris.pupilLower}`,
                `L ${iris.right} ${iris.lower}`,
                `L ${iris.left} ${iris.lower}`,
                "Z"
            ].join(" ")
        );

    }

}
