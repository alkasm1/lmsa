
script_js = """/* ============================================
   LAMSSA GENERAL CONTRACTING - SCRIPT
   ============================================ */

(function() {
    'use strict';

    /* ---- Preloader ---- */
    window.addEventListener('load', function() {
        const fill = document.getElementById('preloader-fill');
        if (fill) {
            fill.style.width = '100%';
            setTimeout(function() {
                const preloader = document.getElementById('preloader');
                if (preloader) preloader.classList.add('hidden');
            }, 1800);
        }
    });

    /* ---- Mobile Menu Toggle ---- */
    window.toggleMenu = function() {
        const menu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        if (!menu || !overlay) return;
        
        menu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    };

    /* ---- Close mobile menu on link click ---- */
    document.querySelectorAll('.mobile-menu-links a').forEach(function(link) {
        link.addEventListener('click', function() {
            const menu = document.querySelector('.mobile-menu');
            if (menu && menu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    /* ---- Navbar Scroll Effect ---- */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 60) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ---- Smooth Scroll for Anchor Links ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    /* ---- Scroll Animation Observer ---- */
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });

    /* ---- Counter Animation ---- */
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = parseInt(entry.target.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                const timer = setInterval(function() {
                    current += step;
                    if (current >= target) {
                        entry.target.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, 16);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(function(el) {
        counterObserver.observe(el);
    });

    /* ---- Active Nav Link on Scroll ---- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');

    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            sections.forEach(function(section) {
                const top = section.offsetTop - 120;
                if (window.scrollY >= top) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(function(link) {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + current) {
                    link.style.color = 'var(--gold)';
                }
            });
        });
    }

    /* ---- Back to Top Button ---- */
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = 'position:fixed;bottom:30px;left:30px;width:50px;height:50px;border-radius:50%;background:linear-gradient(145deg,var(--gold),var(--gold-dark));color:#fff;border:none;cursor:pointer;z-index:999;opacity:0;visibility:hidden;transition:all 0.4s ease;box-shadow:0 8px 24px rgba(201,169,110,0.35);font-size:1.1rem;display:flex;align-items:center;justify-content:center;';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* ---- Form Validation ---- */
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            let valid = true;
            const requiredFields = form.querySelectorAll('[required]');
            requiredFields.forEach(function(field) {
                if (!field.value.trim()) {
                    valid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '';
                }
            });
            if (!valid) {
                e.preventDefault();
                alert('يرجى ملء جميع الحقول المطلوبة');
            }
        });
    });

    /* ---- Parallax Effect for Hero ---- */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const particles = document.querySelectorAll('.particle');
            particles.forEach(function(p, i) {
                const speed = 0.3 + (i * 0.1);
                p.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
            });
        });
    }

    /* ---- Lazy Loading Images ---- */
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    console.log('Lamssa General Contracting - Script Loaded');

})();
"""

with open('/mnt/agents/output/script.js', 'w', encoding='utf-8') as f:
    f.write(script_js)

print("script.js created successfully!")
import os
size = os.path.getsize('/mnt/agents/output/script.js')
print(f"File size: {size} bytes")
