/* ========================================
   MASTER PORTFOLIO - JavaScript
   ======================================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ---- Typewriter effect ----
const phrases = [
  'MERN Stack Developer',
  'Full Stack Developer',
  'React Developer',
  'Node.js Developer',
  'Web Application Builder'
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');

function typeWriter() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    tw.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    tw.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 60 : 110);
}
setTimeout(typeWriter, 1200);

// ---- Back to top ----
document.getElementById('backToTop').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---- Scroll-triggered animations (AOS-like) ----
function initAOS() {
  const els = document.querySelectorAll('[data-aos]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || 0);
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        // Animate skill bars when visible
        entry.target.querySelectorAll('.bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach(el => observer.observe(el));
}
initAOS();

// ---- Skill bars triggered by parent section ----
const skillSection = document.getElementById('skills');
if (skillSection) {
  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.bar-fill').forEach(bar => {
          setTimeout(() => bar.style.width = bar.dataset.width + '%', 300);
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.2 });
  barObserver.observe(skillSection);
}

// ---- EmailJS Contact Form ----
emailjs.init('K8AN3myKOF8DI5ZrQ');

const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');

    // Loading state
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    // Must match EmailJS template variables exactly
    const templateParams = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    emailjs.send(
      'service_96q9bve',
      'template_vb8c7qn',
      templateParams
    )
    .then(function () {

      btn.innerHTML = '<i class="fas fa-check-circle"></i> Message Sent!';
      btn.style.background = '#2ecc71';
      btn.style.opacity = '1';

      form.reset();

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);

    })
    .catch(function (err) {

      console.error('EmailJS Error:', err);

      btn.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed! Try Again';
      btn.style.background = '#e74c3c';
      btn.style.opacity = '1';
      btn.disabled = false;

      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        btn.style.background = '';
      }, 4000);

    });

  });
}

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 80;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link) {
      link.style.color = (scrollY >= top && scrollY < top + height)
        ? 'var(--accent)' : '';
    }
  });
}, { passive: true });

// ---- Particle background (subtle) ----
function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particles';
  canvas.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:0;opacity:0.4;';
  document.body.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    r: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(85,179,243,0.6)';
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
    });
    // Draw connecting lines
    ctx.strokeStyle = 'rgba(85,179,243,0.08)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (dist < 120) {
          ctx.globalAlpha = 1 - dist / 120;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }
  draw();
}
createParticles();
