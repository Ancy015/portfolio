/**
 * Frontend interactions for the portfolio:
 * - Hero text reveal + typing effect
 * - Animated skill rings
 * - Certificates alternating slide-in
 * - Education opposing animations
 * - Contact form submission to backend
 */
// simple left-to-right reveal
(function(){
  const slide = document.getElementById('hero');
  const text = slide.querySelector('.hero-text');
  const mock = slide.querySelector('.mockup');
  const rolesEl = slide.querySelector('.roles');

  function prep(el, dx=40, delay=0){
    el.style.opacity = 0;
    el.style.transform = `translateX(${dx}px)`;
    el.style.transition = `transform .7s cubic-bezier(.2,.8,.2,1) ${delay}ms, opacity .7s ${delay}ms`;
  }
  function show(el){
    requestAnimationFrame(()=>{ 
      el.style.opacity = 1; 
      el.style.transform = 'translateX(0)'; 
    });
  }
  prep(text, 50, 0); 
  if (mock) prep(mock, 60, 120);

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        show(text); if (mock) show(mock);
        // typing animation for roles
        if (rolesEl){
          const full = rolesEl.textContent.trim();
          rolesEl.textContent = '';
          rolesEl.classList.add('typing');
          let i = 0;
          const speed = 60; // ms per char
          const type = () => {
            if (i <= full.length){
              rolesEl.textContent = full.slice(0,i);
              i++;
              setTimeout(type, speed);
            } else {
              rolesEl.classList.remove('typing');
            }
          };
          type();
        }
        io.disconnect(); // one-time, one-direction
      }
    });
  },{threshold:.35});
  io.observe(slide);
})();
// Animated skill rings
(function(){
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

// Alternating slide-in for Certificates bars
(function(){
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

// Projects: removed extra reveal motion per user request

// Education section: image from left, text from right
(function(){
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
        setTimeout(() => card.classList.remove('is-hidden'), 800); // wait for image animation to mostly complete
        io.disconnect();
      }
    });
  }, { threshold: 0.25 });

  io.observe(section);
})();

// Contact form submission to backend
(function(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const out = await res.json();
      if (!res.ok || !out.ok) throw new Error(out.error || 'Failed to send');
      alert('Thanks! Your message has been sent.');
      if (out.previewUrl) {
        console.log('Preview (Ethereal):', out.previewUrl);
      }
      form.reset();
    } catch (err) {
      console.error(err);
      alert('Sorry, your message could not be sent. ' + (err.message ? `(${err.message})` : 'Please try again later.'));
    } finally {
      btn.disabled = false;
      btn.innerHTML = orig;
    }
  });
})();
