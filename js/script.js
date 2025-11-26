//===============================================
// CONFIGURACIÓN GENERAL
//===============================================
gsap.registerPlugin(SplitText);

const slideData = [  
  { title: "Branding e identidad visual", image: "../img/slider_img_1.webp" },
  { title: "Diseño web Personalizado", image: "./../img/slider_img_2.webp" },
  { title: "Diseño gráfico impreso y digital", image: "./../img/slider_img_3.webp" },
  { title: "Ilustración y elementos visuales", image: "./../img/slider_img_4.webp" },
];

const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const mainTitle = document.querySelector(".main-title");

let frontSlideIndex = 0;
let isSliderAnimating = false;

//===============================================
// MÓDULO 0: PANTALLA DE INTRODUCCIÓN
//===============================================
const IntroScreen = {
  isActive: true,
  introElement: null,
  
  init() {
    this.introElement = document.querySelector('.intro-screen');
    this.setupScrollTrigger();
  },
  
  hide() {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.introElement.classList.add('hidden');
    mainTitle.classList.add('visible');
    
    // Después de la transición, permite la interacción con el slider
    setTimeout(() => {
      this.introElement.style.display = 'none';
      Controls.enable();
    }, 800);
  },
  
  setupScrollTrigger() {
    let wheelAccumulator = 0;
    const threshold = 150;
    
    const handleWheel = (e) => {
      if (!this.isActive) return;
      
      e.preventDefault();
      wheelAccumulator += Math.abs(e.deltaY);
      
      if (wheelAccumulator >= threshold) {
        this.hide();
        container.removeEventListener('wheel', handleWheel);
      }
    };
    
    const handleTouch = (e) => {
      if (!this.isActive) return;
      this.hide();
      container.removeEventListener('touchstart', handleTouch);
    };
    
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouch, { passive: true });
  }
};


//===============================================
// MÓDULO 1: ANIMACIÓN DE TEXTO
//===============================================
const TextAnimator = {
  currentSplit: null,
  
  init() {
    // Crea el split inicial del H1 que ya está en el HTML
    this.currentSplit = new SplitText(mainTitle, {
      type: "words",
      mask: "words",
    });
    
    // Animación de entrada inicial
    gsap.set(this.currentSplit.words, { yPercent: 100 });
    gsap.to(this.currentSplit.words, {
      yPercent: 0,
      duration: 0.75,
      ease: "power4.out",
      stagger: 0.15,
      delay: 0.5,
    });
  },
  
  update(newText) {
    // Salida del texto actual
    gsap.to(this.currentSplit.words, {
      yPercent: -100,
      duration: 0.5,
      ease: "power4.in",
      stagger: 0.05,
      onComplete: () => {
        // Cambia el contenido
        mainTitle.textContent = newText;
        
        // Crea nuevo split
        this.currentSplit = new SplitText(mainTitle, {
          type: "words",
          mask: "words",
        });
        
        // Entrada del nuevo texto
        gsap.set(this.currentSplit.words, { yPercent: 100 });
        gsap.to(this.currentSplit.words, {
          yPercent: 0,
          duration: 0.75,
          ease: "power4.out",
          stagger: 0.15,
        });
      }
    });
  }
};

