const SVG_NS = "http://www.w3.org/2000/svg";

export default class AxialLength {

    constructor(svg) {

        this.group = document.createElementNS(SVG_NS, "g");
        this.line = document.createElementNS(SVG_NS, "line");
        this.leftArrow = document.createElementNS(SVG_NS, "path");
        this.rightArrow = document.createElementNS(SVG_NS, "path");
        this.label = document.createElementNS(SVG_NS, "text");

        this.line.setAttribute("stroke", "#1f2933");
        this.line.setAttribute("stroke-width", "2");
        this.leftArrow.setAttribute("fill", "#1f2933");
        this.rightArrow.setAttribute("fill", "#1f2933");
        this.label.setAttribute("fill", "#1f2933");
        this.label.setAttribute("font-family", "Arial, sans-serif");
        this.label.setAttribute("font-size", "14");
        this.label.setAttribute("font-weight", "700");
        this.label.setAttribute("text-anchor", "middle");

        this.group.append(
            this.line,
            this.leftArrow,
            this.rightArrow,
            this.label
        );

        svg.appendChild(this.group);

    }

    update(model, geometry) {

        this.group.setAttribute(
            "display",
            model.annotations.showAxialLength ? "inline" : "none"
        );

        if (!model.annotations.showAxialLength) {
            return;
        }

        const x1 = geometry.opticalAxis.screen.x1;
        const x2 = geometry.retina.apex.x;
        const y = geometry.opticalAxis.screen.y + geometry.mmToPixels(7);
        const arrowSize = 8;

        this.line.setAttribute("x1", x1);
        this.line.setAttribute("y1", y);
        this.line.setAttribute("x2", x2);
        this.line.setAttribute("y2", y);

        this.leftArrow.setAttribute(
            "d",
            `M ${x1} ${y} L ${x1 + arrowSize} ${y - arrowSize / 2} ` +
            `L ${x1 + arrowSize} ${y + arrowSize / 2} Z`
        );

        this.rightArrow.setAttribute(
            "d",
            `M ${x2} ${y} L ${x2 - arrowSize} ${y - arrowSize / 2} ` +
            `L ${x2 - arrowSize} ${y + arrowSize / 2} Z`
        );

        this.label.setAttribute("x", (x1 + x2) / 2);
        this.label.setAttribute("y", y - 10);
        this.label.textContent =
            `Axial length: ${model.anatomy.axialLength.toFixed(2)} mm`;

    }

}
