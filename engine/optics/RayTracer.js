import Ray from "./Ray.js";
import OpticalScene from "./OpticalScene.js";

export default class RayTracer {

    trace(model, geometry, opticalModel) {

        const scene = new OpticalScene();

        const centerY = model.center.y;

        const spacing = 20;

        const startX = 40;
        const endX = 220;

        for (let i = -3; i <= 3; i++) {

            const y = centerY + i * spacing;

            const ray = new Ray(
                { x: startX, y },
                { x: 1, y: 0 }
            );

            ray.addSegment(
                { x: startX, y },
                { x: endX, y }
            );

            scene.addRay(ray);

        }

        return scene;

    }

}