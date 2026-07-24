import Drawable from "./Drawable.js";

const SVG_NS = "http://www.w3.org/2000/svg";

export default class OpticNerve extends Drawable {

    constructor(svg) {

        super(svg);

        this.element = document.createElementNS(SVG_NS, "path");

        this.element.setAttribute("fill", "#d9a39c");
        this.element.setAttribute("stroke", "#a76f69");
        this.element.setAttribute("stroke-width", "1.5");
        this.element.setAttribute("stroke-linejoin", "round");

        this.detail = document.createElementNS(SVG_NS, "path");
        this.detail.setAttribute("fill", "none");
        this.detail.setAttribute("stroke", "#f0c0b8");
        this.detail.setAttribute("stroke-width", "1.25");
        this.detail.setAttribute("stroke-linecap", "round");

        svg.appendChild(this.element);
        svg.appendChild(this.detail);

    }

    update(model, geometry) {

        const nerve = geometry.opticNerve;
        const dx = nerve.end.x - nerve.start.x;
        const dy = nerve.end.y - nerve.start.y;
        const length = Math.hypot(dx, dy);
        const normalX = -dy / length;
        const normalY = dx / length;
        const rootHalfWidth = nerve.rootWidth / 2;
        const endHalfWidth = nerve.endWidth / 2;

        const rootUpper = {
            x: nerve.start.x + (normalX * rootHalfWidth),
            y: nerve.start.y + (normalY * rootHalfWidth)
        };
        const rootLower = {
            x: nerve.start.x - (normalX * rootHalfWidth),
            y: nerve.start.y - (normalY * rootHalfWidth)
        };
        const endUpper = {
            x: nerve.end.x + (normalX * endHalfWidth),
            y: nerve.end.y + (normalY * endHalfWidth)
        };
        const endLower = {
            x: nerve.end.x - (normalX * endHalfWidth),
            y: nerve.end.y - (normalY * endHalfWidth)
        };

        this.element.setAttribute(
            "d",
            [
                `M ${rootUpper.x} ${rootUpper.y}`,
                `C ${nerve.start.x + (dx * 0.35) + (normalX * rootHalfWidth)} ` +
                    `${nerve.start.y + (dy * 0.35) + (normalY * rootHalfWidth)} ` +
                    `${nerve.end.x - (dx * 0.22) + (normalX * endHalfWidth)} ` +
                    `${nerve.end.y - (dy * 0.22) + (normalY * endHalfWidth)} ` +
                    `${endUpper.x} ${endUpper.y}`,
                `L ${endLower.x} ${endLower.y}`,
                `C ${nerve.end.x - (dx * 0.22) - (normalX * endHalfWidth)} ` +
                    `${nerve.end.y - (dy * 0.22) - (normalY * endHalfWidth)} ` +
                    `${nerve.start.x + (dx * 0.35) - (normalX * rootHalfWidth)} ` +
                    `${nerve.start.y + (dy * 0.35) - (normalY * rootHalfWidth)} ` +
                    `${rootLower.x} ${rootLower.y}`,
                "Z"
            ].join(" ")
        );

        const upperStart = {
            x: nerve.start.x + (dx * 0.15) + (normalX * rootHalfWidth * 0.35),
            y: nerve.start.y + (dy * 0.15) + (normalY * rootHalfWidth * 0.35)
        };
        const upperEnd = {
            x: nerve.end.x - (dx * 0.15) + (normalX * endHalfWidth * 0.35),
            y: nerve.end.y - (dy * 0.15) + (normalY * endHalfWidth * 0.35)
        };
        const lowerStart = {
            x: nerve.start.x + (dx * 0.17) - (normalX * rootHalfWidth * 0.3),
            y: nerve.start.y + (dy * 0.17) - (normalY * rootHalfWidth * 0.3)
        };
        const lowerEnd = {
            x: nerve.end.x - (dx * 0.18) - (normalX * endHalfWidth * 0.28),
            y: nerve.end.y - (dy * 0.18) - (normalY * endHalfWidth * 0.28)
        };

        this.detail.setAttribute(
            "d",
            [
                `M ${upperStart.x} ${upperStart.y}`,
                `Q ${nerve.start.x + (dx * 0.52) + (normalX * endHalfWidth * 0.48)} ` +
                    `${nerve.start.y + (dy * 0.52) + (normalY * endHalfWidth * 0.48)} ` +
                    `${upperEnd.x} ${upperEnd.y}`,
                `M ${lowerStart.x} ${lowerStart.y}`,
                `Q ${nerve.start.x + (dx * 0.55) - (normalX * endHalfWidth * 0.38)} ` +
                    `${nerve.start.y + (dy * 0.55) - (normalY * endHalfWidth * 0.38)} ` +
                    `${lowerEnd.x} ${lowerEnd.y}`
            ].join(" ")
        );

    }

}
