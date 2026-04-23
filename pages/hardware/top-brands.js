document.addEventListener('DOMContentLoaded', () => {



    // ---- 2. Scroll Reveal Animation ----
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ---- 3. Filter & Search Functionality ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('brandSearch');
    const cards = document.querySelectorAll('.brand-card');

    let currentCategory = 'all';
    let currentSearch = '';

    function filterBrands() {
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardName = card.querySelector('h2').innerText.toLowerCase();
            const cardTagline = card.querySelector('.tagline').innerText.toLowerCase();

            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = cardName.includes(currentSearch) || cardTagline.includes(currentSearch);

            if (matchesCategory && matchesSearch) {
                card.style.display = 'flex';
                // Trigger reflow for animation
                void card.offsetWidth;
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
    }

    // Filter Button Click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.getAttribute('data-filter');
            filterBrands();
        });
    });

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value.toLowerCase().trim();
            filterBrands();
        });
    }

    // ---- 4. 3D Tilt Effect (Premium Feel) ----
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate rotation (clamped to small angles for classiness)
            const xRotation = -((y - rect.height / 2) / rect.height * 10);
            const yRotation = (x - rect.width / 2) / rect.width * 10;

            card.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) translateY(-5px)`;

            // Move the internal glow
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.1), transparent 70%)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.background = `radial-gradient(circle at top, rgba(255,255,255,0.05), transparent 70%)`;
            }
        });
    });

    // ---- 5. Background Parallax for Depth ----
    const glows = document.querySelectorAll('.ambient-glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        glows.forEach((glow, index) => {
            // Inverse movement for depth
            const speed = (index + 1) * 20;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            glow.style.transform = `translate(${-xOffset}px, ${-yOffset}px)`;
        });
    });

    // ---- 7. Modal Functionality ----
    const viewButtons = document.querySelectorAll('.view-btn');
    const modal = document.getElementById('brandModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const modalOverlay = document.querySelector('.modal-overlay');

    // Dummy Data (In a real app, this would come from a DB or JSON file)
    const brandData = {
        'Dell': {
            desc: "Dell is renowned for its reliability and wide range of products suitable for both business and personal use. Their XPS line is a market standard for ultrabooks.",
            bestFor: "Business & Productivity",
            popular: "XPS, Inspiron, Alienware",
            price: "NPR 40k - 300k",
            url: "https://www.dell.com"
        },
        'HP': {
            desc: "HP combines style with performance, offering sleek designs across all price points. Their Spectre and Envy series are top-tier premium choices.",
            bestFor: "Students & Home Office",
            popular: "Spectre, Envy, Pavilion",
            price: "NPR 35k - 250k",
            url: "https://www.hp.com"
        },
        'Lenovo': {
            desc: "Lenovo dominates the market with its ThinkPad legendary durability and the Legion gaming series delivering pure performance.",
            bestFor: "Durability & Value",
            popular: "ThinkPad, Legion, Yoga",
            price: "NPR 30k - 280k",
            url: "https://www.lenovo.com"
        },
        'Asus': {
            desc: "Asus pushes boundaries with innovation, especially in the OLED and gaming space with their ROG and ZenBook lineup.",
            bestFor: "Gaming & Creators",
            popular: "ROG Zephyrus, ZenBook",
            price: "NPR 45k - 400k",
            url: "https://www.asus.com"
        },
        'Acer': {
            desc: "Acer is the go-to brand for budget-conscious buyers who don't want to compromise on essential specs.",
            bestFor: "Entry Level & Budget",
            popular: "Nitro, Aspire, Predator",
            price: "NPR 35k - 200k",
            url: "https://www.acer.com"
        },
        'Apple': {
            desc: "Apple stands alone with its ecosystem and build quality. The M-series chips have revolutionized laptop efficiency and power.",
            bestFor: "Creatives & Professionals",
            popular: "MacBook Air, MacBook Pro",
            price: "NPR 120k+",
            url: "https://www.apple.com"
        },
        'MSI': {
            desc: "MSI is purely dedicated to the gaming enthusiast, offering high-refresh-rate screens and powerful cooling solutions.",
            bestFor: "Hardcore Gaming",
            popular: "Raider, Stealth, Titan",
            price: "NPR 90k - 500k",
            url: "https://www.msi.com"
        }
    };

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.brand-card');
            if (card) {
                const brandName = card.querySelector('h2').innerText;
                const tagline = card.querySelector('.tagline').innerText;
                const logoSrc = card.querySelector('img').src;
                const rating = card.querySelector('.rating-badge').innerHTML;

                // Populate Modal
                document.getElementById('modalTitle').innerText = brandName;
                document.getElementById('modalTagline').innerText = tagline;
                document.getElementById('modalLogo').src = logoSrc;
                document.getElementById('modalRating').innerHTML = rating;

                // Fill details from data
                const data = brandData[brandName] || {
                    desc: "Information currently unavailable for this brand.",
                    bestFor: "General Use",
                    popular: "Various Models",
                    price: "Standard Market Rates",
                    url: "#"
                };

                document.getElementById('modalDesc').innerText = data.desc;
                document.getElementById('modalBestFor').innerText = data.bestFor;
                document.getElementById('modalPopular').innerText = data.popular;
                document.getElementById('modalPrice').innerText = data.price;
                
                const visitSiteBtn = document.querySelector('.modal-footer a.btn');
                if (visitSiteBtn) {
                    visitSiteBtn.href = data.url;
                    visitSiteBtn.target = '_blank';
                }

                modal.classList.add('active');
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modal.classList.remove('active');
            }
        });
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });

    // ---- 8. Leaderboard Animations ----
    const statBars = document.querySelectorAll('.stat-bar .bar-fill');

    // Set width to 0 initially via JS to ensure animation plays
    statBars.forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        bar.setAttribute('data-width', targetWidth);
    });

    const leaderboardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target.querySelector('.bar-fill');
                if (bar) {
                    const target = bar.getAttribute('data-width');
                    setTimeout(() => {
                        bar.style.width = target;
                    }, 200); // Slight delay for effect
                }
            }
        });
    }, { threshold: 0.5 });

    const leaderCards = document.querySelectorAll('.leader-card');
    leaderCards.forEach(card => leaderboardObserver.observe(card));

});
