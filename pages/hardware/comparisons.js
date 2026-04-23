// DOM Elements
const controlBtns = document.querySelectorAll('.control-btn');
const views = document.querySelectorAll('.comparison-view');
const revealElements = document.querySelectorAll('.reveal');

// 1. Tab Switching Logic
window.switchTab = function (tabId) {
    // Update Buttons
    controlBtns.forEach(btn => {
        btn.classList.remove('active');
        // Check if the button's onclick attribute matches the tabId
        if (btn.getAttribute('onclick').includes(tabId)) {
            btn.classList.add('active');
        }
    });

    // Hide all views first
    views.forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none'; // Ensure it's hidden from flow
    });

    // Show selected view with animation
    const selectedView = document.getElementById(tabId);
    if (selectedView) {
        selectedView.style.display = 'block';
        // Small timeout to allow display:block to apply before adding class for transition
        setTimeout(() => {
            selectedView.classList.add('active');
            // Re-trigger animations for elements inside the new view
            triggerAnimations(selectedView);
        }, 10);
    }
}

// 2. Scroll Animation Observer
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');

            // If the element contains progress bars, animate them
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach(bar => {
                // Get the width from style attribute and re-apply it to trigger transition
                // We might need to reset it first if it was already shown
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
        }
    });
}, { threshold: 0.1 });

// Observe all reveal elements
revealElements.forEach(el => revealObserver.observe(el));

// Function to manually trigger animations for a container (used on tab switch)
function triggerAnimations(container) {
    const freshReveals = container.querySelectorAll('.reveal');
    freshReveals.forEach((el, index) => {
        el.classList.remove('active');
        // Stagger the animation re-entry
        setTimeout(() => {
            el.classList.add('active');
        }, index * 100);
    });
}

// Initial Animation Trigger for the default active tab
document.addEventListener('DOMContentLoaded', () => {
    const activeView = document.querySelector('.comparison-view.active');
    if (activeView) {
        triggerAnimations(activeView);
    }
});
