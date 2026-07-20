/* ===========================
   القائمة الجانبية للجوال
=========================== */

function toggleMenu() {
    document.querySelector('.mobile-menu').classList.toggle('active');
    document.querySelector('.overlay').classList.toggle('active');
}

/* ===========================
   عداد الإحصائيات
=========================== */

const stats = document.querySelectorAll('.stat-number');

stats.forEach(stat => {
    let target = +stat.getAttribute('data-target');
    let count = 0;

    let updateCount = () => {
        if (count < target) {
            count += Math.ceil(target / 100);
            stat.textContent = count;
            setTimeout(updateCount, 30);
        } else {
            stat.textContent = target;
        }
    };

    updateCount();
});

/* ===========================
   أنيميشن عند الظهور
=========================== */

const animatedElements = document.querySelectorAll('.animate-on-scroll');

function animateOnScroll() {
    animatedElements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();
