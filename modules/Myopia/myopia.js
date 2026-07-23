import Eye from "../../engine/Eye.js";

const svg = document.getElementById("eye");
const slider = document.getElementById("axial-length");
const axialLengthValue = document.getElementById("axial-length-value");
const focusStatus = document.getElementById("focus-status");
const blurValue = document.getElementById("blur-value");
const optotype = document.getElementById("optotype");
const snapFocus = document.getElementById("snap-focus");

const eye = new Eye(svg);

eye.model.annotations.showLabels = true;

eye.update();

const baselineBlur = eye.optics.scene.retinalBlurMillimeters;

function focusLabel(offset) {

    if (Math.abs(offset) < 0.1) {
        return "Focus is on the retina.";
    }

    if (offset < 0) {
        return "Focus is in front of the retina (myopia).";
    }

    return "Focus is behind the retina (hyperopia).";

}

function update() {

    const axialLength = Number(slider.value);

    eye.model.setAxialLength(axialLength);
    eye.update();

    const scene = eye.optics.scene;
    const excessBlur = Math.max(
        0,
        scene.retinalBlurMillimeters - baselineBlur
    );
    const blurPixels = Math.min(8, excessBlur * 5);

    axialLengthValue.value = `${axialLength.toFixed(2)} mm`;
    axialLengthValue.textContent = axialLengthValue.value;

    focusStatus.textContent = focusLabel(
        scene.focusOffsetMillimeters
    );

    blurValue.textContent =
        `Retinal ray spread: ${scene.retinalBlurMillimeters.toFixed(2)} mm`;

    optotype.style.filter = `blur(${blurPixels.toFixed(2)}px)`;

}

slider.addEventListener("input", update);

snapFocus.addEventListener("click", () => {

    let lower = Number(slider.min);
    let upper = Number(slider.max);

    for (let iteration = 0; iteration < 18; iteration++) {

        const midpoint = (lower + upper) / 2;

        eye.model.setAxialLength(midpoint);
        eye.update();

        if (eye.optics.scene.focusOffsetMillimeters > 0) {
            lower = midpoint;
        } else {
            upper = midpoint;
        }

    }

    slider.value = ((lower + upper) / 2).toFixed(2);
    update();

});

update();
