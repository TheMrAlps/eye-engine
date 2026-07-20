// engine/utils/SVG.js

const SVG_NS = "http://www.w3.org/2000/svg";

export default class SVG {

    static create(tag, attributes = {}) {

        const element =
            document.createElementNS(SVG_NS, tag);

        Object.entries(attributes).forEach(
            ([key, value]) => {
                element.setAttribute(key, value);
            }
        );

        return element;

    }

    static set(element, attributes = {}) {

        Object.entries(attributes).forEach(
            ([key, value]) => {
                element.setAttribute(key, value);
            }
        );

    }

}
