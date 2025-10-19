/**
 * Frontend interactions for the portfolio:
 * - Mobile hamburger menu toggle
 * - Hero text reveal + typing effect
 * - Animated skill rings
 * - Certificates alternating slide-in
 * - Education opposing animations
 * - Contact form submission to backend
 */

// ===========================
// Hamburger Menu Toggle
// ===========================
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      
      // Change icon when menu is open
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
    
    // Close menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove('open');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  }
});

// ===========================
// Hero Section Animations
// ===========================
(function() {
  const slide = document.getElementById('hero');
  if (!slide) return;
  
  const text = slide.querySelector('.hero-text');
  const mock = slide.querySelector('.mockup');
  const rolesEl = slide.querySelector('.roles');

  function prep(el, dx = 40, delay = 0) {
    if (!el) return;
    el.style.opacity = 0;
    el.style.transform = `translateX(${dx}px)`;
    el.style.transition = `transform .7s cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity .7s ${delay}ms`;
  }

  function show(el) {
    if (!el) return;
    requestAnimationFrame(() => { 
      el.style.opacity = 1; 
      el.style.transform = 'translateX(0)'; 
    });
  }

  prep(text, 50, 0); 
  if (mock) prep(mock, 60, 120);

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        show(text);
        if (mock) show(mock);
        
        // Typing animation for roles
        if (rolesEl) {
          const full = rolesEl.textContent.trim();
          rolesEl.textContent = '';
          rolesEl.classList.add('typing');
          let i = 0;
          const speed = 60; // ms per char
          const type = () => {
            if (i <= full.length) {
              rolesEl.textContent = full.slice(0, i);
              i++;
              setTimeout(type, speed);
            } else {
              rolesEl.classList.remove('typing');
            }
          };
          type();
        }
        io.disconnect();
      }
    });
  }, { threshold: 0.35 });

  io.observe(slide);
})();

// ===========================
// Animated Skill Rings
// ===========================
(function() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;
  
  const rings = skillsSection.querySelectorAll('.ring');
  let animated = false;

  const animateRing = (ring, targetPct, delay) => {
    setTimeout(() => {
      const duration = 1200; // 1.2 seconds
      const startTime = performance.now();
      const startPct = 0;
      
      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (cubic-bezier approximation)
        const easeProgress = progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        
        const currentPct = startPct + (targetPct - startPct) * easeProgress;
        ring.style.setProperty('--pct', currentPct.toFixed(2));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }, delay);
  };

  const animateRings = () => {
    rings.forEach((ring, idx) => {
      const pct = parseInt(ring.getAttribute('data-pct')) || 0;
      ring.style.setProperty('--pct', '0');
      animateRing(ring, pct, idx * 80);
    });
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        animateRings();
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(skillsSection);

  // Interactive click/hover to highlight skill rings
  rings.forEach(ring => {
    ring.addEventListener('click', () => {
      rings.forEach(r => r.classList.remove('active'));
      ring.classList.add('active');
    });
    ring.addEventListener('mouseenter', () => {
      rings.forEach(r => r.classList.remove('active'));
      ring.classList.add('active');
    });
  });
})();

// ===========================
// Certificates Alternating Slide-in
// ===========================
(function() {
  const section = document.getElementById('certificates');
  if (!section) return;
  
  const items = section.querySelectorAll('.cert-item');
  if (!items.length) return;

  // Prepare: alternate directions and hide
  items.forEach((el, idx) => {
    el.classList.add('is-hidden');
    if (idx % 2 === 0) {
      el.classList.add('from-right');
    } else {
      el.classList.add('from-left');
    }
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const visibleItems = Array.from(items);
        visibleItems.forEach((el, i) => {
          setTimeout(() => {
            el.classList.remove('is-hidden');
            el.classList.add('show');
          }, i * 260);
        });
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });

  io.observe(section);
})();

// ===========================
// Education Section Animations
// ===========================
(function() {
  const section = document.getElementById('education');
  if (!section) return;
  
  const photo = section.querySelector('.side-photo');
  const card = section.querySelector('.card-dark');
  if (!photo || !card) return;

  // Initially hide both elements
  photo.classList.add('is-hidden');
  card.classList.add('is-hidden');

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Remove the hidden class to trigger the animation
        setTimeout(() => photo.classList.remove('is-hidden'), 0);
        setTimeout(() => card.classList.remove('is-hidden'), 200);
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });

  io.observe(section);
})();

// ===========================
// Contact Form Submission (EmailJS)
// ===========================
(function() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  // GitHub Copilot, integrate EmailJS to send messages from this contact form.
  // Steps:
  // 1. Import emailjs from '@emailjs/browser' (loaded via CDN below).
  // 2. When the form is submitted, use emailjs.sendForm() with service ID, template ID, and public key.
  // 3. Show an alert "Message sent successfully!" on success and "Failed to send message" on error.
  // 4. Reset the form after sending.
  // Email destination: ancy15106@gmail.com

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    // Replace these with your EmailJS credentials:
    const SERVICE_ID = 'YOUR_SERVICE_ID';      // Get from EmailJS dashboard
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';    // Get from EmailJS dashboard
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';      // Get from EmailJS dashboard

    // Send email using EmailJS
    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)
      .then(() => {
        alert('✅ Message sent successfully! I\'ll get back to you soon.');
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        alert('❌ Failed to send message. Please try again or email me directly at ancy15106@gmail.com');
      })
      .finally(() => {
        btn.disabled = false;
        btn.innerHTML = orig;
      });
  });
})();
