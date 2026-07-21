import Surface from "./Surface.js";

export default class PosteriorCorneaSurface extends Surface {

    constructor() {

        super({

            name: "Posterior Cornea",

            nBefore: 1.376,
            nAfter: 1.336

        });

    }

    intersect(ray, geometry) {

        const surface = geometry.optical.surfaces[1];

        const cx = surface.center.x;
        const cy = surface.center.y;
        const r = surface.radius;

        const ox = ray.origin.x;
        const oy = ray.origin.y;

        const dx = ray.direction.x;
        const dy = ray.direction.y;

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

        const surface = geometry.optical.surfaces[1];

        return {

            x: point.x - surface.center.x,
            y: point.y - surface.center.y

        };

    }

}