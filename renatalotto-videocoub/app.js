
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyASC-ZLtwqeVJ08W7k47UZPdBk7i0a12C8",
  authDomain: "videoclub1-24b3e.firebaseapp.com",
  projectId: "videoclub1-24b3e",
  storageBucket: "videoclub1-24b3e.firebasestorage.app",
  messagingSenderId: "410275515394",
  appId: "1:410275515394:web:45e3f544207393e8806b1b",
  measurementId: "G-HTW8Y969Y1"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

//profe no tengo la Ñ
let inputTitulo = document.querySelector("#titulo");
let inputDirector = document.querySelector("#director");
let inputAnio = document.querySelector("#anio"); 
let inputGenero = document.querySelector("#genero");
let inputBuscar = document.querySelector("#buscar");
let inputDescripcion = document.querySelector("#descripcion");

let resultado = document.querySelector("p");

let btnAgregar = document.querySelector("#agregar");
let btnBuscar = document.querySelector("#btnbuscar");

btnAgregar.onclick = function () {


    let peliculasRef = ref(db, "peliculas");

    let nuevaPelicula = push(peliculasRef);


    set(nuevaPelicula, {
        titulo: inputTitulo.value,
        director: inputDirector.value,
        anio: inputAnio.value,
        genero: inputGenero.value,
        descripcion: inputDescripcion.value
    })

    .then(() => {
        alert("Pelicula agregada correctamente");

        inputTitulo.value = "";
        inputDirector.value = "";
        inputAnio.value = "";
        inputGenero.value = "";
        inputDescripcion.value = "";
    })

    .catch((error) => {
        alert("Error al agregar pelicula: " + error.message);
    });

};

btnBuscar.onclick = function () {

    let peliculasRef = ref(db, "peliculas");

    onValue(peliculasRef, (datos) => {

        let peliculas = datos.val();

        resultado.innerHTML = "";

        if (peliculas) {

            let encontrada = false;

        
            for (let id in peliculas) {

                if (
                    peliculas[id].titulo.toLowerCase().includes(inputBuscar.value.toLowerCase())
                ) {

                    resultado.innerHTML += `
                        <div class="tarjeta">
                            <h2>${peliculas[id].titulo}</h2>
                            <p>Director: ${peliculas[id].director}</p>
                            <p>Año: ${peliculas[id].anio}</p>
                            <p>Género: ${peliculas[id].genero}</p>
                            <p>${peliculas[id].descripcion}</p>
                        </div>
                    `;

                    encontrada = true;
                }
            }

            if (!encontrada) {
                resultado.textContent = "No se encontraron peliculas";
            }

        } else {
            resultado.textContent = "No hay peliculas cargadas";
        }

    }, {
        onlyOnce: true
    });

};
