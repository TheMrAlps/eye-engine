export default class Ray {

    constructor(origin, direction) {

        this.origin = { ...origin };
        this.direction = { ...direction };

        // Every straight portion of the ray
        this.segments = [];

        // Ordered list of optical intersections
        this.intersections = [];

    }

    addSegment(start, end) {

        this.segments.push({
            start: { ...start },
            end: { ...end }
        });

    }

    addIntersection(surface, point) {

        this.intersections.push({

            surface,

            point: {
                x: point.x,
                y: point.y
            }

        });

    }

}