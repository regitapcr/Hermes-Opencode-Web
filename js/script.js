/**
 * AI Lokal — Interactive Behavior
 * No framework, vanilla JavaScript only.
 */

(function () {
  'use strict';

  // ---------- Mobile menu toggle ----------
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Toggle hamburger animation
      var spans = hamburger.querySelectorAll('span');
      if (isOpen) {
        spans.forEach(function (span, index) {
          var offset = (index === 1) ? 10 : 0;
          span.style.transform = 'translateY(' + offset + 'px) rotate(' + (index === 1 ? 45 : -45) + 'deg)';
          span.style.opacity = '0';
        });
      } else {
        spans.forEach(function (span) {
          span.style.transform = 'translateY(0) rotate(0deg)';
          span.style.opacity = '1';
        });
      }
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.querySelectorAll('span').forEach(function (span) {
          span.style.transform = 'translateY(0) rotate(0deg)';
          span.style.opacity = '1';
        });
      });
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      hamburger &&
      navLinks &&
      navLinks.classList.contains('open') &&
      !hamburger.contains(e.target) &&
      !navLinks.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.querySelectorAll('span').forEach(function (span) {
        span.style.transform = 'translateY(0) rotate(0deg)';
        span.style.opacity = '1';
      });
    }
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = anchor.getAttribute('href');
      if (targetId === '#') {
        e.preventDefault();
        return;
      }
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        var offset = 72; // header height
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---------- Contact form handler ----------
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('name').value.trim();
      var email = document.getElementById('email').value.trim();
      var message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Harap isi nama, email, dan pesan sebelum mengirim.');
        return;
      }

      // Basic email format check
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email)) {
        alert('Format email tidak valid.');
        return;
      }

      // In a real deployment this would be replaced with a
      // serverless function or backend endpoint. Nothing sensitive
      // is logged here, and no API key is stored.
      console.log('Form submitted:', { name: name, email: email, message: message });

      // Simulate submission success
      var btn = form.querySelector('.btn');
      var original = btn.textContent;
      btn.textContent = 'Pesan telah dikirim!';
      btn.disabled = true;

      setTimeout(function () {
        form.reset();
        btn.textContent = original;
        btn.disabled = false;
      }, 2500);

      // Reset button content for real submission (can be replaced)
      // Normally: fetch('/api/contact', { method: 'POST', body: new FormData(form) });
    });
  }

  // ---------- Active nav link on scroll ----------
  var sections = document.querySelectorAll('section[id]');
  var navLinksList = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 100;
    var current = '';
    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.getAttribute('id');
      }
    });
    navLinksList.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current || link.getAttribute('href') === current);
    });
  }

  if (sections.length && navLinksList.length) {
    window.addEventListener('scroll', updateActiveLink);
    // Trigger once on load
    updateActiveLink();
  }
})();
