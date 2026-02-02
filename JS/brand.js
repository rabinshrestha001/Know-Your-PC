function filterBrands(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const grid = document.getElementById('brandsGrid');
    const cards = grid.querySelectorAll('.brand-card');

    // Animate removal
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
    });

    setTimeout(() => {
        let visibleCount = 0;
        cards.forEach(card => {
            if (card.getAttribute('data-category') === category || category === 'all') {
                card.style.display = 'block'; // Changed from flex to block/grid item behavior
                // Trigger staggered entrance
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                }, 50 * visibleCount);
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
    }, 300);
}

// Initial Animation on Load
document.addEventListener('DOMContentLoaded', () => {
    // Animate Brand Cards
    const cards = document.querySelectorAll('.brand-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease-out';
        }, 100 * index);
    });

    // Scroll reveal for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s ease-out';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Elements to observe
    document.querySelectorAll('.sold-card, .choice-box, .section-title').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        observer.observe(el);
    });
});
