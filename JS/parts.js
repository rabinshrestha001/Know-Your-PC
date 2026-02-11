
// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.component-card');
const modalOverlay = document.getElementById('modal-overlay');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.component-modal');

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


// Category Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        cards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
                // Small timeout for fade effect if we wanted, but display none is instant
                setTimeout(() => card.style.opacity = '1', 50);
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    });
});


// Modal Functionality
window.openModal = function (componentId) {
    const modal = document.getElementById(`modal-${componentId}`);
    if (modal) {
        modalOverlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Event Listeners for Closing
closeButtons.forEach(btn => btn.addEventListener('click', closeModal));

// Close on overlay click
modalOverlay.addEventListener('click', closeModal);

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});
