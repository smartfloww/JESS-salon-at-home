// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const body = document.body;

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      body.classList.toggle('menu-open');
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        body.classList.remove('menu-open');
      });
    });
  }

  // Service accordions on services page
  const serviceItems = document.querySelectorAll('.service-item');
  serviceItems.forEach(function(item) {
    const header = item.querySelector('.service-item-header');
    if (header) {
      header.addEventListener('click', function() {
        // Close other items
        serviceItems.forEach(function(other) {
          if (other !== item) {
            other.classList.remove('expanded');
          }
        });
        // Toggle current
        item.classList.toggle('expanded');
      });
    }
  });

  // Scroll-based fade-in animations
  const animateElements = document.querySelectorAll('.animate-in');

  if (animateElements.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // Active nav link
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function(link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
});