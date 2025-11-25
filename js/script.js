//Slider

gsap.registerPlugin(SplitText);

const slideData = [  
  { title: "Branding", image: "../img/slider_img_1.webp" },
  { title: "Web", image: "./../img/slider_img_2.webp" },
  { title: "Off", image: "./../img/slider_img_3.webp" },
  { title: "Ilust", image: "./../img/slider_img_4.webp" },
];

const container = document.querySelector(".container");
const slider = document.querySelector(".slider");

let frontSlideIndex = 0;
let isSliderAnimating = false;

function initializeSlider() {
  slideData.forEach( (data, index) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    slide.innerHTML = `
              <img src="${data.image}" alt="${data.title}" class="slide-image" />
              <h1 class="slide-title">${data.title}</h1>
              `;
    slider.appendChild(slide);
  });

  let slides = document.querySelectorAll(".slide");

  slides.forEach((slide) => {
    const title = slide.querySelector(".slide-title");
    new SplitText(title, {
      type: "words",
      mask: "words",
    });
  });

  slides.forEach((slide, i) => {
    gsap.set(slide, {
      y: -15 + 15 * i + "%",
      z: 15 - i,
      opacity: 1,
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initializeSlider();
});


let wheelAccumulator = 0;
const wheelThreshold = 100;
let isWheelActive = false;

container.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();

    if (isSliderAnimating || isWheelActive) return;

    wheelAccumulator += Math.abs(e.deltaY);

    if (wheelAccumulator >= wheelThreshold) {
      isWheelActive = true;
      wheelAccumulator = 0;

      const direction = e.deltaY > 0 ? "down" : "up";
      handleSliderChange(direction);

      setTimeout(() => {
        isWheelActive = false;
      }, 1200);
    }
  },
  { passive: false }
);



// Modo de fusión
//const cursor = document.querySelector('.cursor-gradient');

//document.addEventListener('mousemove', e => {
 // const mouseX = e.clientX;
 // const mouseY = e.clientY;
 // cursor.style.clipPath = `circle(20vw at ${mouseX}px ${mouseY}px)`;
//});
