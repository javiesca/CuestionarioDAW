import { test } from "./test.js";

window.onload = function () {

    let nav = document.querySelector("nav");
    let article = document.querySelector("article");
    let inicio = document.querySelector(".inicio");

    let divNav = document.createElement("div");
    divNav.classList.add("nav");


    for (let categorias of test) {
        let span = document.createElement("span");
        span.textContent = categorias.categoria;
        divNav.appendChild(span);
        nav.appendChild(divNav);

        //Función pinta CATEGORIA que seleccione
        span.addEventListener("click", pinta);


        function pinta() {

            //Pinta todos los nav del color original
            for (let nav of this.parentElement.children) {
                nav.style.backgroundColor = "#29324183";
            }

            //Pinta el nav selecionado en color
            this.style.backgroundColor = "#A46262";

            //Borra pagina de inicio
            inicio.innerHTML = "";
            //Borra preguntas anteriores
            article.innerHTML = "";

            //header
            let headerArticle = document.createElement("div");
            headerArticle.classList.add("header-article");
            //img
            let icono = document.createElement("img");
            icono.src = `./images/${categorias.imgico}`;
            icono.height = "80";

            //h1
            let h1 = document.createElement("h1");
            h1.textContent = categorias.categoria;
            headerArticle.appendChild(h1);
            headerArticle.appendChild(icono);

            article.appendChild(headerArticle)

            //Cambia backgroundImage de body segun la categoria.Imagen de JSON
            document.body.style.backgroundImage = `url('./images/${categorias.imgbody}')`;

            //Contador para atributo "name" de preguntas
            let contadorPreg = 1;
            for (let pregunt of categorias.preguntas) {
                let divPreg = document.createElement("div");
                divPreg.classList.add("pregunta");

                let divTituloPreg = document.createElement("div");
                divTituloPreg.classList.add("pregunta-titulo");

                let spanH3 = document.createElement("span");
                spanH3.textContent = contadorPreg;
                divTituloPreg.appendChild(spanH3);

                let h3 = document.createElement("h3");
                h3.textContent = pregunt.pregunta;
                divTituloPreg.appendChild(h3);

                divPreg.appendChild(divTituloPreg);


                //Contador para atributo "id" y "for" de type radio y label
                let contadorResp = 1;
                for (let resp of pregunt.respuestas) {
                    let type = document.createElement("input");
                    let divResp = document.createElement("div");
                    divResp.classList.add("respuesta");
                    type.type = pregunt.tipo == "simple" ? "radio" : "checkbox";
                    type.name = `pregunta${contadorPreg}`;
                    type.id = `respuesta${contadorPreg}${contadorResp}`;
                    type.value = resp.correcta == "true" ? "true" : "false";
                    let label = document.createElement("label");
                    label.setAttribute("for", `respuesta${contadorPreg}${contadorResp}`);
                    let divlabel = document.createElement("div");
                    divlabel.classList.add("divlabelh");
                    label.textContent = resp.respuesta;

                    divResp.appendChild(type);
                    divlabel.appendChild(label);
                    divResp.appendChild(divlabel);
                    divPreg.appendChild(divResp);

                    contadorResp++;
                };

                //Añadimos cada DIV de preguntas 
                article.appendChild(divPreg);
                contadorPreg++;
            };


            let divButton = document.createElement("div");
            divButton.classList.add("div-boton");

            divButton.innerHTML = `<button class="corrige">Corrige</button>`
            article.appendChild(divButton);

            //QuerySelector Boton de Corregir
            document.querySelector(".corrige").addEventListener("click", corrige);
        };
    };



    /*
    MIRAR CORRECCION
    ----------------------------------------------
    --Preguntas Simples--
    Cada pregunta acertada vale 1 punto

    --Preguntas Multiples--
    Cada pregunta acertada vale 1/3

    --Resulado--
    Redondear a 10 (Por lo del 1/3)
    */


    function corrige() {
        let respCorrectas = 0;
        let radios = document.querySelectorAll("input");
        //comprueba que se han checkeado al menos 7 preguntas

        


        //corrige las preguntas
        for (let r of radios) {
            if (r.value === "true" && r.checked) {
                r.nextElementSibling.style.backgroundColor = "rgba(32, 108, 32, 0.486)";
                r.nextElementSibling.style.borderRadius = "10px";
                respCorrectas++;
            }

            if (r.value === "false" && r.checked) {
                r.nextElementSibling.style.backgroundColor = "rgba(171, 19, 19, 0.492)";
                r.nextElementSibling.style.borderRadius = "10px";
                r.nextElementSibling.innerHTML += `<img src="images/incorrecto.png" alt="" width="40">`;
            }

            if (r.value === "true") {
                r.nextElementSibling.innerHTML += `<img src="images/correcto.png" alt="" width="40">`;
            }
        };
        resultados(respCorrectas);
    }

}

function resultados(respCorrectas) {
    let infor = document.querySelector(".infor");
    infor.innerHTML += `<p>Has sacado un ${respCorrectas} en el test!!</p>`;

    let ventana = document.querySelector(".resultados");
    ventana.classList.remove("esconde");

    document.querySelector(".revisar").addEventListener("click", () => { cierra(infor, ventana) });

}

function cierra(infor, ventana) {
    infor.innerHTML = "";
    ventana.classList.add("esconde");

    document.querySelector(".div-boton").innerHTML = `<button class="repite">Repite</button>`;

    document.querySelector(".repite").addEventListener("click", () => {noCheck()});


}

function noCheck(){
    document.body.children[0].nextElementSibling.children[0].children[0].click();
    
}



