import { cuestionario } from "./cuestionario.js";

window.onload = () => { pintaCuestionario(cuestionario) }

//Funcion pinta 
function pintaCuestionario(cuestionario) {
    
    let nav = document.querySelector("nav");
    let article = document.querySelector("article");
    let instrucciones = document.querySelector(".instrucciones");

    let divNav = document.createElement("div");
    divNav.classList.add("nav");

    for (let categoria of cuestionario) {
        let span = document.createElement("span");
        span.textContent = categoria.categoria;
        divNav.appendChild(span);
        nav.appendChild(divNav);

        //Función pinta CATEGORIA que seleccione
        span.addEventListener("click", ()=> pintaCategoria(categoria, article, instrucciones,span));
    };
}


function pintaCategoria(categoria, article, instrucciones, span) {
    //Recorre los span y resetea los colores
    for (let spanReset of document.querySelectorAll("span")) {
        spanReset.style.backgroundColor = "#29324183";
    }

    //Pinta el span selecionado en color
    span.style.backgroundColor = "#A46262";

    //Borra pagina de inicio
    instrucciones.innerHTML = "";

    //Borra preguntas anteriores
    article.innerHTML = "";

    //header
    let headerArticle = document.createElement("div");
    headerArticle.classList.add("header-article");

    //img
    let icono = document.createElement("img");
    icono.src = `./images/${categoria.imgico}`;
    icono.height = "80";

    //h1
    let h1 = document.createElement("h1");
    h1.textContent = categoria.categoria;
    headerArticle.appendChild(h1);
    headerArticle.appendChild(icono);

    article.appendChild(headerArticle)

    //Cambia backgroundImage de body segun la categoria.Imagen de JSON
    document.body.style.backgroundImage = `url('./images/${categoria.imgbody}')`;

    //Contador para atributo "name" de preguntas
    let contadorPreg = 1;
    for (let pregunta of categoria.preguntas) {
        pintaPregunta(pregunta, contadorPreg, article);
      
        contadorPreg++;
    };

    let divButton = document.createElement("div");
    divButton.classList.add("div-boton");

    divButton.innerHTML = `<button class="corrige">Corrige</button>`
    article.appendChild(divButton);

    //QuerySelector Boton de Corregir
    document.querySelector(".corrige").addEventListener("click", () => { corrige() });
}

function pintaPregunta(pregunta, contadorPreg, article) {
    let divPreg = document.createElement("div");
    divPreg.classList.add("pregunta");

    //data-attribute a los div de preguntas segun sean simples o multiples
    divPreg.dataset.tipo = pregunta.tipo;

    let divTituloPreg = document.createElement("div");
    divTituloPreg.classList.add("pregunta-titulo");

    let spanH3 = document.createElement("span");
    spanH3.textContent = `${contadorPreg}`;
    divTituloPreg.appendChild(spanH3);

    let h3 = document.createElement("h3");
    h3.textContent = pregunta.pregunta;
    divTituloPreg.appendChild(h3);

    //Icono para preguntas simples y multiples
    let img = document.createElement("img");
    img.src = `./images/${pregunta.tipo}.png`;
    img.width = "35";
    img.title = `Pregunta ${pregunta.tipo.toUpperCase()}`
    divTituloPreg.appendChild(img);

    //Agregamos todo el contenido al div principal
    divPreg.appendChild(divTituloPreg);

    //Contador para atributo "id" y "for" de type radio y label
    let contadorResp = 1;
    for (let respuesta of pregunta.respuestas) {
        pintaRespuesta(respuesta, pregunta, contadorResp, contadorPreg, divPreg);
        contadorResp++;
    };

    //Añadimos cada DIV de preguntas 
    article.appendChild(divPreg);
}

