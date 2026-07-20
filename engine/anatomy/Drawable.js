import SVG from "../utils/SVG.js";

export default class Drawable {

    constructor(svg, tag){

        this.element = SVG.create(tag);

        svg.appendChild(this.element);

    }

    set(attributes){

        SVG.set(this.element, attributes);

    }

    update(model){}

}
