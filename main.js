/* main.js — portfolio interactions */
(function () {
  'use strict';

  /* ── Typed effect ──────────────────────────────────────────── */
  var phrases = [
    'Full Stack Developer',
    'Open Source Enthusiast',
    'Cloud-Native Builder',
    'Tech Explorer',
  ];
  var el = document.getElementById('typed');

  if (el) {
    var phraseIdx = 0;
    var charIdx = 0;
    var deleting = false;
    var PAUSE = 1800;
    var TYPE_SPEED = 80;
    var DELETE_SPEED = 40;

    function tick() {
      var current = phrases[phraseIdx];
      if (deleting) {
        charIdx--;
      } else {
        charIdx++;
      }

      el.textContent = current.slice(0, charIdx);

      var delay = deleting ? DELETE_SPEED : TYPE_SPEED;

      if (!deleting && charIdx === current.length) {
        deleting = true;
        delay = PAUSE;
      } else if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        delay = 300;
      }

      setTimeout(tick, delay);
    }

    /* Add blinking cursor element */
    var cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.textContent = '|';
    el.parentNode.insertBefore(cursor, el.nextSibling);

    setTimeout(tick, 600);
  }

  /* ── Sticky nav shadow ────────────────────────────────────── */
  var nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  /* ── Mobile nav toggle ────────────────────────────────────── */
  var hamburger = document.getElementById('hamburger');
  var navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    /* Close on link click */
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ── Scroll-reveal ────────────────────────────────────────── */
  var revealEls = document.querySelectorAll(
    '.section__title, .about__grid, .skills__category, ' +
    '.timeline__item, .project-card, .edu__card, .contact__lead, .contact__cards'
  );

  revealEls.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: show everything immediately */
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ── Active nav link highlight ────────────────────────────── */
  var sections = document.querySelectorAll('section[id]');
  var navLinkEls = document.querySelectorAll('.nav__links a');

  function updateActiveLink() {
    var scrollY = window.scrollY + 100;
    sections.forEach(function (section) {
      var top    = section.offsetTop;
      var height = section.offsetHeight;
      var id     = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinkEls.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

}());
