import Ray from "./Ray.js";
import OpticalScene from "./OpticalScene.js";
import CorneaSurface from "./CorneaSurface.js";

export default class RayTracer {

    constructor() {

        this.cornea = new CorneaSurface();

    }

    trace(model, geometry, opticalModel) {

        const scene = new OpticalScene();

        const centerY = model.center.y;

        const spacing = 20;

        const startX = 40;

        for (let i = -3; i <= 3; i++) {

            const y = centerY + i * spacing;

            const ray = new Ray(
                { x: startX, y },
                { x: 1, y: 0 }
            );

            const hit = this.cornea.intersect(ray, geometry);

            if (hit) {

                ray.addIntersection(
                    this.cornea,
                    hit
                );

                ray.addSegment(
                    { x: startX, y },
                    hit
                );

            } else {

                ray.addSegment(
                    { x: startX, y },
                    { x: 220, y }
                );

            }

            scene.addRay(ray);

        }

        return scene;

    }

}