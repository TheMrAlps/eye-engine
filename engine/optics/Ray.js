export default class Ray {

    constructor(origin, direction) {

        this.origin = { ...origin };
        this.direction = { ...direction };

        // Every straight portion of the ray
        this.segments = [];

    }

    addSegment(start, end) {

        this.segments.push({
            start: { ...start },
            end: { ...end }
        });

    }

}