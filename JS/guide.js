
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

// Step Navigation Active State on Scroll
const sections = document.querySelectorAll('section');
const stepItems = document.querySelectorAll('.step-item');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let current = entry.target.getAttribute('id');
            updateActiveStep(current);
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of section is visible

sections.forEach(section => sectionObserver.observe(section));

function updateActiveStep(id) {
    stepItems.forEach(item => {
        item.classList.remove('active');
        // We match indices based on order as IDs might not map directly to index
        // But here we can use a simple mapping if we add data-target to items or just index
    });

    // Simple index mapping based on ID
    if (id === 'step1') stepItems[0].classList.add('active');
    if (id === 'step2') stepItems[1].classList.add('active');
    if (id === 'step3') stepItems[2].classList.add('active');
    if (id === 'step4') stepItems[3].classList.add('active');
}

// Parallax Effect for Blobs
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.blob');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xOffset = (window.innerWidth / 2 - e.clientX) / speed;
        const yOffset = (window.innerHeight / 2 - e.clientY) / speed;

        blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
});

// Smooth Scroll Function (global scope for onclick)
window.scrollToSection = function (id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
