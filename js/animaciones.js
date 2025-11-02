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

const botones = document.querySelectorAll(".menu-servicio button");
const tituloBox = document.querySelector(".titulo-servicio");
const tituloTexto = tituloBox.querySelector("h2");
const descBox = document.querySelector(".descripcion-servicio");

const descripciones = {
  branding: [
    "Desarrollo de identidad visual coherente con la personalidad de tu marca.",
    "Diseño de logotipos, paletas de color y lineamientos visuales para destacar en tu sector."
  ],
  web: [
    "Creación de sitios web con enfoque visual y estructural adaptado a cada proyecto.",
    "Diseño centrado en la experiencia del usuario, la jerarquía visual y la claridad comunicacional."
  ],
  grafico: [
    "Diseño de piezas impresas y digitales que comunican de manera clara y visualmente atractiva.",
    "Aplicaciones gráficas coherentes con la identidad de marca en diversos soportes."
  ],
  ilustracion: [
    "Ilustraciones personalizadas para reforzar el carácter visual de tus proyectos.",
    "Creación de recursos visuales que aportan estilo, narrativa y originalidad."
  ]
};

botones.forEach((btn) => {
  btn.addEventListener("click", () => {
    // estado visual de botones
    botones.forEach((b) => b.classList.remove("activo"));
    btn.classList.add("activo");

    const servicio = btn.dataset.servicio;
    const textos = descripciones[servicio];
    if (!textos) return;

    // capturamos nodos actuales (título y párrafos)
    const currentTitle = tituloTexto;
    const currentParas = Array.from(descBox.querySelectorAll("p"));

    // creamos timeline
    const tl = gsap.timeline();

    // --- SALIDA: animar fuera los textos existentes (solo nodos) ---
    // animamos los párrafos (si existen)
    if (currentParas.length) {
      tl.to(currentParas, {
        x: -40,
        opacity: 0,
        duration: 0.33,
        stagger: 0.05,
        ease: "power2.in"
      }, 0); // empezar en t=0
    }

    // animamos el título al mismo tiempo
    tl.to(currentTitle, {
      x: -30,
      opacity: 0,
      duration: 0.33,
      ease: "power2.in"
    }, 0);

    // --- REEMPLAZO: al terminar la salida reemplazamos el contenido ---
    tl.add(() => {
      // nuevo título
      tituloTexto.textContent = btn.textContent;
      // nueva descripción (insertamos <p> dinámicamente)
      descBox.innerHTML = textos.map(p => `<p>${p}</p>`).join("");
    });

    // --- ENTRADA: animamos los nodos nuevos ---
    tl.add(() => {
      const newTitle = tituloTexto; // elemento ya actualizado
      const newParas = Array.from(descBox.querySelectorAll("p"));

      // entrada del título (desde la derecha)
      gsap.fromTo(newTitle, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, ease: "power3.out" });

      // entrada de párrafos con stagger (desplazamiento lateral)
      gsap.fromTo(newParas,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: "power3.out" }
      );
    });

    // fin del click handler
  });
});
