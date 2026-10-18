"use strict";

// Replace null values with your real URLs, email, and relative asset paths.
const PROFILE = {
  github: "https://github.com/brunorocha-swe",
  linkedin: "https://www.linkedin.com/in/bruno-rocha--",
  email: null,
  resume: "assets/Bruno-Rocha-Resume.pdf",
  photo: null // Example: "assets/images/bruno-rocha.webp"
};

function configureLink(link, value, type) {
  if (!value) {
    link.title = translate("Link not available yet");
    return;
  }
  link.href = type === "email" ? `mailto:${value}` : value;
  link.removeAttribute("aria-disabled");
  link.removeAttribute("title");
  if (type === "resume") link.setAttribute("download", "");
  if (/^https?:\/\//i.test(value)) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
}

document.querySelectorAll("[data-profile]").forEach(link => {
  const type = link.dataset.profile;
  configureLink(link, PROFILE[type], type);
});

if (PROFILE.photo) {
  const photo = document.createElement("img");
  photo.src = PROFILE.photo;
  photo.alt = "Bruno Rocha";
  photo.width = 72;
  photo.height = 72;
  photo.className = "profile-photo";
  photo.decoding = "async";
  document.querySelector(".hero-copy").prepend(photo);
}

document.querySelector("#year").textContent = new Date().getFullYear();
const header = document.querySelector("#header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", translate("Open navigation"));
  navigation.classList.remove("open");
}
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(expanded));
  menuToggle.setAttribute("aria-label", translate(expanded ? "Close navigation" : "Open navigation"));
  navigation.classList.toggle("open", expanded);
});
navigation.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && navigation.classList.contains("open")) {
    closeMenu();
    menuToggle.focus();
  }
});
document.addEventListener("click", event => {
  if (!header.contains(event.target)) closeMenu();
});
const desktopQuery = window.matchMedia("(min-width: 541px)");
desktopQuery.addEventListener("change", closeMenu);

const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href")));
let scrollScheduled = false;
function updateScrollState() {
  header.classList.toggle("scrolled", window.scrollY > 16);
  let current = null;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= 160) current = section.id;
  }
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) current = "contact";
  navLinks.forEach(link => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
  scrollScheduled = false;
}
window.addEventListener("scroll", () => {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateScrollState);
  }
}, { passive: true });
updateScrollState();

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".about-grid, .experience-layout, .stack-category, .project-card, .highlights-grid article, .github-section, .contact-grid").forEach(element => {
    element.classList.add("reveal");
    observer.observe(element);
  });
}

document.addEventListener("languagechange", () => requestAnimationFrame(updateScrollState));
