import{test} from "./test.js";

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
            for(let nav of this.parentElement.children){
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
            icono.height="80";

            //h1
            let h1 = document.createElement("h1");
            h1.textContent = categorias.categoria;
            headerArticle.appendChild(h1);
            headerArticle.appendChild(icono);
            
            article.appendChild(headerArticle)
                                
            //Cambia backgroundImage de body segun la categoria.Imagen de JSON
            document.body.style.backgroundImage= `url('./images/${categorias.imgbody}')`;
            
            //Contador para atributo "name" de preguntas
            let contadorPreg = 1;
            for (let pregunt of categorias.preguntas) {
                let divPreg = document.createElement("div");
                divPreg.classList.add("pregunta");

                let divTituloPreg = document.createElement("div");
                divTituloPreg.classList.add("pregunta-titulo");

                let spanH3 = document.createElement("span");
                spanH3.textContent=contadorPreg;
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
                    type.value = resp.correcta;
                    let label = document.createElement("label");
                    label.setAttribute("for", `respuesta${contadorPreg}${contadorResp}`);
                    label.textContent = resp.respuesta;
                    divResp.appendChild(type);
                    divResp.appendChild(label);
                    divPreg.appendChild(divResp);
                    contadorResp++;
                };

                //Añadimos cada DIV de preguntas 
                article.appendChild(divPreg);
                contadorPreg++;
            };
    
            //Creación del boton de corregir
            let button = document.createElement("button");
            let divButton = document.createElement("div");
            divButton.classList.add("divButton");
            button.textContent = "Corrige";
            button.classList.add("boton");
            divButton.appendChild(button);
            article.appendChild(divButton);
    
            //QuerySelector Boton de Corregir
            document.querySelector(".divButton").addEventListener("click", comprueba);
        };
    };


    function comprueba() {
        
        let radios = document.querySelectorAll("input[type]:checked");
        for (let r of radios) {
            // r.nextElementSibling.style.backgroundColor = "rgb(157, 191, 205)";

            if(r.value=="true"){
                r.nextElementSibling.style.backgroundColor = "rgba(32, 108, 32, 0.486)";
                r.nextElementSibling.style.borderRadius = "10px";
                //Insertamos <img> correcta
                r.parentElement.innerHTML += `<img src="images/correcto.png" alt="" width="40">`;


                // let ima = document.createElement("img");
                // ima.width="40";
                // ima.src = `./images/correcto.png`;
                // r.parentElement.appendChild(ima);
            }else{
                r.nextElementSibling.style.backgroundColor = "rgba(171, 19, 19, 0.492)";
                r.nextElementSibling.style.borderRadius = "10px";
                //Insertamos <img> correcta
                r.parentElement.innerHTML += `<img src="images/incorrecto.png" alt="" width="40">`;

                
                // let ima = document.createElement("img");
                // ima.width="40";
                // ima.src = `./images/incorrecto.png`;
                // r.parentElement.appendChild(ima);
            }
        };
        



        
        // let tick = document.createElement("div");
        // let check = document.createElement("img");
        // check.width = "40";
        // r.parentElement.appendChild(tick);
        // tick.appendChild(check);
        // check.src = `./images/correcto.png`;

        /*
         r.nextElementSibling.style.backgroundColor = r.value == "true" ? "rgba(32, 108, 32, 0.486)" : "rgba(171, 19, 19, 0.492)";
            r.nextElementSibling.style.borderRadius = "10px";
        */



        };
    };
