
// DOM Elements
const filterBtns = document.querySelectorAll('.filter-btn');
const grid = document.querySelector('.component-grid');
const modalOverlay = document.getElementById('modal-overlay');
const closeButtons = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.component-modal');

// Scroll Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

// Function to fetch and render parts
async function loadParts() {
    try {
        const response = await fetch('http://localhost:8000/api/parts');
        const parts = await response.json();
        
        if (grid) {
            grid.innerHTML = ''; // Clear existing static cards
            
            parts.forEach((part, index) => {
                const card = document.createElement('div');
                card.className = `component-card reveal stagger-${index % 3}`;
                card.setAttribute('data-category', part.category);
                card.onclick = () => openModal(part.slug); 
                
                // Helper to get icon based on category
                const getIcon = (cat) => {
                    const icons = {
                        'core': 'fa-microchip',
                        'visual': 'fa-image',
                        'storage': 'fa-database',
                        'power': 'fa-plug-circle-bolt'
                    };
                    return icons[cat] || 'fa-gear';
                };

                const specsHtml = part.specs ? Object.entries(part.specs).map(([key, value]) => `
                    <li><i class="fa-solid fa-circle-info"></i> ${value}</li>
                `).join('') : '';

                card.innerHTML = `
                    <div class="card-image">
                        <img src="${part.image_path}" alt="${part.name}">
                        <div class="overlay-icon"><i class="fa-solid ${getIcon(part.category)}"></i></div>
                    </div>
                    <div class="card-content">
                        <h3>${part.name}</h3>
                        <p class="role">${part.role}</p>
                        <p class="desc">${part.description}</p>
                        <ul class="specs-preview">
                            ${specsHtml}
                        </ul>
                    </div>
                    <button class="btn-explore">Explore <i class="fa-solid fa-arrow-right"></i></button>
                `;
                
                grid.appendChild(card);
                revealObserver.observe(card);
            });
        }
    } catch (error) {
        console.error('Error loading parts:', error);
    }
}

// Category Filtering (Updated to work with dynamic elements)
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');
        const cards = document.querySelectorAll('.component-card');

        cards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
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
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = 'auto';
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    loadParts();
    
    // Static reveals
    const staticReveals = document.querySelectorAll('.reveal:not(.component-card)');
    staticReveals.forEach(el => revealObserver.observe(el));
});

// Event Listeners for Closing
closeButtons.forEach(btn => btn.addEventListener('click', closeModal));
modalOverlay.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});
