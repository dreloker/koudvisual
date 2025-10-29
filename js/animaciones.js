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
