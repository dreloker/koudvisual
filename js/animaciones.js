// desplazarabajo
document.addEventListener("DOMContentLoaded", () => {
  const dur = 0.3; // duración del ciclo de transición
  const tl = gsap.timeline({ repeat: -1, defaults: { ease: "sine.inOut" } });


// valores base
  gsap.set(["#fila1", "#fila2", "#fila3"], { opacity: 0.3 });

  // animación continua con traslape suave
  tl.to("#fila1", { opacity: 1, duration: dur })
    .to("#fila1", { opacity: 0.3, duration: dur }, `+=${dur / 2}`)
    .to("#fila2", { opacity: 1, duration: dur }, `-=${dur * 1}`)
    .to("#fila2", { opacity: 0.3, duration: dur }, `+=${dur / 2}`)
    .to("#fila3", { opacity: 1, duration: dur }, `-=${dur * 1}`)
    .to("#fila3", { opacity: 0.3, duration: dur }, `+=${dur / 2}`);
});


// Modo de fusión
const cursor = document.querySelector('.cursor-gradient');

document.addEventListener('mousemove', e => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;
  cursor.style.clipPath = `circle(20vw at ${mouseX}px ${mouseY}px)`;
});


//botón desplazarabajo
document.addEventListener("DOMContentLoaded", () => {
  const scrollTrigger = document.querySelector("#desplazarabajo");

  scrollTrigger.addEventListener("click", () => {
    gsap.to(window, {
      duration: 1, // duración del scroll (en segundos)
      scrollTo: { y: ".contenido-dos", offsetY: 0 }, // destino
      ease: "power2.inOut" // suavidad de movimiento
    });
  });
});


//serv activo
const servicios = document.querySelectorAll(".serv");

servicios.forEach(serv => {
  serv.addEventListener("click", () => {
    servicios.forEach(s => s.classList.remove("activo"));
    serv.classList.add("activo");
  });
});


// Interacción con los .serv del index
const servs = document.querySelectorAll(".serv");
if (servs.length > 0) {
  servs.forEach(s => {
    s.addEventListener("click", () => {
      servs.forEach(x => x.classList.remove("activo"));
      s.classList.add("activo");
    });
  });
}


// Servicios
// Menú serv

document.querySelectorAll(".menu-servicio button").forEach((btn) => {
  btn.addEventListener("click", () => {
    // quitar clase activo de todos
    document
      .querySelectorAll(".menu-servicio button")
      .forEach((b) => b.classList.remove("activo"));

    // aplicar solo al clickeado
    btn.classList.add("activo");
  });
});
