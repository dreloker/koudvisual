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


//animaciones exclusivas servicios
// Animaciones de entrada
gsap.fromTo(".imgservices", 
  { x: "-10%", opacity: 0, filter: "blur(8px)" },
  { x: "0%", opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
);

gsap.to(".img-overlay", { opacity: 1, duration: 1.5, delay: 0.2 });

gsap.from(".services", {
  y: 40,
  opacity: 0,
  stagger: 0.15,
  duration: 1,
  ease: "power2.out",
  delay: 0.6
});

// Interacción con los servicios
const servicios = document.querySelectorAll(".services");

servicios.forEach(service => {
  service.addEventListener("click", () => {
    servicios.forEach(s => s.classList.remove("activo"));
    service.classList.add("activo");

    // animación GSAP al activar
    gsap.fromTo(service, 
      { scale: 0.95 }, 
      { scale: 1, duration: 0.5, ease: "power2.out" }
    );
  });
});
