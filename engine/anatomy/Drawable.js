/* ==========================================================
   Eye Engine

   Drawable.js

   Base class for every drawable SVG object.

========================================================== */

import SVG from "../utils/SVG.js";

export default class Drawable {

    constructor(tag = "g") {

        this.element = SVG.create(tag);

        this.visible = true;

    }

    /**
     * Returns the SVG element.
     */
    getElement() {

        return this.element;

    }

    /**
     * Append to an SVG parent.
     */
    appendTo(parent) {

        parent.appendChild(this.element);

    }

    /**
     * Update SVG attributes.
     */
    set(attributes = {}) {

        SVG.set(this.element, attributes);

    }

    /**
     * Show element.
     */
    show() {

        this.visible = true;

        this.element.style.display = "";

    }

    /**
     * Hide element.
     */
    hide() {

        this.visible = false;

        this.element.style.display = "none";

    }

    /**
     * Remove from DOM.
     */
    destroy() {

        this.element.remove();

    }

    /**
     * Override in subclasses.
     */
    draw(model) {}

    /**
     * Override in subclasses.
     */
    update(model) {}

}
