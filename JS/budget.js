// Budget Calculator Logic
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('budget-slider');
    const output = document.getElementById('budget-output');

    // Result elements
    const calcResult = document.getElementById('calc-result');
    const tierBadge = document.getElementById('tier-badge');
    const tierTitle = document.getElementById('tier-title');
    const tierDesc = document.getElementById('tier-desc');
    const expectationList = document.getElementById('expectation-list');
    const exploreBtn = document.getElementById('explore-tier-btn');

    // Content definitions for tiers
    const tiers = {
        low: {
            className: 'badge-blue',
            badge: 'Entry Level Tier',
            title: 'Basic Productivity & Browsing',
            desc: 'Perfect for students and everyday home use. Expect swift document editing and reliable web browsing without dedicated gaming capabilities.',
            expectations: [
                '<li><i class="fa-solid fa-check text-green"></i> Smooth MS Office Experience</li>',
                '<li><i class="fa-solid fa-check text-green"></i> Fast 1080p Web Browsing</li>',
                '<li><i class="fa-solid fa-xmark text-red"></i> Modern AAA Gaming</li>'
            ],
            targetLink: '#tier-low'
        },
        mid: {
            className: 'badge-blue',
            badge: 'Mid-Range Tier',
            title: '1080p Gaming & Creation',
            desc: 'The sweet spot for value. Great for seamless 1080p gaming, moderate video editing, and heavy multitasking applications.',
            expectations: [
                '<li><i class="fa-solid fa-check text-green"></i> 60FPS+ in 1080p Gaming</li>',
                '<li><i class="fa-solid fa-check text-green"></i> 4K Video Editing (Basic Timelines)</li>',
                '<li><i class="fa-solid fa-xmark text-red"></i> 4K Native Gaming</li>'
            ],
            targetLink: '#tier-mid'
        },
        high: {
            className: 'badge-blue',
            badge: 'High-End Tier',
            title: 'Enthusiast Performance',
            desc: 'Uncompromising power. Capable of flawless 1440p gaming, heavy 3D rendering, and future-proofed with the latest DDR5 RAM architectures.',
            expectations: [
                '<li><i class="fa-solid fa-check text-green"></i> 1440p / 4K Gaming on High Settings</li>',
                '<li><i class="fa-solid fa-check text-green"></i> Advanced 3D Rendering</li>',
                '<li><i class="fa-solid fa-check text-green"></i> Longevity (3-5 Years before upgrade)</li>'
            ],
            targetLink: '#tier-high'
        }
    };

    function updateCalculator() {
        if (!slider) return;
        const val = parseInt(slider.value);
        // Format number with commas
        if (output) output.textContent = val.toLocaleString();

        let currentTier = val < 90000 ? tiers.low : (val < 185000 ? tiers.mid : tiers.high);

        if (calcResult) {
            // trigger fade animation
            calcResult.style.animation = 'none';
            void calcResult.offsetWidth; // trigger reflow
            calcResult.style.animation = 'fadeIn 0.3s ease';
        }

        if (tierBadge) {
            tierBadge.textContent = currentTier.badge;
            // set background color logic
            if (val < 90000) { tierBadge.style.background = '#3B82F6'; tierBadge.style.color = 'white'; }
            else if (val < 185000) { tierBadge.style.background = '#8B5CF6'; tierBadge.style.color = 'white'; }
            else { tierBadge.style.background = '#EC4899'; tierBadge.style.color = 'white'; }
        }

        if (tierTitle) tierTitle.textContent = currentTier.title;
        if (tierDesc) tierDesc.textContent = currentTier.desc;
        if (expectationList) expectationList.innerHTML = currentTier.expectations.join('');
        if (exploreBtn) exploreBtn.setAttribute('href', currentTier.targetLink);
    }

    if (slider) {
        slider.addEventListener('input', updateCalculator);
        updateCalculator(); // init
    }
});
