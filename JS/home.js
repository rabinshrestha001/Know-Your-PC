document.addEventListener('DOMContentLoaded', () => {

    // ===== Mobile Menu Toggle =====
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Scroll Reveal Animation =====
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target); // Reveal once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));



    // ===== 3D Tilt Effect for Hero Card =====
    const heroSection = document.querySelector('.hero');
    const heroStack = document.querySelector('.hero-card-stack');
    const cardMain = document.querySelector('.card-main');

    if (heroSection && heroStack && window.innerWidth > 1024) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            // Subtle tilt
            heroStack.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        heroSection.addEventListener('mouseenter', () => {
            heroStack.style.transition = 'none';
        });

        heroSection.addEventListener('mouseleave', () => {
            heroStack.style.transition = 'transform 0.5s ease';
            heroStack.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // ===== Parallax Effect for Blobs =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const blobs = document.querySelectorAll('.blob');

        blobs.forEach((blob, index) => {
            const speed = (index + 1) * 0.1;
            blob.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // ===== Button Ripple Effect =====
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            let x = e.clientX - e.target.offsetLeft;
            let y = e.clientY - e.target.offsetTop;

            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            this.appendChild(ripples);

            setTimeout(() => {
                ripples.remove()
            }, 1000);
        });
    });

    // ===== View All button functionality =====
    const viewAllBtn = document.getElementById('viewAllBtn');
    const extraArticles = document.querySelectorAll('.news-card.hidden-article');

    if (viewAllBtn && extraArticles.length > 0) {
        viewAllBtn.addEventListener('click', function () {
            let isShowingAll = this.classList.contains('showing-all');

            if (isShowingAll) {
                // Hide extra articles
                extraArticles.forEach(card => card.classList.add('hidden-article'));
                this.textContent = 'View All Articles';
                this.classList.remove('showing-all');
                document.querySelector('.news-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
                // Show extra articles
                extraArticles.forEach(card => card.classList.remove('hidden-article'));
                this.textContent = 'Show Less Articles';
                this.classList.add('showing-all');
            }
        });
    }

    console.log("Know Your PC: Animations Loaded 🚀");
});