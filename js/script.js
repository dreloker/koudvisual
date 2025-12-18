//===============================================
// CONFIGURACIÓN GENERAL
//===============================================
gsap.registerPlugin(SplitText);

const slideData = [  
  { title: "Branding e identidad visual", image: "../img/slider_img_1.webp", bgColor: "#86eac2", textColor: "#ffffff" },
  { title: "Diseño web Personalizado", image: "./../img/slider_img_2.webp", bgColor: "#6a59b2", textColor: "#ffffff" },
  { title: "Diseño gráfico impreso y digital", image: "./../img/slider_img_3.webp", bgColor: "#171717", textColor: "#ffffff" },
  { title: "Ilustración y elementos visuales", image: "./../img/slider_img_4.webp", bgColor: "#ffffff", textColor: "#000000" },
];

const container = document.querySelector(".container");
const slider = document.querySelector(".slider");
const mainTitle = document.querySelector(".main-title");

let currentSlideIndex = 0;
let isSliderAnimating = false;
let autoplayInterval = null;

// Mapa de colores complementarios
const complementaryColors = {
  "#86eac2": "#6a59b2", // primario -> secundario
  "#6a59b2": "#86eac2", // secundario -> primario
  "#171717": "#6a59b2", // negro -> claros
  "#ffffff": "#86eac2"  // blanco -> black
};

//===============================================
// MÓDULO 0: PANTALLA DE INTRODUCCIÓN
//===============================================