//===============================================
// MÓDULO 2: SLIDER DE IMÁGENES
//===============================================
const ImageSlider = {
  init() {
    // Crea todas las slides
    slideData.forEach((data, index) => {
      const slide = document.createElement("div");
      slide.className = "slide";
      slide.innerHTML = `<img src="${data.image}" alt="${data.title}" class="slide-image" />`;
      slider.appendChild(slide);
    });

    // Posiciona las slides iniciales
    const slides = document.querySelectorAll(".slide");
    slides.forEach((slide, i) => {
      gsap.set(slide, {
        y: -15 + 15 * i + "%",
        z: 15 * i,
        opacity: 1,
      });
    });
  },
  
  slideDown() {
    const slides = document.querySelectorAll(".slide");
    const firstSlide = slides[0];
    
    frontSlideIndex = (frontSlideIndex + 1) % slideData.length;
    const newBackIndex = (frontSlideIndex + 3) % slideData.length;
    const nextSlideData = slideData[newBackIndex];

    // Crea nueva slide
    const newSlide = document.createElement("div");
    newSlide.className = "slide";
    newSlide.innerHTML = `<img src="${nextSlideData.image}" alt="${nextSlideData.title}" class="slide-image" />`;
    
    slider.appendChild(newSlide);
    
    gsap.set(newSlide, {
      y: -15 + 15 * 5 + "%",
      z: 15 * 5,
      opacity: 0,
    });

    // Anima todas las slides
    const allSlides = document.querySelectorAll(".slide");
    allSlides.forEach((slide, i) => {
      const targetPosition = i - 1;
      
      gsap.to(slide, {
        y: -15 + 15 * targetPosition + "%",
        z: 15 * targetPosition,
        opacity: targetPosition < 0 ? 0 : 1,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          if (i === 0) {
            firstSlide.remove();
            isSliderAnimating = false;
          }
        },
      });
    });
    
    // Actualiza el texto
    TextAnimator.update(slideData[frontSlideIndex].title);
  },
  
  slideUp() {
    const slides = document.querySelectorAll(".slide");
    const lastSlide = slides[slides.length - 1];
    
    frontSlideIndex = (frontSlideIndex - 1 + slideData.length) % slideData.length;
    const prevSlideData = slideData[frontSlideIndex];
    
    // Crea nueva slide
    const newSlide = document.createElement("div");
    newSlide.className = "slide";
    newSlide.innerHTML = `<img src="${prevSlideData.image}" alt="${prevSlideData.title}" class="slide-image" />`;
    
    slider.prepend(newSlide);
    
    gsap.set(newSlide, {
      y: -15 + 15 * -1 + "%",
      z: 15 * -1,
      opacity: 0,
    });
    
    // Anima todas las slides
    const slideQueue = Array.from(slider.querySelectorAll(".slide"));
    slideQueue.forEach((slide, i) => {
      const targetPosition = i;
      
      gsap.to(slide, {
        y: -15 + 15 * targetPosition + "%",
        z: 15 * targetPosition,
        opacity: targetPosition > 3 ? 0 : 1,
        duration: 1,
        ease: "power3.inOut",
        onComplete: () => {
          if (i === slideQueue.length - 1) {
            lastSlide.remove();
            isSliderAnimating = false;
          }
        },
      });
    });
    
    // Actualiza el texto
    TextAnimator.update(prevSlideData.title);
  }
};

//===============================================
// MÓDULO 3: CONTROLES (actualizado)
//===============================================
const Controls = {
  enabled: false,
  wheelAccumulator: 0,
  wheelThreshold: 100,
  isWheelActive: false,
  touchStartY: 0,
  touchStartX: 0,
  isTouchActive: false,
  touchThreshold: 50,
  
  init() {
    this.setupWheelControl();
    this.setupTouchControl();
  },
  
  enable() {
    this.enabled = true;
  },
  
  setupWheelControl() {
    container.addEventListener("wheel", (e) => {
      if (!this.enabled) return; // ← Solo funciona después de la intro
      e.preventDefault();
      
      if (isSliderAnimating || this.isWheelActive) return;
      
      this.wheelAccumulator += Math.abs(e.deltaY);
      
      if (this.wheelAccumulator >= this.wheelThreshold) {
        this.isWheelActive = true;
        this.wheelAccumulator = 0;
        
        const direction = e.deltaY > 0 ? "down" : "up";
        this.handleSlideChange(direction);
        
        setTimeout(() => {
          this.isWheelActive = false;
        }, 1200);
      }
    }, { passive: false });
  },
  
  // ... resto del código igual
  
  handleSlideChange(direction) {
    if (isSliderAnimating) return;
    isSliderAnimating = true;
    
    if (direction === "down") {
      ImageSlider.slideDown();
    } else {
      ImageSlider.slideUp();
    }
  }
};


//===============================================
// INICIALIZACIÓN (actualizada)
//===============================================
document.addEventListener("DOMContentLoaded", () => {
  IntroScreen.init();
  TextAnimator.init();
  ImageSlider.init();
  Controls.init();
  // No llamamos Controls.enable() - eso lo hace IntroScreen.hide()
});