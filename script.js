// Navegación y funcionalidad principal
document.addEventListener("DOMContentLoaded", function () {
  // Elementos del DOM
  const navLinks = document.querySelectorAll(".nav-link");
  const liLinks = document.querySelectorAll(".li-link");
  const sections = document.querySelectorAll(".section");
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const navList = document.querySelector(".nav-list");
  const contactForm = document.getElementById("contactForm");
  const newsletterForm = document.querySelector(".newsletter-form");

  // Navegación entre secciones
  function showSection(targetId) {
    // Ocultar todas las secciones
    sections.forEach((section) => {
      section.classList.remove("active");
    });

    // Mostrar la sección objetivo
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
    }

    // Actualizar enlaces activos
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${targetId}`) {
        link.classList.add("active");
      }
    });

    // Cerrar menú móvil si está abierto
    navList.classList.remove("active");
  }

  // Event listeners para navegación
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSection(targetId);

      // Scroll suave al inicio de la sección
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  });
  // Event listeners para navegación
  liLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      showSection(targetId);
      // Scroll suave al inicio de la sección
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }, 100);
    });
  });

  // Menú móvil
  mobileMenuToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
    this.classList.toggle("active");
  });

  // Cerrar menú móvil al hacer clic en un enlace
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navList.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
    });
  });

  // Formulario de contacto
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener datos del formulario
      const formData = new FormData(this);
      const data = Object.fromEntries(formData);

      // Validación básica
      if (!data.nombre || !data.email || !data.mensaje) {
        showNotification(
          "Por favor, completa todos los campos requeridos.",
          "error"
        );
        return;
      }

      // Simular envío del formulario
      const submitBtn = this.querySelector(".btn-submit");
      const originalText = submitBtn.textContent;

      submitBtn.textContent = "Enviando...";
      submitBtn.disabled = true;
      this.classList.add("loading");

      setTimeout(() => {
        showNotification(
          "¡Mensaje enviado correctamente! Te responderemos pronto.",
          "success"
        );
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        this.classList.remove("loading");
      }, 2000);
    });
  }

  // Formulario de newsletter
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = this.querySelector('input[type="email"]').value;
      if (!email) {
        showNotification("Por favor, ingresa tu email.", "error");
        return;
      }

      const button = this.querySelector("button");
      const originalText = button.textContent;

      button.textContent = "Suscribiendo...";
      button.disabled = true;

      setTimeout(() => {
        showNotification("¡Te has suscrito exitosamente!", "success");
        this.reset();
        button.textContent = originalText;
        button.disabled = false;
      }, 1500);
    });
  }

  // Sistema de notificaciones
  function showNotification(message, type = "info") {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${
                  type === "success"
                    ? "fa-check-circle"
                    : type === "error"
                    ? "fa-exclamation-circle"
                    : "fa-info-circle"
                }"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    // Agregar estilos si no existen
    if (!document.querySelector("#notification-styles")) {
      const styles = document.createElement("style");
      styles.id = "notification-styles";
      styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    z-index: 10000;
                    max-width: 400px;
                    padding: 1rem;
                    border-radius: 10px;
                    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .notification-success {
                    background: linear-gradient(135deg, #27ae60, #2ecc71);
                    color: white;
                }
                
                .notification-error {
                    background: linear-gradient(135deg, #e74c3c, #c0392b);
                    color: white;
                }
                
                .notification-info {
                    background: linear-gradient(135deg, #3498db, #2980b9);
                    color: white;
                }
                
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-left: auto;
                    padding: 0;
                    width: 20px;
                    height: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .notification.show {
                    transform: translateX(0);
                }
            `;
      document.head.appendChild(styles);
    }

    // Agregar al DOM
    document.body.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
      notification.classList.add("show");
    }, 100);

    // Event listener para cerrar
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        hideNotification(notification);
      });

    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
      hideNotification(notification);
    }, 5000);
  }

  function hideNotification(notification) {
    notification.classList.remove("show");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }

  // Efectos de scroll y animaciones
  function handleScroll() {
    const scrolled = window.pageYOffset;
    const header = document.querySelector(".header");

    // Animaciones de entrada para elementos
    const animatedElements = document.querySelectorAll(
      ".character-card, .feature-card, .gallery-item, .chapter-item"
    );
    animatedElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Inicializar animaciones
  function initAnimations() {
    const animatedElements = document.querySelectorAll(
      ".character-card, .feature-card, .gallery-item, .chapter-item"
    );
    animatedElements.forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(30px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
  }

  // ===== FUNCIONALIDAD DEL MODAL DE GALERÍA =====

  // Detección de características del navegador
  const browserSupport = {
    transform: CSS.supports && CSS.supports("transform", "scale(1)"),
    backdropFilter:
      CSS.supports && CSS.supports("backdrop-filter", "blur(10px)"),
    addEventListener: !!document.addEventListener,
    querySelector: !!document.querySelector,
    classList: !!document.documentElement.classList,
    flexbox: CSS.supports && CSS.supports("display", "flex"),
  };

  // Detección del navegador
  function detectBrowser() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIE = /msie|trident/.test(userAgent);
    const isIE8 = /msie 8/.test(userAgent);
    const isOldFirefox = /firefox\/[1-3][0-9]/.test(userAgent);
    const isOldSafari = /version\/[1-8]\./.test(userAgent);

    // Agregar clases al body para CSS específico
    if (isIE8) {
      document.body.className += " ie8";
    }
    if (isIE) {
      document.body.className += " ie";
    }
    if (!browserSupport.flexbox) {
      document.body.className += " no-flexbox";
    }

    return {
      isIE: isIE,
      isIE8: isIE8,
      isOldFirefox: isOldFirefox,
      isOldSafari: isOldSafari,
    };
  }

  const browserInfo = detectBrowser();

  // Variables del modal
  let currentImageIndex = 0;
  let isZoomed = false;
  let zoomLevel = 1;
  let isDragging = false;
  let dragStart = { x: 0, y: 0 };
  let imageOffset = { x: 0, y: 0 };

  // Elementos del modal
  const galleryModal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const currentImageSpan = document.getElementById("currentImage");
  const totalImagesSpan = document.getElementById("totalImages");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const zoomInBtn = document.getElementById("zoomInBtn");
  const zoomOutBtn = document.getElementById("zoomOutBtn");
  const resetZoomBtn = document.getElementById("resetZoomBtn");

  // Obtener todas las imágenes de la galería
  const galleryItems = document.querySelectorAll(".gallery-item");
  const galleryImages = Array.from(galleryItems).map((item) => ({
    src: item.dataset.image,
    title: item.dataset.title,
    description: item.dataset.description,
  }));

  // Configurar total de imágenes
  if (totalImagesSpan) {
    totalImagesSpan.textContent = galleryImages.length;
  }

  // Verificar compatibilidad del navegador
  function checkBrowserCompatibility() {
    const issues = [];

    if (!browserSupport.querySelector) {
      issues.push(
        "Este navegador no soporta características modernas. Algunas funciones pueden no funcionar correctamente."
      );
    }

    if (!browserSupport.addEventListener) {
      issues.push(
        "Navegador muy antiguo detectado. La galería puede no funcionar completamente."
      );
    }

    if (issues.length > 0) {
      console.warn("Problemas de compatibilidad detectados:", issues);

      // Mostrar advertencia al usuario solo si hay problemas graves
      if (!browserSupport.querySelector || !browserSupport.addEventListener) {
        showNotification(
          "Tu navegador es muy antiguo. Para una mejor experiencia, actualiza a una versión más reciente.",
          "info"
        );
      }
    }
  }

  // Ejecutar verificación de compatibilidad
  checkBrowserCompatibility();

  // Función para abrir el modal
  function openGalleryModal(index) {
    currentImageIndex = index;
    updateModalContent();

    if (galleryModal) {
      galleryModal.classList.add("active");

      // Fallback para navegadores que no soportan classList
      if (!galleryModal.classList) {
        galleryModal.className += " active";
      }
    }

    if (document.body.style) {
      document.body.style.overflow = "hidden";
    }

    // Enfocar el modal para controles de teclado
    if (galleryModal && galleryModal.focus) {
      galleryModal.focus();
    }
  }

  // Función para cerrar el modal
  function closeGalleryModal() {
    galleryModal.classList.remove("active");
    document.body.style.overflow = "";
    resetZoom();
  }

  // Función para actualizar el contenido del modal
  function updateModalContent() {
    const currentImage = galleryImages[currentImageIndex];

    modalImage.src = currentImage.src;
    modalImage.alt = currentImage.title;
    modalTitle.textContent = currentImage.title;
    modalDescription.textContent = currentImage.description;
    currentImageSpan.textContent = currentImageIndex + 1;

    // Agregar efecto de carga
    modalImage.classList.add("loading");
    modalImage.onload = () => {
      modalImage.classList.remove("loading");
    };
  }

  // Función para navegar a la imagen anterior
  function showPreviousImage() {
    currentImageIndex =
      currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
    updateModalContent();
    resetZoom();
  }

  // Función para navegar a la imagen siguiente
  function showNextImage() {
    currentImageIndex =
      currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
    updateModalContent();
    resetZoom();
  }

  // Funciones de zoom
  function zoomIn() {
    zoomLevel = Math.min(zoomLevel * 1.5, 5);
    applyZoom();
  }

  function zoomOut() {
    zoomLevel = Math.max(zoomLevel / 1.5, 0.5);
    applyZoom();
  }

  function resetZoom() {
    zoomLevel = 1;
    imageOffset = { x: 0, y: 0 };
    applyZoom();
  }

  function applyZoom() {
    if (browserSupport.transform) {
      // Usar transform para navegadores modernos
      modalImage.style.transform = `scale(${zoomLevel}) translate(${imageOffset.x}px, ${imageOffset.y}px)`;
    } else {
      // Fallback para navegadores antiguos
      const scale = zoomLevel;
      const width = modalImage.naturalWidth || modalImage.width;
      const height = modalImage.naturalHeight || modalImage.height;

      if (scale > 1) {
        modalImage.style.width = width * scale + "px";
        modalImage.style.height = height * scale + "px";
        modalImage.style.position = "relative";
        modalImage.style.left = imageOffset.x + "px";
        modalImage.style.top = imageOffset.y + "px";
      } else {
        modalImage.style.width = "auto";
        modalImage.style.height = "auto";
        modalImage.style.position = "static";
        modalImage.style.left = "auto";
        modalImage.style.top = "auto";
      }
    }

    modalImage.classList.toggle("zoomed", zoomLevel > 1);
    isZoomed = zoomLevel > 1;

    // Mostrar/ocultar indicador de zoom
    showZoomIndicator();
  }

  function showZoomIndicator() {
    // Crear o actualizar indicador de zoom
    let indicator = document.querySelector(".zoom-indicator");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.className = "zoom-indicator";
      document.querySelector(".modal-body").appendChild(indicator);
    }

    if (isZoomed) {
      indicator.textContent = `${Math.round(zoomLevel * 100)}%`;
      indicator.classList.add("show");

      setTimeout(() => {
        indicator.classList.remove("show");
      }, 2000);
    }
  }

  // Funcionalidad de arrastrar imagen cuando está zoomed
  function handleImageDrag(e) {
    if (!isZoomed) return;

    if (e.type === "mousedown") {
      isDragging = true;
      dragStart = {
        x: e.clientX - imageOffset.x,
        y: e.clientY - imageOffset.y,
      };
      modalImage.style.cursor = "grabbing";
      e.preventDefault();
    } else if (e.type === "mousemove" && isDragging) {
      imageOffset.x = e.clientX - dragStart.x;
      imageOffset.y = e.clientY - dragStart.y;
      applyZoom();
    } else if (e.type === "mouseup") {
      isDragging = false;
      modalImage.style.cursor = isZoomed ? "grab" : "default";
    }
  }

  // Función para agregar event listeners de forma compatible
  function addEvent(element, event, handler) {
    if (browserSupport.addEventListener && element) {
      element.addEventListener(event, handler);
    } else if (element && element.attachEvent) {
      // Fallback para IE8 y anteriores
      element.attachEvent("on" + event, handler);
    }
  }

  // Event listeners para el modal
  addEvent(closeModalBtn, "click", closeGalleryModal);
  addEvent(prevBtn, "click", showPreviousImage);
  addEvent(nextBtn, "click", showNextImage);
  addEvent(zoomInBtn, "click", zoomIn);
  addEvent(zoomOutBtn, "click", zoomOut);
  addEvent(resetZoomBtn, "click", resetZoom);

  // Event listeners para arrastrar imagen
  if (modalImage) {
    modalImage.addEventListener("mousedown", handleImageDrag);
    document.addEventListener("mousemove", handleImageDrag);
    document.addEventListener("mouseup", handleImageDrag);

    // Doble clic para zoom
    modalImage.addEventListener("dblclick", () => {
      if (isZoomed) {
        resetZoom();
      } else {
        zoomIn();
      }
    });
  }

  // Event listeners para la galería
  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openGalleryModal(index);
    });

    // Efectos de hover mejorados
    item.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05) rotate(1deg)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) rotate(0deg)";
    });
  });

  // Cerrar modal al hacer clic fuera del contenido
  galleryModal.addEventListener("click", (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Efectos de hover para personajes
  const characterCards = document.querySelectorAll(".character-card");
  characterCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Navegación con teclado
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Cerrar menú móvil o modal de galería
      if (galleryModal && galleryModal.classList.contains("active")) {
        closeGalleryModal();
      } else {
        navList.classList.remove("active");
        mobileMenuToggle.classList.remove("active");
      }
    }

    // Controles del modal de galería
    if (galleryModal && galleryModal.classList.contains("active")) {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          showPreviousImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          showNextImage();
          break;
        case "+":
        case "=":
          e.preventDefault();
          zoomIn();
          break;
        case "-":
          e.preventDefault();
          zoomOut();
          break;
        case "0":
          e.preventDefault();
          resetZoom();
          break;
        case " ":
          e.preventDefault();
          // Espacio para alternar entre zoom
          if (isZoomed) {
            resetZoom();
          } else {
            zoomIn();
          }
          break;
      }
    }
  });

  // Lazy loading para imágenes
  function lazyLoadImages() {
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }

  // Efecto de partículas de fondo (opcional)
  function createParticles() {
    const particleContainer = document.createElement("div");
    particleContainer.className = "particles";
    particleContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
      const particle = document.createElement("div");
      particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                animation: float ${Math.random() * 10 + 10}s infinite linear;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
      particleContainer.appendChild(particle);
    }

    // Agregar animación CSS
    const style = document.createElement("style");
    style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }

  // Inicializar todas las funcionalidades
  initAnimations();
  handleScroll();
  lazyLoadImages();
  createParticles();

  // Event listeners
  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);

  // Mostrar sección inicial
  showSection("home");

  // Efecto de carga inicial
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);

  console.log("🎌 Claymore Fan Page cargada correctamente!");
  console.log("Desarrollado con ❤️ para los fans de Claymore");
});

// Funciones adicionales para interactividad avanzada
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark-theme") ? "dark" : "light"
  );
}

function sharePage() {
  if (navigator.share) {
    navigator.share({
      title: "Claymore Fan Page",
      text: "Descubre todo sobre la serie Claymore",
      url: window.location.href,
    });
  } else {
    // Fallback para navegadores que no soportan Web Share API
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      showNotification("¡Enlace copiado al portapapeles!", "success");
    });
  }
}

// Cargar tema guardado
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  }
});
