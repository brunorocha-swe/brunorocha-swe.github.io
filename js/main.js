"use strict";

// Replace null values with your real URLs, email, and relative asset paths.
const PROFILE = {
  github: "https://github.com/brunorocha-swe",
  linkedin: "https://www.linkedin.com/in/bruno-rocha--",
  email: null,
  resume: "assets/Bruno-Rocha-Resume.pdf",
  photo: null // Example: "assets/images/bruno-rocha.webp"
};

const PROJECTS = {
  wishlist: { github: null, demo: null, architecture: null },
  access: { github: null, demo: null, architecture: null },
  orders: { github: null, demo: null, architecture: null }
};

const ARCHITECTURES = {
  wishlist: {
    title: "Smart Wishlist",
    description: "A proposed workflow for scheduled product monitoring and price-drop notifications.",
    flow: [".NET API — products and wishlist", "Scheduled jobs — trigger price checks", "Background worker — fetch prices from external APIs", "PostgreSQL — products and price history", "Notifications — report price drops"]
  },
  access: {
    title: "Building Access Management",
    description: "A proposed structure for visitor management, delivery registration, entry and exit tracking, searchable history, notifications, and a dashboard.",
    flow: ["JavaScript dashboard — concierge operations", ".NET API — visitors, residents, and deliveries", "PostgreSQL — searchable entry and exit records", "Notifications — delivery and visitor updates", "Docker — application packaging"]
  },
  orders: {
    title: "Distributed Order Processing",
    description: "A demonstration architecture connecting order intake to asynchronous processing, with MassTransit orchestrating messaging.",
    flow: ["Client — submit an order", ".NET API — accept the request", "RabbitMQ / MassTransit — publish and consume messages", "Worker — process orders asynchronously", "Redis — cache processing state", "PostgreSQL — persist order records"]
  }
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
document.querySelectorAll("a[data-project]").forEach(link => {
  configureLink(link, PROJECTS[link.dataset.project][link.dataset.link]);
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

const dialog = document.querySelector("#architecture-dialog");
let activeArchitecture = null;
function renderArchitecture(key) {
  const architecture = ARCHITECTURES[key];
  document.querySelector("#architecture-title").textContent = translate(architecture.title);
  document.querySelector("#architecture-description").textContent = translate(architecture.description);
  document.querySelector("#architecture-flow").replaceChildren(...architecture.flow.map(step => {
    const item = document.createElement("li");
    item.textContent = translate(step);
    return item;
  }));
}
document.addEventListener("languagechange", () => {
  if (dialog.open && activeArchitecture) renderArchitecture(activeArchitecture);
  requestAnimationFrame(updateScrollState);
});
document.querySelectorAll("[data-architecture]").forEach(button => {
  button.addEventListener("click", () => {
    const key = button.dataset.architecture;
    const url = PROJECTS[key].architecture;
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    activeArchitecture = key;
    renderArchitecture(key);
    dialog.showModal();
  });
});
document.querySelector("#close-dialog").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
