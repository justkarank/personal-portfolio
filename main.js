// Motion layer: smooth scroll (Lenis) synced to ScrollTrigger, header states, section reveals and project navigation.
// The page is complete without JavaScript; under prefers-reduced-motion everything renders in its final state.
(function () {
  var root = document.documentElement;
  var reduced = root.classList.contains("reduced");
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  window.__ready = true;

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var bar = $("[data-bar]");
  var barH = function () { return bar ? bar.offsetHeight : 68; };

  var lenis = null;
  if (!reduced && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  function scrollToY(y) {
    if (lenis) lenis.scrollTo(y, { duration: 1.3, easing: function (t) { return 1 - Math.pow(1 - t, 4); } });
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  }
  var stickyMode = function () { return window.matchMedia("(min-width: 900px) and (min-height: 640px)").matches; };
  function chapterY(i) {
    var c = $$(".chapter")[i];
    if (!c) return 0;
    if (stickyMode()) return $("[data-chapters]").getBoundingClientRect().top + window.scrollY + i * c.offsetHeight;
    return c.getBoundingClientRect().top + window.scrollY - barH();
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var id = a.getAttribute("href");
    var target = id === "#top" ? document.body : $(id);
    if (!target) return;
    e.preventDefault();
    if (a.hasAttribute("data-chapter")) scrollToY(chapterY(Number(a.getAttribute("data-chapter"))));
    else if (id === "#top") scrollToY(0);
    else scrollToY(target.getBoundingClientRect().top + window.scrollY - barH());
    if (history.replaceState) history.replaceState(null, "", id === "#top" ? location.pathname : id);
    if (id !== "#top") { target.setAttribute("tabindex", "-1"); target.focus({ preventScroll: true }); }
  });

  // Header: transparent over the hero, hides while scrolling down, switches to the dark theme over the contact section
  if (bar) {
    var contact = $("#contact");
    var update = function (self) {
      var y = window.scrollY;
      bar.classList.toggle("is-top", y < 60);
      var night = false;
      if (contact) { var r = contact.getBoundingClientRect(); night = r.top <= barH() && r.bottom > barH(); }
      bar.setAttribute("data-theme", night ? "night" : "light");
      if (self) bar.classList.toggle("is-hidden", self.direction === 1 && y > 240 && !bar.contains(document.activeElement));
    };
    var progress = $(".bar__progress", bar);
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: function (self) { if (progress) gsap.set(progress, { scaleX: self.progress }); update(self); } });
    update();
    bar.addEventListener("focusin", function () { bar.classList.remove("is-hidden"); });
    ["work", "services", "about", "contact"].forEach(function (id) {
      var section = $("#" + id), link = $('[data-nav="' + id + '"]', bar);
      if (!section || !link) return;
      ScrollTrigger.create({ trigger: section, start: "top 45%", end: "bottom 45%", onToggle: function (s) { if (s.isActive) link.setAttribute("aria-current", "true"); else link.removeAttribute("aria-current"); } });
    });
  }

  if (!reduced) {
    // Hero intro, then section reveals as they enter the viewport
    gsap.to($$("[data-in]"), { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.12, delay: 0.2 });
    ScrollTrigger.batch("[data-reveal]", {
      start: "top 90%", once: true,
      onEnter: function (batch) { gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, overwrite: true }); }
    });
    // Each project's text rises in as its panel slides into place
    $$(".chapter").forEach(function (ch) {
      var st = { trigger: ch, start: "top 72%", once: true };
      gsap.from($$(".chapter__text > *", ch), { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, scrollTrigger: st });
      gsap.from($(".chapter__media img", ch), { scale: 1.08, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: st });
    });
  }

  var refresh = function () { ScrollTrigger.refresh(); if (lenis) lenis.resize(); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  window.addEventListener("load", refresh);
})();
