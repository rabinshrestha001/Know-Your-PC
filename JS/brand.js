document.addEventListener('DOMContentLoaded', () => {

    // ---- 1. Filter Functionality ----
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.brand-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                // Reset animation state
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';

                setTimeout(() => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || filterValue === category) {
                        card.style.display = 'flex';
                        // Trigger reflow
                        void card.offsetWidth;
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // ---- 2. 3D Tilt Effect (Premium Feel) ----
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

    // ---- 3. Background Parallax for Depth ----
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

    // ---- 4. Init Animation ----
    setTimeout(() => {
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, i * 100);
        });
    }, 500);

});
