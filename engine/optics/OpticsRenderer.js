const SVG_NS = "http://www.w3.org/2000/svg";

export default class OpticsRenderer {

    constructor(svg) {

        this.svg = svg;
        this.lines = [];

    }

    update(scene) {

        // Remove previous rays
        for (const line of this.lines) {
            line.remove();
        }

        this.lines.length = 0;

        // Draw current rays
        for (const ray of scene.rays) {

            for (const segment of ray.segments) {

                const line = document.createElementNS(SVG_NS, "line");

                line.setAttribute("x1", segment.start.x);
                line.setAttribute("y1", segment.start.y);

                line.setAttribute("x2", segment.end.x);
                line.setAttribute("y2", segment.end.y);

                line.setAttribute("stroke", "#FFD54A");
                line.setAttribute("stroke-width", "2");
                line.setAttribute("stroke-linecap", "round");

                this.svg.appendChild(line);
                this.lines.push(line);

            }

        }

    }

}