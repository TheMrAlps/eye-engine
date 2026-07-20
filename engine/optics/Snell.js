export default class Snell {

    static refract(incident, normal, n1, n2) {

        // Normalize incident
        let ix = incident.x;
        let iy = incident.y;

        let il = Math.hypot(ix, iy);

        ix /= il;
        iy /= il;

        // Normalize normal
        let nx = normal.x;
        let ny = normal.y;

        let nl = Math.hypot(nx, ny);

        nx /= nl;
        ny /= nl;

        // Make sure the normal faces the incoming ray
        let cosI = ix * nx + iy * ny;

        if (cosI > 0) {

            nx = -nx;
            ny = -ny;

            cosI = ix * nx + iy * ny;

        }

        cosI = -cosI;

        const eta = n1 / n2;

        const k = 1 - eta * eta * (1 - cosI * cosI);

        if (k < 0) {

            return null;

        }

        return {

            x: eta * ix + (eta * cosI - Math.sqrt(k)) * nx,
            y: eta * iy + (eta * cosI - Math.sqrt(k)) * ny

        };

    }

}