function pintaRespuesta(respuesta, pregunta, contadorResp, contadorPreg, divPreg) {

    let type = document.createElement("input");
    let divResp = document.createElement("div");
    divResp.classList.add("respuesta");
    type.type = pregunta.tipo == "simple" ? "radio" : "checkbox";
    type.name = `pregunta${contadorPreg}`;
    type.id = `respuesta${contadorPreg}${contadorResp}`;
    type.value = respuesta.correcta == "true" ? "true" : "false";
    let label = document.createElement("label");
    label.setAttribute("for", `respuesta${contadorPreg}${contadorResp}`);
    let divlabel = document.createElement("div");
    divlabel.classList.add("divlabel");
    label.textContent = respuesta.respuesta;

    divResp.appendChild(type);
    divlabel.appendChild(label);
    divResp.appendChild(divlabel);
    divPreg.appendChild(divResp);
}

//Función que cuenta preguntas respondidas
function cuentaRespondidas() {
    let preguntas = document.querySelectorAll(".pregunta");

    let contadorCheckeada = 0;
    for (let pregunta of preguntas) {
        for (let resp of pregunta.children) {
            if (resp.children[0].checked) {
                contadorCheckeada++;
                break;
            }
        }
    }
    return contadorCheckeada;
}

//Función que recorre las preguntas. 
function corrige() {
    let preguntas = document.querySelectorAll(".pregunta");

    document.querySelector(".minimo .info").style.opacity = "1";
    document.querySelector(".resultados .info").style.opacity = "1";

    if (cuentaRespondidas() < 5) {
        minimo(cuentaRespondidas());
    } else {
        let respCorrectas = 0;
        //Asignamos un data-attribute según la pregunta sea simple o múltiple.
        for (let pregunta of preguntas) {
            let tipo = pregunta.dataset.tipo;

            if (tipo === "simple") {
                //Si la pregunta es simple la funcion corrigeSimple nos retorna un valor numérico de la corrección de esta pregunta
                respCorrectas += corrigeSimple(pregunta);

            } else {
                //Si la pregunta es múltiple la funcion corrigeSimple nos retorna un valor numérico de la corrección de esta pregunta
                respCorrectas += corrigeMultiple(pregunta);
            }
        }
        resultados(respCorrectas);
    }


}

function minimo(contadorCheckeada) {
    let infor = document.querySelector(".minimo .infor");
    let advertencia = document.createElement("img");
    advertencia.src = `./images/advertencia.png`;
    infor.append(advertencia);
    infor.innerHTML += "<p>Responde un mínimo de 5 preguntas</p>"
    infor.innerHTML += `<p>Has contestado ${contadorCheckeada}</p>`;
    let ventana = document.querySelector(".minimo");
    ventana.classList.remove("esconde");

    document.querySelector(".minimo .revisar").addEventListener("click", () => { cierra(infor, ventana) });
}

function resultados(respCorrectas) {
    let infor = document.querySelector(".infor");


    if (respCorrectas > 8) {
        infor.innerHTML += `<p>Tu nota es: <span>${respCorrectas}</span></p><p>Respuestas marcadas: ${cuentaRespondidas()}</p>
        `;

        let img = document.createElement("img");
        img.src = `./images/einstein.png`;

        infor.appendChild(img);
        infor.innerHTML += "<p>Eres un GENIO!!</p>";
    } else if (respCorrectas <= 8 && respCorrectas >= 5) {
        infor.innerHTML += `<p>Tu nota es: <span>${respCorrectas}</span></p><p>Respuestas marcadas: ${cuentaRespondidas()}</p>
        `;
        let img = document.createElement("img");
        img.src = `./images/trofeo.png`;

        infor.appendChild(img);
        infor.innerHTML += "<p>Buen trabajo!!</p>";
    } else {
        infor.innerHTML += `<p>Tu nota es: <span>${respCorrectas}</span></p><p>Respuestas marcadas: ${cuentaRespondidas()}</p>`;
        let img = document.createElement("img");
        img.src = `./images/burro.png`;

        infor.append(img);
        infor.innerHTML += "<p>Tienes que repasar</p>";
    }


    let ventana = document.querySelector(".resultados");
    ventana.classList.remove("esconde");

    document.querySelector(".revisar").addEventListener("click", () => { cierraRepite(infor, ventana) });
}

