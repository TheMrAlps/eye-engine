import Eye from "../../engine/Eye.js";

const svg = document.getElementById("eye");

const eye = new Eye(svg);

eye.update();

window.eye = eye;
