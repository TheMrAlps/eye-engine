const SVG_NS = "http://www.w3.org/2000/svg";

export default class Labels {

    constructor(svg) {

        this.svg = svg;
        this.group = document.createElementNS(SVG_NS, "g");
        this.group.setAttribute("fill", "#314457");
        this.group.setAttribute("font-family", "Arial, sans-serif");
        this.group.setAttribute("font-size", "13");
        this.group.setAttribute("font-weight", "700");

        svg.appendChild(this.group);

    }

    update(model, geometry) {

        this.group.replaceChildren();

        if (!model.annotations.showLabels) {
            return;
        }

        const irisX = (geometry.iris.left + geometry.iris.right) / 2;
        const pupilX = geometry.pupil.cx;
        const lensX = geometry.lens.outline.cx;

        const labels = [
            {
                text: "Cornea",
                x: geometry.projectX(0),
                y: geometry.projectY(-7.2)
            },
            {
                text: "Iris",
                x: irisX,
                y: geometry.projectY(-6.4)
            },
            {
                text: "Pupil",
                x: pupilX,
                y: geometry.projectY(3.4)
            },
            {
                text: "Lens",
                x: lensX,
                y: geometry.projectY(-5.8)
            },
            {
                text: "Retina",
                x: geometry.retina.apex.x,
                y: geometry.projectY(-6.8)
            }
        ];

        for (const label of labels) {

            const text = document.createElementNS(SVG_NS, "text");

            text.setAttribute("x", label.x);
            text.setAttribute("y", label.y);
            text.setAttribute("text-anchor", "middle");
            text.textContent = label.text;

            this.group.appendChild(text);

        }

        this.svg.appendChild(this.group);

    }

}
