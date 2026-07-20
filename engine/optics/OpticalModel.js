import CorneaSurface from "./CorneaSurface.js";

export default class OpticalModel {

    constructor() {

        this.reset();

    }

    reset() {

        this.surfaces = [

            new CorneaSurface()

        ];

    }

}