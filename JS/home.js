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

    // ===== Article Modal and View All Functionality =====
    const newsCards = document.querySelectorAll('.news-card');
    const articleModal = document.getElementById('articleModal');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Modal Elements
    const modalImage = document.getElementById('modalImage')?.querySelector('img');
    const modalTag = document.getElementById('modalTag');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    if (newsCards.length > 0 && articleModal && closeModalBtn) {
        newsCards.forEach(card => {
            card.addEventListener('click', (e) => {
                // Prevent click if hitting the "Read Article" link directly
                if (e.target.tagName.toLowerCase() === 'a' || e.target.closest('a')) {
                    e.preventDefault();
                }

                // Get data from the card
                const imgNode = card.querySelector('.news-image img');
                const tagNode = card.querySelector('.news-tag');
                const dateNode = card.querySelector('.news-date');
                const titleNode = card.querySelector('.news-title');
                const pNodes = card.querySelectorAll('p');

                if (imgNode && modalImage) modalImage.src = imgNode.src;
                if (tagNode && modalTag) modalTag.textContent = tagNode.textContent;
                if (dateNode && modalDate) modalDate.textContent = dateNode.textContent;
                if (titleNode && modalTitle) modalTitle.textContent = titleNode.textContent;

                if (pNodes.length > 0 && modalText) {
                    modalText.innerHTML = '';
                    pNodes.forEach(p => {
                        const clone = p.cloneNode(true);
                        clone.style.color = ''; // Remove inline style for modal
                        clone.style.fontSize = '';
                        clone.style.marginBottom = '';
                        modalText.appendChild(clone);
                    });
                }

                articleModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop background scrolling
            });
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            articleModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Click outside to close
        articleModal.addEventListener('click', (e) => {
            if (e.target === articleModal) {
                articleModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // View All button functionality
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