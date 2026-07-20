/* ==========================================================
   Eye Engine

   Geometry.js

   Shared geometric helper functions used throughout
   the rendering engine.

========================================================== */

export default class Geometry {

    /**
     * Returns the distance between two points.
     */
    static distance(x1, y1, x2, y2) {

        return Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );

    }

    /**
     * Returns the midpoint of two points.
     */
    static midpoint(x1, y1, x2, y2) {

        return {

            x: (x1 + x2) / 2,

            y: (y1 + y2) / 2

        };

    }

    /**
     * Linearly interpolate between two values.
     */
    static lerp(start, end, amount) {

        return start + ((end - start) * amount);

    }

    /**
     * Clamp a value between a minimum and maximum.
     */
    static clamp(value, min, max) {

        return Math.max(
            min,
            Math.min(max, value)
        );

    }

    /**
     * Convert degrees to radians.
     */
    static radians(degrees) {

        return degrees * Math.PI / 180;

    }

    /**
     * Point on a circle.
     */
    static pointOnCircle(cx, cy, radius, angle) {

        const radians =
            this.radians(angle);

        return {

            x: cx + Math.cos(radians) * radius,

            y: cy + Math.sin(radians) * radius

        };

    }

}
