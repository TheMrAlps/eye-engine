import Surface from "./Surface.js";

export default class AnteriorLensSurface extends Surface {

    constructor() {

        super({

            name: "Anterior Lens",

            nBefore: 1.336,
            nAfter: 1.406

        });

    }

    intersect(ray, geometry) {

        const surface = geometry.optical.surfaces[2];

        return this.intersectCircle(ray, surface);

    }

    normal(point, geometry) {

        const surface = geometry.optical.surfaces[2];

        return {

            x: point.x - surface.center.x,
            y: point.y - surface.center.y

        };

    }

    intersectCircle(ray, surface) {

        const ox = ray.origin.x;
        const oy = ray.origin.y;
        const dx = ray.direction.x;
        const dy = ray.direction.y;

        const a = dx * dx + dy * dy;
        const b = 2 * (
            dx * (ox - surface.center.x) +
            dy * (oy - surface.center.y)
        );
        const c =
            (ox - surface.center.x) * (ox - surface.center.x) +
            (oy - surface.center.y) * (oy - surface.center.y) -
            (surface.radius * surface.radius);

        const discriminant = b * b - (4 * a * c);

        if (discriminant < 0) {
            return null;
        }

        const root = Math.sqrt(discriminant);
        const t1 = (-b - root) / (2 * a);
        const t2 = (-b + root) / (2 * a);
        const t = [t1, t2].filter(value => value > 0).sort(
            (first, second) => first - second
        )[0];

        if (t === undefined) {
            return null;
        }

        return {

            x: ox + (dx * t),
            y: oy + (dy * t)

        };

    }

}
