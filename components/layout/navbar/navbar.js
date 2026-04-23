/* ===== Advanced Navbar Interactions ===== */

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('main-navbar');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdownItems = document.querySelectorAll('.nav-item.has-dropdown');

    // Sticky / Smart Scroll functionality
    let lastScrollY = window.scrollY;
    let ticking = false;

    function handleScroll() {
        requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;

            // Add/remove scrolled class for styling (box-shadow, slightly more opaque background)
            if (currentScrollY > 10) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Smart nav: hide on scroll down, show on scroll up
            // Don't hide if Mobile Menu is open
            if (!navMenu.classList.contains('active')) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else if (currentScrollY < lastScrollY) {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
            }

            lastScrollY = currentScrollY;
            ticking = false;
        });
    }

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (!ticking) {
                ticking = true;
                handleScroll();
            }
        });

        // Initial check on load
        handleScroll();
    }

    // Mobile Menu Toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Ensure navbar is visible when opening mobile menu
            if (navMenu.classList.contains('active')) {
                navbar.style.transform = 'translateY(0)';
            }
        });
    }

    // Mobile Dropdown Accordion
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');

        link.addEventListener('click', (e) => {
            // Only toggle accordion on strictly mobile/tablet screens
            if (window.innerWidth <= 1024) {
                e.preventDefault(); // Prevent standard link behavior to allow opening accordion
                item.classList.toggle('active-mobile');

                // Close other open accordions
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active-mobile');
                    }
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu && navMenu.classList.contains('active') && !navbar.contains(e.target)) {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');

            dropdownItems.forEach(item => {
                item.classList.remove('active-mobile');
            });
        }
    });

    // Accessibility focus handling for dropdowns on desktop
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const dropdownMenu = item.querySelector('.dropdown-menu');

        // Allow opening dropdown menu via keyboard Enter/Space
        link.addEventListener('keydown', (e) => {
            if (window.innerWidth > 1024 && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                const isExpanded = item.classList.contains('active-focus');

                // Reset all
                dropdownItems.forEach(other => other.classList.remove('active-focus'));

                if (!isExpanded) {
                    item.classList.add('active-focus');
                    item.querySelector('.dropdown-item').focus(); // Focus first item
                }
            }
        });
    });
});
