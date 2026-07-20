import Surface from "./Surface.js";

export default class CorneaSurface extends Surface {

    constructor() {

        super({

            name: "Anterior Cornea",

            nBefore: 1.000,
            nAfter: 1.376

        });

    }

    intersect(ray, geometry) {

        const cx = geometry.cornea.cx;
        const cy = geometry.cornea.cy;
        const r = geometry.cornea.rx;

        const ox = ray.origin.x;
        const oy = ray.origin.y;

        const dx = ray.direction.x;
        const dy = ray.direction.y;

        // Solve:
        // (ox + dx*t - cx)^2 + (oy + dy*t - cy)^2 = r^2

        const a = dx * dx + dy * dy;

        const b = 2 * (
            dx * (ox - cx) +
            dy * (oy - cy)
        );

        const c =
            (ox - cx) * (ox - cx) +
            (oy - cy) * (oy - cy) -
            r * r;

        const discriminant = b * b - 4 * a * c;

        if (discriminant < 0) {
            return null;
        }

        const sqrt = Math.sqrt(discriminant);

        const t1 = (-b - sqrt) / (2 * a);
        const t2 = (-b + sqrt) / (2 * a);

        let t = null;

        if (t1 > 0 && t2 > 0) {
            t = Math.min(t1, t2);
        } else if (t1 > 0) {
            t = t1;
        } else if (t2 > 0) {
            t = t2;
        } else {
            return null;
        }

        return {
            x: ox + dx * t,
            y: oy + dy * t
        };

    }

    normal(point, geometry) {

        return {

            x: point.x - geometry.cornea.cx,
            y: point.y - geometry.cornea.cy

        };

    }

}