const fx = new BalatroShader({
  container: "#intro-screen",
  colours: { c1: "#000000", c2: "#ffffff", c3: "#86eac2" },
  speed: 1,
  contrast: 2,
  spinAmount: 0.5,
  pixelSizeFac: 4000, 
  spinEase: 0.1       
});

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
    
    setTimeout(() => {
      this.introElement.style.display = 'none';
      Controls.enable();
      Autoplay.start();
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
    mainTitle.textContent = slideData[currentSlideIndex].title;
    
    this.currentSplit = new SplitText(mainTitle, {
      type: "words",
      mask: "words",
    });
    
    // Aplicar color a cada palabra después de SplitText
    gsap.set(this.currentSplit.words, { 
      yPercent: 100,
      color: slideData[currentSlideIndex].textColor
    });
    
    gsap.to(this.currentSplit.words, {
      yPercent: 0,
      duration: 0.7,
      ease: "power4.out",
    });
  },
  
  update(newText, newColor) {
    gsap.to(this.currentSplit.words, {
      yPercent: -100,
      duration: 0.3,
      ease: "power4.in",
      stagger: 0.05,
      onComplete: () => {
        mainTitle.textContent = newText;
        
        this.currentSplit = new SplitText(mainTitle, {
          type: "words",
          mask: "words",
        });
        
        // Aplicar el nuevo color a cada palabra después de SplitText
        gsap.set(this.currentSplit.words, { 
          yPercent: 100,
          color: newColor
        });
        
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
// MÓDULO 1.5: CAMBIO DE COLOR DE FONDO
//===============================================
const BackgroundColor = {
  init() {
    gsap.set(container, { backgroundColor: slideData[currentSlideIndex].bgColor });
  },
  
  update(newColor) {
    gsap.to(container, {
      backgroundColor: newColor,
      duration: 0.7,
      ease: "power2.inOut"
    });
  }
};

//===============================================
// MÓDULO 2: SLIDER CON 3 CAPAS DE BLOQUES
//===============================================
const ImageSlider = {
  currentSlide: null,
  
  init() {
    // Crea la primera imagen con las 3 capas de bloques
    this.createSlideWithLayers(slideData[currentSlideIndex].image, slideData[currentSlideIndex].bgColor);
    
    // Anima la entrada inicial de los bloques de todas las capas (de abajo hacia arriba)
    const layer1Blocks = this.currentSlide.querySelectorAll('.slide-block-layer1');
    const layer2Blocks = this.currentSlide.querySelectorAll('.slide-block-layer2');
    const layer3Blocks = this.currentSlide.querySelectorAll('.slide-block-layer3');
    
    gsap.set([layer1Blocks, layer2Blocks, layer3Blocks], { scaleY: 0, transformOrigin: "bottom center" });
    gsap.to([layer1Blocks, layer2Blocks, layer3Blocks], {
      scaleY: 1,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.1,
      delay: 0.3
    });
  },
  
  createSlideWithLayers(imageSrc, bgColor) {
    const slide = document.createElement("div");
    slide.className = "slide";
    
    const complementaryColor = complementaryColors[bgColor];
    const blackColor = "#000000";
    
    // Crea 8 bloques verticales para cada capa
    for (let i = 0; i < 15; i++) {
      // CAPA 3: Color negro (la más al fondo)
      const layer3Block = document.createElement("div");
      layer3Block.className = "slide-block slide-block-layer3";
      layer3Block.style.cssText = `
        position: absolute;
        top: 0;
        left: ${i * 6.6}%;
        width: 6.6%;
        height: 100%;
        background-color: ${blackColor};
        z-index: 1;
      `;
      slide.appendChild(layer3Block);
      
      // CAPA 2: Color complementario (en el medio)
      const layer2Block = document.createElement("div");
      layer2Block.className = "slide-block slide-block-layer2";
      layer2Block.style.cssText = `
        position: absolute;
        top: 0;
        left: ${i * 6.6}%;
        width: 6.6%;
        height: 100%;
        background-color: ${complementaryColor};
        z-index: 2;
      `;
      slide.appendChild(layer2Block);
      
      // CAPA 1: Imagen (al frente)
      const layer1Block = document.createElement("div");
      layer1Block.className = "slide-block slide-block-layer1";
      layer1Block.style.cssText = `
        position: absolute;
        top: 0;
        left: ${i * 6.6}%;
        width: 6.6%;
        height: 100%;
        overflow: hidden;
        z-index: 3;
      `;
      
      const img = document.createElement("img");
      img.src = imageSrc;
      img.className = "slide-image";
      img.style.cssText = `
        position: absolute;
        top: 0;
        left: ${-i * 100}%;
        width: 1500%;
        height: 100%;
        object-fit: cover;
      `;
      
      layer1Block.appendChild(img);
      slide.appendChild(layer1Block);
    }
    
    slider.appendChild(slide);
    this.currentSlide = slide;
    return slide;
  },
  
  transition(direction) {
    if (isSliderAnimating) return;
    isSliderAnimating = true;
    
    const oldSlide = this.currentSlide;
    const layer1Blocks = oldSlide.querySelectorAll('.slide-block-layer1');
    const layer2Blocks = oldSlide.querySelectorAll('.slide-block-layer2');
    const layer3Blocks = oldSlide.querySelectorAll('.slide-block-layer3');
    
    // Animación de salida con delays escalonados (de abajo hacia arriba)
    // CAPA 1: Imagen (delay 0s)
    gsap.to(layer1Blocks, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 0.5,
      ease: "power2.in",
      stagger: 0.08
    });
    
    // CAPA 2: Color complementario (delay 0.3s)
    gsap.to(layer2Blocks, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 0.6,
      ease: "power2.in",
      stagger: 0.08,
      delay: 0.3
    });
    
    // CAPA 3: Color negro (delay 0.7s)
    gsap.to(layer3Blocks, {
      scaleY: 0,
      transformOrigin: "bottom center",
      duration: 0.7,
      ease: "power2.in",
      stagger: 0.08,
      delay: 0.7,
      onComplete: () => {
        oldSlide.remove();
      }
    });
    
    // Espera antes de crear la nueva imagen (esperamos que termine la capa 3)
    setTimeout(() => {
      // Actualiza el índice
      if (direction === "down") {
        currentSlideIndex = (currentSlideIndex + 1) % slideData.length;
      } else {
        currentSlideIndex = (currentSlideIndex - 1 + slideData.length) % slideData.length;
      }
      
      // Crea nueva slide con las 3 capas
      this.createSlideWithLayers(
        slideData[currentSlideIndex].image,
        slideData[currentSlideIndex].bgColor
      );
      
      // Anima la entrada de TODAS las capas (de abajo hacia arriba)
      const newLayer1Blocks = this.currentSlide.querySelectorAll('.slide-block-layer1');
      const newLayer2Blocks = this.currentSlide.querySelectorAll('.slide-block-layer2');
      const newLayer3Blocks = this.currentSlide.querySelectorAll('.slide-block-layer3');
      
      gsap.set([newLayer1Blocks, newLayer2Blocks, newLayer3Blocks], { 
        scaleY: 0, 
        transformOrigin: "bottom center" 
      });
      
      gsap.to([newLayer1Blocks, newLayer2Blocks, newLayer3Blocks], {
        scaleY: 1,
        duration: 0.3,
        ease: "power3.out",
        stagger: 0.1,
        onComplete: () => {
          isSliderAnimating = false;
        }
      });
      
      // Actualiza texto y color de fondo
      TextAnimator.update(slideData[currentSlideIndex].title, slideData[currentSlideIndex].textColor);
      BackgroundColor.update(slideData[currentSlideIndex].bgColor);
    }, 700); // Esperamos 1s de animación + 0.7s del último delay + margen
  }
};

//===============================================
// MÓDULO 2.5: AUTOPLAY
//===============================================
const Autoplay = {
  interval: null,
  delay: 1619,
  
  start() {
    this.stop();
    this.interval = setInterval(() => {
      if (!isSliderAnimating) {
        ImageSlider.transition("down");
      }
    }, this.delay);
  },
  
  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  },
  
  restart() {
    this.stop();
    this.start();
  }
};

//===============================================
// MÓDULO 3: CONTROLES
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
      if (!this.enabled) return;
      e.preventDefault();
      
      if (isSliderAnimating || this.isWheelActive) return;
      
      this.wheelAccumulator += Math.abs(e.deltaY);
      
      if (this.wheelAccumulator >= this.wheelThreshold) {
        this.isWheelActive = true;
        this.wheelAccumulator = 0;
        
        const direction = e.deltaY > 0 ? "down" : "up";
        ImageSlider.transition(direction);
        
        Autoplay.restart();
        
        setTimeout(() => {
          this.isWheelActive = false;
        }, 700); // Aumentado para dar tiempo a que termine la animación completa
      }
    }, { passive: false });
  },
  
  setupTouchControl() {
    container.addEventListener("touchstart", (e) => {
      if (!this.enabled) return;
      
      this.touchStartY = e.touches[0].clientY;
      this.touchStartX = e.touches[0].clientX;
      this.isTouchActive = true;
    }, { passive: true });
    
    container.addEventListener("touchmove", (e) => {
      if (!this.enabled || !this.isTouchActive || isSliderAnimating) return;
      
      const touchEndY = e.touches[0].clientY;
      const touchEndX = e.touches[0].clientX;
      const deltaY = this.touchStartY - touchEndY;
      const deltaX = this.touchStartX - touchEndX;
      
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > this.touchThreshold) {
        this.isTouchActive = false;
        
        const direction = deltaY > 0 ? "down" : "up";
        ImageSlider.transition(direction);
        
        Autoplay.restart();
      }
    }, { passive: true });
    
    container.addEventListener("touchend", () => {
      this.isTouchActive = false;
    }, { passive: true });
  }
};

//===============================================
// INICIALIZACIÓN
//===============================================
document.addEventListener("DOMContentLoaded", () => {
  IntroScreen.init();
  TextAnimator.init();
  BackgroundColor.init();
  ImageSlider.init();
  Controls.init();
});