//Funcion que cierra ventana para ver corrección y repetir test
function cierraRepite(infor, ventana) {

    infor.innerHTML = "";
    ventana.classList.add("esconde");

    document.querySelector(".div-boton").innerHTML = `<button class="repite">Repite</button>`;

    document.querySelector(".repite").addEventListener("click", () => { repiteCuestionario() });

    //Desactivamos efecto HOVER en las respuestas cuando estamos revisando el examen
    let quithov = document.querySelectorAll(".respuesta .divlabel");
    for (let quit of quithov) {
        quit.style.pointerEvents = "none";
    }

}

//Funcion que cierra ventana de aviso de minimo 5 preguntas
function cierra(infor, ventana) {
    infor.innerHTML = "";
    ventana.classList.add("esconde");
}

//Repite cuestionario actual. Click en el elemento que tenemos con el background de seleccionado.
function repiteCuestionario() {
    window.scrollTo(0, 0);
    for (let n of document.querySelectorAll("nav span")) {
        if (n.style.backgroundColor == "rgb(164, 98, 98)") {
            n.click();
            break;
        }
    }
}

function corrigeSimple(pregunta) {
    let puntuacionPregunta = 0;
    let radios = pregunta.querySelectorAll(".respuesta input");

    for (let radio of radios) {
        if (radio.value === "true" && radio.checked) {
            puntuacionPregunta++;
        }
    }

    pintaRespuestas(radios);
    return puntuacionPregunta;
}

//Función que corrige las respuestas múltiples
function corrigeMultiple(pregunta) {
    let puntuacionPregunta = 0;
    let puntuaAcierto = 0;

    //Asignamos un valor a la pregunta acertada devidiendo la nota total de la pregunta entre las posibles respuestas correctas.
    //ej: Si hay 2 preguntas correctas 1/2=0.5 cada respuesta acertada.
    let cuentaCorrectas = pregunta.querySelectorAll(".respuesta input[value='true']");
    puntuaAcierto = 1 / cuentaCorrectas.length;

    //Recorremos las respuestas checkeadas y asignamos el valor cálculado anteriormente a cada respuesta acertada.
    let radios = pregunta.querySelectorAll(".respuesta input");
    for (let correctas of radios) {
        if (correctas.checked && correctas.value == "true") {
            puntuacionPregunta += puntuaAcierto;
        }
    }

    //En las respuestas múltiples, pinta de color naranja las respuestas correctas no seleccionadas.
    for (let correctas of cuentaCorrectas) {
        if (!correctas.checked) {
            correctas.nextElementSibling.style.backgroundColor = "orange";
        }
    }

    //Despues de la corrección, llamamos a la función que colorea y añade una imagen según el resultado del test.
    pintaRespuestas(radios);

    return puntuacionPregunta;
}

//Función que cambia el background y añade una imagen a las respuestas según el usuario haya acertado o no.
function pintaRespuestas(radios) {

    for (let radio of radios) {
        if (radio.value === "true" && radio.checked) {
            radio.nextElementSibling.style.backgroundColor = "rgba(32, 108, 32, 0.486)";
            radio.nextElementSibling.innerHTML += `<img src="images/correcto.png" alt="" width="40">`;
            radio.nextElementSibling.style.borderRadius = "10px";
        }

        if (radio.value === "false" && radio.checked) {
            radio.nextElementSibling.style.backgroundColor = "rgba(171, 19, 19, 0.492)";
            radio.nextElementSibling.style.borderRadius = "10px";
            radio.nextElementSibling.innerHTML += `<img src="images/incorrecto.png" alt="" width="40">`;
        }

        if (radio.value === "true") {
            radio.nextElementSibling.style.backgroundColor = "rgba(32, 108, 32, 0.486)";
        }

        //PINTAR DE OTRO COLOR LAS RESPUESTAS DE LAS PREGUNTAS NO SELECCIONADAS
        //REVISAR

    }



}


