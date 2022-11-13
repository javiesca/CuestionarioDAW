import { test } from "./test.js";

window.onload = function () {
    let logos = document.querySelector("div");
    for (let img of test) {
        let ico = document.createElement("div");
        ico.classList.add("icos");

        let imgn = document.createElement("img");
        imgn.src = `./images/${img.imgico}`;
        imgn.height = "140";
        ico.appendChild(imgn);

        let titulo = document.createElement("h2");
        titulo.textContent = `${img.categoria}`;
        ico.appendChild(titulo);
        logos.appendChild(ico);
    }
  
}
