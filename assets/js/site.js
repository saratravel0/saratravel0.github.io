(function () {
  "use strict";

  const header = document.querySelector("#site-header");
  const nav = document.querySelector("#site-nav");
  const menuButton = document.querySelector(".menu-toggle");
  const backToTop = document.querySelector(".back-to-top");
  const year = document.querySelector("#current-year");
  const latestPlayer = document.querySelector(".latest-player");
  const latestFrame = latestPlayer?.querySelector("iframe");
  const latestFallback = latestPlayer?.querySelector(".latest-player-fallback");
  const gallery = document.querySelector("[data-gallery]");

  // Pages CMS edits this data file. Keep the gallery already present in the
  // HTML as a graceful fallback if the file cannot be loaded.
  async function loadGallery() {
    if (!gallery) return;

    try {
      const response = await fetch("content/gallery.json", { cache: "no-cache" });
      if (!response.ok) throw new Error(`Gallery request failed: ${response.status}`);

      const entries = await response.json();
      if (!Array.isArray(entries) || entries.length === 0) return;

      const cards = document.createDocumentFragment();

      entries.forEach(function (entry) {
        if (!entry || typeof entry.image !== "string" || !entry.image.trim()) return;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const caption = document.createElement("figcaption");
        const location = document.createElement("span");
        const title = document.createElement("strong");
        const imagePath = entry.image.trim();

        figure.className = "story-card";
        image.src = /^(?:https?:|data:|blob:)/i.test(imagePath)
          ? imagePath
          : imagePath.replace(/^\/+/, "");
        image.alt = typeof entry.alt === "string" ? entry.alt : "";
        image.loading = "lazy";
        location.textContent = typeof entry.location === "string" ? entry.location : "";
        title.textContent = typeof entry.caption === "string" ? entry.caption : "";

        caption.append(location, title);
        figure.append(image, caption);
        cards.append(figure);
      });

      if (cards.childNodes.length > 0) gallery.replaceChildren(cards);
    } catch (error) {
      console.warn("The editable gallery could not be loaded; using the built-in gallery.", error);
    }
  }

  loadGallery();

  // YouTube rejects embeds opened directly from file:// because there is no
  // HTTP referrer (error 153). Use the live player over HTTP/HTTPS and show a
  // clean link-based fallback when someone double-clicks index.html locally.
  if (latestFrame) {
    const isServedPage = window.location.protocol === "http:" || window.location.protocol === "https:";

    if (isServedPage) {
      latestFrame.src = latestFrame.dataset.src;
    } else {
      latestFrame.hidden = true;
      latestFallback?.removeAttribute("hidden");
      latestPlayer?.classList.add("showing-fallback");
    }
  }

  function setScrolledState() {
    const isScrolled = window.scrollY > 24;
    header?.classList.toggle("scrolled", isScrolled);
    backToTop?.classList.toggle("visible", window.scrollY > 520);
  }

  function closeMenu() {
    nav?.classList.remove("open");
    header?.classList.remove("nav-visible");
    document.body.classList.remove("nav-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Open menu");
  }

  menuButton?.addEventListener("click", function () {
    const willOpen = !nav?.classList.contains("open");
    nav?.classList.toggle("open", willOpen);
    header?.classList.toggle("nav-visible", willOpen);
    document.body.classList.toggle("nav-open", willOpen);
    menuButton.setAttribute("aria-expanded", String(willOpen));
    menuButton.setAttribute("aria-label", willOpen ? "Close menu" : "Open menu");
  });

  nav?.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth >= 992) closeMenu();
  });

  window.addEventListener("scroll", setScrolledState, { passive: true });
  setScrolledState();

  backToTop?.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  if (year) year.textContent = String(new Date().getFullYear());

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".site-nav a[href^='#']");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -58%", threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();
