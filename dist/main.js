// Efecto Máquina de Escribir ----- Comienzo

// Clase ES6 efecto máquina de escribir 
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  // Función para escribir las letras
  type() {
    // Índice actual de la palabra
    const current = this.wordIndex % this.words.length;
    // Obtener todo el texto de la palabra actual
    const fullTxt = this.words[current];

    // Comprobar si está borrando
    if (this.isDeleting) {
      // Borrar letra
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Añadir letra
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insetar txt al elemento
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Velocidad de escritura inicial
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // Si la palabra está completa
    if (!this.isDeleting && this.txt === fullTxt) {
      // Hacer una pausa al final
      typeSpeed = this.wait;
      // Establecer estado de borrado
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Mover a la siguiente palabra
      this.wordIndex++;
      // Pausa antes de escribir
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Inicialización de la aplicación de escritura de palabras "On DOM Load"
document.addEventListener("DOMContentLoaded", init);

// Preparación de la página para la escritura de las palabras
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Inicializar el efecto máquina de escribir
  new TypeWriter(txtElement, words, wait);
}

// Efecto Máquina de Escribir ----- Final

// Disminución gradual sonido del mar
function fade() {
  let audio = document.querySelector('audio');
  if (audio.volume > 0.02) {
    audio.volume -= 0.02;
    setTimeout(fade, 40);
  } else {
    audio.pause();
  }
}

// Accede a la torre si se clica cobre ella
document.addEventListener('click', function (event) {

  // No ocurre nada si se clica fuera de la torre
  if (!event.target.matches('.tower')) return;

  // Desaparición gradual imagen fondo página principal
  document.querySelector('body').classList.add("vanishingEffect");

  // Efecto evaporación cabeceras página principal
  let smoke_animation = document.querySelector('.container').children;
  Array.from(smoke_animation).forEach(element => {
    element.classList.add("smokeEfect");
  });

  fade();

  // Acceso dentro de la torre :)
  setTimeout("window.open(\'tower.html', \'_self\')", 3000);

}, false);

