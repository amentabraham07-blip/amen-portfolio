
/* =========================================
   AMEN'S PORTFOLIO - MAIN JAVASCRIPT
   Smooth and elegant animations
========================================= */


/* 1. SCROLL REVEAL */
const revealItems = document.querySelectorAll(".reveal");

// Keep the main hero heading visible immediately
const heroHeading = document.querySelector(".hero h1");

if (heroHeading) {
  heroHeading.classList.add("visible");
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px 0px 0px"
    }
  );

  revealItems.forEach((item) => {
    if (item !== heroHeading) {
      revealObserver.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => {
    item.classList.add("visible");
  });
}


/* 2. READING PROGRESS BAR */
const progress = document.getElementById("scrollProgress");

function updateProgress() {
  if (!progress) return;

  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const amount =
    scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

  progress.style.width = `${amount}%`;
}

window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();


/* 3. MOBILE NAVIGATION */
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}


/* AUTOMATIC ROLE CHANGE WITH SMOOTH FADE */

const roleElement = document.getElementById("typedRole");

if (roleElement) {
  const roles = [
    "Aspiring Software Developer",
    "Frontend Developer",
    "PHP Developer",
    "Web Developer",
    "Programmer"
  ];

  let index = 0;

  setInterval(() => {
    roleElement.classList.add("fade-out");

    setTimeout(() => {
      index = (index + 1) % roles.length;
      roleElement.textContent = roles[index];

      roleElement.classList.remove("fade-out");
      roleElement.classList.add("fade-in");

      setTimeout(() => {
        roleElement.classList.remove("fade-in");
      }, 500);

    }, 500);

  }, 2500);
}
/* 5. LIGHT / DARK THEME */
const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("amen-portfolio-theme");

if (savedTheme === "light") {
  document.documentElement.dataset.theme = "light";
}

function updateThemeButton() {
  if (!themeToggle) return;

  const isLight =
    document.documentElement.dataset.theme === "light";

  themeToggle.innerHTML =
    `<span class="theme-icon" aria-hidden="true">${isLight ? "☾" : "☀"}</span>`;

  themeToggle.setAttribute(
    "aria-label",
    isLight ? "Switch to dark mode" : "Switch to light mode"
  );

  themeToggle.title =
    isLight ? "Switch to dark mode" : "Switch to light mode";
}

updateThemeButton();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight =
      document.documentElement.dataset.theme === "light";

    if (isLight) {
      delete document.documentElement.dataset.theme;
      localStorage.setItem("amen-portfolio-theme", "dark");
    } else {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("amen-portfolio-theme", "light");
    }

    updateThemeButton();
  });
}


/* 6. TEXT REVEAL */
const textElements = document.querySelectorAll(
  ".section-heading h2, .hero h1, .contact-panel h2"
);

textElements.forEach((element) => {
  element.classList.add("text-reveal");
});

if ("IntersectionObserver" in window) {
  const textObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("text-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  textElements.forEach((element) => textObserver.observe(element));
} else {
  textElements.forEach((element) =>
    element.classList.add("text-visible")
  );
}


/* 7. FLOATING BACKGROUND ELEMENTS */
const heroSection = document.querySelector(".hero");

if (
  heroSection &&
  !heroSection.querySelector(".floating-elements")
) {
  const floatingContainer = document.createElement("div");

  floatingContainer.className = "floating-elements";
  floatingContainer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 5; i++) {
    const shape = document.createElement("span");

    shape.className = "floating-shape";
    floatingContainer.appendChild(shape);
  }

  heroSection.prepend(floatingContainer);
}


/* 8. 3D CARD HOVER EFFECT */
const supportsHover = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (supportsHover) {
  const cards = document.querySelectorAll(
    ".project-card, .skill-card, .glass-card, .mini-card, .contact-info-card"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

     const rotateX = ((y - centerY) / centerY) * -2;
const rotateY = ((x - centerX) / centerX) * 2;

      card.style.transform =
        `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}


/* 9. MAGNETIC BUTTON EFFECT */
/* MAGNETIC BUTTON EFFECT */
if (supportsHover) {
  document.querySelectorAll(".button").forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();

      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.035}px, ${y * 0.05}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "";
    });
  });
}

/* =====================================
   ANIMATED SKILLS BARS
===================================== */

const skillMeters = document.querySelectorAll(".skill-meter");

function animateSkillBars() {
  skillMeters.forEach((meter) => {
    const level = Math.min(
      100,
      Math.max(0, Number(meter.dataset.level) || 0)
    );

    const fill = meter.querySelector(".skill-fill");

    if (fill) {
      fill.style.width = `${level}%`;
    }
  });
}

if ("IntersectionObserver" in window) {
  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const meter = entry.target;
          const level = Math.min(
            100,
            Math.max(0, Number(meter.dataset.level) || 0)
          );

          const fill = meter.querySelector(".skill-fill");

          if (fill) {
            fill.style.width = `${level}%`;
          }

          observer.unobserve(meter);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillMeters.forEach((meter) => skillObserver.observe(meter));
} else {
  animateSkillBars();
}


/* =====================================
   SMOOTH PARALLAX SCROLLING
===================================== */

const parallaxLayer = document.querySelector(".floating-elements");

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (parallaxLayer && !reduceMotion) {
  let ticking = false;

  function updateParallax() {
    const movement = Math.min(window.scrollY * 0.12, 45);

    parallaxLayer.style.setProperty(
      "--parallax-y",
      `${movement}px`
    );

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    },
    { passive: true }
  );

  updateParallax();
}
