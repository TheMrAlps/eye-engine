import Ray from "./Ray.js";
import OpticalScene from "./OpticalScene.js";
import Snell from "./Snell.js";

export default class RayTracer {

    trace(model, geometry, opticalModel) {

        const scene = new OpticalScene();

        const centerY = geometry.opticalAxis.screen.y;

        const spacing = geometry.mmToPixels(1.5);
        const startX = geometry.projectX(-4);
        const endX = geometry.opticalAxis.screen.x2;

        for (let i = -3; i <= 3; i++) {

            const y = centerY + i * spacing;

            const ray = new Ray(
                { x: startX, y },
                { x: 1, y: 0 }
            );

            let currentDirection = ray.direction;
            let currentPoint = { x: startX, y };

            for (const surface of opticalModel.surfaces) {

                const hit = surface.intersect(
                    {
                        origin: currentPoint,
                        direction: currentDirection
                    },
                    geometry
                );

                if (!hit) {
                    break;
                }

                ray.addIntersection(surface, hit);

                ray.addSegment(
                    currentPoint,
                    hit
                );

                const normal = surface.normal(hit, geometry);

                const newDirection = Snell.refract(
                    currentDirection,
                    normal,
                    surface.nBefore,
                    surface.nAfter
                );

                if (!newDirection) {
                    break;
                }

                currentPoint = hit;
                currentDirection = newDirection;

            }

            ray.addSegment(
                currentPoint,
                {
                    x: endX,
                    y: currentPoint.y + currentDirection.y *
                        (endX - currentPoint.x) / currentDirection.x
                }
            );

            scene.addRay(ray);

        }

        scene.focusPoint = this.findFocus(scene.rays);

        if (scene.focusPoint) {

            scene.focusOffsetMillimeters =
                (scene.focusPoint.x - geometry.opticalAxis.screen.x2) /
                geometry.projection.pixelsPerMillimeter;

        }

        scene.retinalBlurMillimeters = this.measureRetinalBlur(
            scene.rays,
            geometry
        );

        return scene;

    }

    findFocus(rays) {

        let a11 = 0;
        let a12 = 0;
        let a22 = 0;
        let b1 = 0;
        let b2 = 0;

        for (const ray of rays) {

            const segment = ray.segments[ray.segments.length - 1];

            if (!segment) {
                continue;
            }

            const dx = segment.end.x - segment.start.x;
            const dy = segment.end.y - segment.start.y;
            const length = Math.hypot(dx, dy);

            if (length === 0) {
                continue;
            }

            const nx = -dy / length;
            const ny = dx / length;
            const projection =
                (nx * segment.start.x) +
                (ny * segment.start.y);

            a11 += nx * nx;
            a12 += nx * ny;
            a22 += ny * ny;
            b1 += nx * projection;
            b2 += ny * projection;

        }

        const determinant = (a11 * a22) - (a12 * a12);

        if (Math.abs(determinant) < 1e-9) {
            return null;
        }

        return {

            x: ((a22 * b1) - (a12 * b2)) / determinant,
            y: ((a11 * b2) - (a12 * b1)) / determinant

        };

    }

    measureRetinalBlur(rays, geometry) {

        const retinalHeights = rays.map(ray => {

            const segment = ray.segments[ray.segments.length - 1];

            return segment.end.y;

        });

        if (retinalHeights.length === 0) {
            return null;
        }

        const diameterPixels =
            Math.max(...retinalHeights) -
            Math.min(...retinalHeights);

        return diameterPixels / geometry.projection.pixelsPerMillimeter;

    }

}
