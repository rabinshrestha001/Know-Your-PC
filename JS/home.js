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

    // ===== Article Modal Functionality =====
    const articleCards = document.querySelectorAll('.news-card');
    const articleModal = document.getElementById('articleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    if (articleModal && closeModalBtn) {
        const modalImg = document.querySelector('#modalImage img');
        const modalTag = document.getElementById('modalTag');
        const modalDate = document.getElementById('modalDate');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');

        articleCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent default navigation if the anchor is clicked
                if (e.target.closest('a')) {
                    e.preventDefault();
                }

                // Extract data from the clicked card
                const imgSrc = card.querySelector('.news-image img').src;
                const tag = card.querySelector('.news-tag').textContent;
                const date = card.querySelector('.news-date').textContent;
                const title = card.querySelector('.news-title').textContent;
                const desc = card.querySelector('.news-content p').textContent;

                // Populate Modal content
                if (modalImg) modalImg.src = imgSrc;
                if (modalTag) modalTag.textContent = tag;
                if (modalDate) modalDate.textContent = date;
                if (modalTitle) modalTitle.textContent = title;

                if (modalText) {
                    modalText.innerHTML = `
                        <p style="font-weight: 600; font-size: 1.1rem; color: var(--text-main); margin-bottom: 1.5rem;">${desc}</p>
                        <p>This is a detailed placeholder for the full article content. In a real-world scenario, this content could be fetched from a database or a separate HTML file based on the article's unique ID.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    `;
                }

                // Show Modal
                articleModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        // Close Modal function
        const closeModal = () => {
            articleModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        // Event listeners for closing the modal
        closeModalBtn.addEventListener('click', closeModal);

        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && articleModal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    console.log("Know Your PC: Animations Loaded 🚀");
});