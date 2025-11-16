// ===== Play and Pay - Main JavaScript =====
(function() {
  'use strict';

  // Global language state
  window.__pp_lang = 'fa'; // default - change to 'en' or 'de' for different default

  // Set language function
  function setLang(lang) {
    __pp_lang = lang;
    
    // Update HTML attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'fa' ? 'rtl' : 'ltr');
    
    // Update all language blocks
    document.querySelectorAll('[data-lang]').forEach(block => {
      block.querySelectorAll('.lang').forEach(langEl => {
        langEl.classList.remove('is-active');
      });
      
      const target = block.querySelector('.lang[data-i18n="' + lang + '"]');
      if (target) {
        target.classList.add('is-active');
      }
    });
    
    // Update language switcher buttons
    document.querySelectorAll('[data-lang-switch]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.langSwitch === lang);
    });
    
    // Save to localStorage
    try {
      localStorage.setItem('__pp_lang', lang);
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  // Expose setLang globally
  window.__pp_setLang = setLang;

  // Language switcher click handler
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('[data-lang-switch]');
    if (!btn) return;
    
    e.preventDefault();
    const lang = btn.dataset.langSwitch;
    if (lang) {
      setLang(lang);
    }
  });

  // Intersection Observer for reveal animations
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Initialize on DOM ready
  function init() {
    // Set initial language from localStorage or default
    try {
      const savedLang = localStorage.getItem('__pp_lang');
      if (savedLang && ['fa', 'en', 'de'].includes(savedLang)) {
        __pp_lang = savedLang;
      }
    } catch (e) {
      // Ignore localStorage errors
    }
    
    // Apply initial language
    setLang(__pp_lang);
    
    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(function(el) {
      revealObserver.observe(el);
    });
    
    // Update year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

