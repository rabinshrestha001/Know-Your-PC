// Main functionality for Buying Guide

document.addEventListener('DOMContentLoaded', () => {
    // Tab switching logic for Recommendations
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.rec-tab-pane');

    if (tabBtns.length > 0 && tabPanes.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => {
                    p.classList.remove('active');
                    p.style.display = 'none';
                });

                // Add active class to clicked button
                btn.classList.add('active');

                // Show corresponding pane
                const targetId = btn.getAttribute('data-target') + '_pane';
                const targetPane = document.getElementById(targetId);

                if (targetPane) {
                    targetPane.style.display = 'block';
                    // Small timeout to allow display:block to apply before adding opacity class
                    setTimeout(() => targetPane.classList.add('active'), 10);
                }
            });
        });
    }

    // Smooth Scrolling for Action Buttons
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    for (let item of scrollLinks) {
        item.addEventListener('click', (e) => {
            let hashval = item.getAttribute('href')
            let target = document.querySelector(hashval)

            if (target) {
                e.preventDefault()
                // Compensate for fixed navbar
                let position = target.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: position,
                    behavior: 'smooth'
                })
            }
        })
    }
});
