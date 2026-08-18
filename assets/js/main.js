/**
 * RRL site behavior: mobile navigation, scroll state, reveal, contact form.
 * Content is in HTML so the site remains usable without JavaScript.
 */
(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var themeToggle = document.querySelector(".theme-toggle");
  var nav = document.querySelector("#site-nav");
  var navLinks = nav ? nav.querySelectorAll("a") : [];
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
  }

  function syncThemeToggle(theme) {
    if (!themeToggle) return;
    var isLight = theme === "light";
    themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  }

  function applyTheme(theme, persist) {
    var next = theme === "light" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    if (persist) {
      try {
        localStorage.setItem("theme", next);
      } catch (err) {
        /* private mode or blocked storage */
      }
    }
    syncThemeToggle(next);
  }

  syncThemeToggle(currentTheme());

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  }

  try {
    if (!localStorage.getItem("theme") && window.matchMedia) {
      var scheme = window.matchMedia("(prefers-color-scheme: light)");
      if (scheme.addEventListener) {
        scheme.addEventListener("change", function (event) {
          if (!localStorage.getItem("theme")) {
            applyTheme(event.matches ? "light" : "dark", false);
          }
        });
      }
    }
  } catch (err) {
    /* ignore */
  }

  function setNavOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setNavOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", function () {
        setNavOpen(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setNavOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") return;
      var focusable = Array.prototype.slice.call(navLinks);
      if (themeToggle) focusable.push(themeToggle);
      focusable.push(toggle);
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
  }

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var reveals = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) {
      observer.observe(el);
    });
  }

  var form = document.querySelector("#contact-form");
  var status = document.querySelector("#form-status");
  if (form && status) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      status.textContent =
        "This form is not connected to an email service yet. Please use the contact details on this page once they are published.";
    });
  }
})();
