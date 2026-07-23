import CorneaSurface from "./CorneaSurface.js";
import PosteriorCorneaSurface from "./PosteriorCorneaSurface.js";
import AnteriorLensSurface from "./AnteriorLensSurface.js";
import PosteriorLensSurface from "./PosteriorLensSurface.js";

export default class OpticalModel {

    constructor() {

        this.reset();

    }

    reset() {

        this.surfaces = [

            new CorneaSurface(),
            new PosteriorCorneaSurface(),
            new AnteriorLensSurface(),
            new PosteriorLensSurface()

        ];

    }

}
