const SVG_NS = "http://www.w3.org/2000/svg";

export default class OpticsRenderer {

    constructor(svg) {

        this.svg = svg;

        this.lines = [];
        this.points = [];
        this.showIntersections = false;
        this.showFocus = false;

    }

    update(scene) {

        // Remove previous frame

        for (const line of this.lines) {
            line.remove();
        }

        for (const point of this.points) {
            point.remove();
        }

        this.lines.length = 0;
        this.points.length = 0;

        // Draw rays

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

            // Draw intersection points

            if (!this.showIntersections) {
                continue;
            }

            for (const hit of ray.intersections) {

                const circle = document.createElementNS(SVG_NS, "circle");

                circle.setAttribute("cx", hit.point.x);
                circle.setAttribute("cy", hit.point.y);

                circle.setAttribute("r", "8");

                circle.setAttribute("fill", "lime");
circle.setAttribute("stroke", "black");
circle.setAttribute("stroke-width", "2");

                this.svg.appendChild(circle);

                this.points.push(circle);

            }

        }

        if (this.showFocus && scene.focusPoint) {

            const circle = document.createElementNS(SVG_NS, "circle");

            circle.setAttribute("cx", scene.focusPoint.x);
            circle.setAttribute("cy", scene.focusPoint.y);
            circle.setAttribute("r", "6");
            circle.setAttribute("fill", "#b44cff");
            circle.setAttribute("stroke", "#fff");
            circle.setAttribute("stroke-width", "2");

            this.svg.appendChild(circle);

            this.points.push(circle);

        }

    }

}
