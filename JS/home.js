document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Toggle Logic for "First Things to Know" buttons ---
    // Updated Toggle Logic for Components/Types/Purpose
    const toggleButtons = document.querySelectorAll('.toggle-pill button');
    const tabContents = document.querySelectorAll('.tab-content');

    toggleButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Update Buttons
            toggleButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update Content
            tabContents.forEach(content => content.classList.remove('active'));
            const targetId = `content-${btn.innerText.toLowerCase()}`;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // --- 2. Quote Slider Logic (Updated) ---

    // The specific tips provided
    const tips = [
        "Always prioritize SSD over HDD for faster boot times and better performance",
        "8GB RAM is minimum for 2024, but 16GB is recommended for future-proofing",
        "Check the CPU generation - newer generations offer better performance and efficiency",
        "For gaming, dedicated GPU is essential - integrated graphics won't cut it",
        "Battery life matters more than specs if you're always on the move",
        "Read reviews from multiple sources before making your final decision",
        "Consider warranty and customer service when choosing brands",
        "Don't overspend on features you'll never use - match specs to your needs"
    ];

    let currentSlide = 0;
    const tipTextElement = document.getElementById('tip-text');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let autoSlideInterval;

    // Initialize Dots based on number of tips
    tips.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetTimer(); // Reset timer on manual click
        });
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateSlide() {
        // Fade out effect
        tipTextElement.style.opacity = '0';

        setTimeout(() => {
            tipTextElement.innerText = tips[currentSlide];
            tipTextElement.style.opacity = '1';
        }, 200); // Wait for fade out to finish slightly

        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % tips.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + tips.length) % tips.length;
        updateSlide();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlide();
    }

    // Auto Play Logic (4 seconds)
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 4000);
    }

    function resetTimer() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Event Listeners for Arrows
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    // Start the loop
    startAutoSlide();
});