import CorneaSurface from "./CorneaSurface.js";
import PosteriorCorneaSurface from "./PosteriorCorneaSurface.js";

export default class OpticalModel {

    constructor() {

        this.reset();

    }

    reset() {

        this.surfaces = [

            new CorneaSurface(),
            new PosteriorCorneaSurface()

        ];

    }

}