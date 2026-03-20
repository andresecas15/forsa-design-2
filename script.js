/* FORSA Design 2 — Interactions */
document.addEventListener('DOMContentLoaded', () => {
    // Navbar
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-link-cta)');
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
        let current = '';
        sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
        navLinks.forEach(l => { l.classList.toggle('active', l.getAttribute('href') === `#${current}`); });
    }, { passive: true });

    // Mobile menu
    const navToggle = document.getElementById('navToggle');
    const navLinksEl = document.getElementById('navLinks');
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinksEl.classList.toggle('open');
        document.body.style.overflow = navLinksEl.classList.contains('open') ? 'hidden' : '';
    });
    navLinksEl.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => {
        navToggle.classList.remove('active'); navLinksEl.classList.remove('open'); document.body.style.overflow = '';
    }));

    // Scroll animations
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const d = parseInt(e.target.dataset.delay) || 0;
                setTimeout(() => e.target.classList.add('visible'), d);
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // Counters
    function animateCounter(el) {
        const target = parseInt(el.dataset.count), duration = 2000, start = performance.now();
        function step(now) {
            const p = Math.min((now - start) / duration, 1);
            el.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    const counterObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); counterObs.unobserve(e.target); } });
    }, { threshold: 0.5 });
    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            e.preventDefault();
            const t = document.querySelector(a.getAttribute('href'));
            if (t) window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
        });
    });

    // Form
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Enviando...</span> <i class="fas fa-spinner fa-spin"></i>';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = '<span>¡Enviado!</span> <i class="fas fa-check"></i>';
            btn.style.background = '#00b894'; btn.style.color = '#fff';
            setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.style.color = ''; btn.disabled = false; form.reset(); }, 3000);
        }, 1500);
    });
});
