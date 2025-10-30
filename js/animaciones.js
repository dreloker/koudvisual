// desplazarabajo
document.addEventListener("DOMContentLoaded", () => {
  const dur = 0.5; // duración del ciclo de transición
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
document.addEventListener("DOMContentLoaded", () => {
  const gradient = document.querySelector(".cursor-gradient");
  let pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  document.addEventListener("mousemove", (e) => {
    gsap.to(pos, {
      duration: 1.7, // velocidad del seguimiento
      x: e.clientX,
      y: e.clientY,
      ease: "power2.out",
      onUpdate: () => {
        gradient.style.background = `
          radial-gradient(
            circle at ${pos.x}px ${pos.y}px,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0) 40%
          )
        `;
      },
    });
  });
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

