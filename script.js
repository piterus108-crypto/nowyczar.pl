const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".main-nav a");
const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxTriggers = document.querySelectorAll(".lightbox-trigger");
const revealItems = document.querySelectorAll(".reveal");

if (toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "Zamknij" : "Menu";
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    toggle?.setAttribute("aria-expanded", "false");
    if (toggle) {
      toggle.textContent = "Menu";
    }
  });
});

const closeLightbox = () => {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
  lightboxImage.alt = "";
  document.body.classList.remove("lightbox-open");
};

lightboxTriggers.forEach((trigger) => {
  trigger.addEventListener("click", () => {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = trigger.dataset.full || "";
    lightboxImage.alt = trigger.dataset.alt || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
    lightboxClose?.focus();
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
