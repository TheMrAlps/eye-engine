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
                    continue;
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

        return scene;

    }

}
