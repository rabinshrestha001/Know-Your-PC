document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('budget-slider');
    const output = document.getElementById('budget-output');
    const typeBtns = document.querySelectorAll('.toggle-btn');
    
    // Result elements
    const calcResult = document.getElementById('calc-result');
    const tierBadge = document.getElementById('tier-badge');
    const tierTitle = document.getElementById('tier-title');
    const tierDesc = document.getElementById('tier-desc');
    const exploreBtn = document.getElementById('explore-tier-btn');
    
    let currentType = 'desktop';

    if (typeBtns.length > 0) {
        typeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                typeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentType = btn.getAttribute('data-type');
                
                document.getElementById('alloc-type').textContent = currentType === 'desktop' ? 'Desktop Breakdown' : 'N/A for Laptops';
                updateCalculator();
            });
        });
    }

    function updateBars(gaming, prod, create) {
        // Gaming
        const bG = document.getElementById('bar-gaming');
        const vG = document.getElementById('val-gaming');
        if(bG) { bG.style.width = gaming + '%'; bG.style.background = gaming >= 70 ? '#10B981' : (gaming >= 40 ? '#F59E0B' : '#EF4444'); }
        if(vG) { vG.textContent = gaming >= 70 ? 'High' : (gaming >= 40 ? 'Medium' : 'Low'); }

        // Prod
        const bP = document.getElementById('bar-prod');
        const vP = document.getElementById('val-prod');
        if(bP) { bP.style.width = prod + '%'; bP.style.background = prod >= 70 ? '#10B981' : (prod >= 40 ? '#F59E0B' : '#EF4444'); }
        if(vP) { vP.textContent = prod >= 70 ? 'High' : (prod >= 40 ? 'Medium' : 'Low'); }

        // Create
        const bC = document.getElementById('bar-create');
        const vC = document.getElementById('val-create');
        if(bC) { bC.style.width = create + '%'; bC.style.background = create >= 70 ? '#10B981' : (create >= 40 ? '#F59E0B' : '#EF4444'); }
        if(vC) { vC.textContent = create >= 70 ? 'High' : (create >= 40 ? 'Medium' : 'Low'); }
    }

    function updateAlloc(g, c, r, b) {
        if(!document.getElementById('alloc-gpu')) return;
        document.getElementById('alloc-gpu').style.width = g + '%';
        document.getElementById('alloc-cpu').style.width = c + '%';
        document.getElementById('alloc-ram').style.width = r + '%';
        document.getElementById('alloc-board').style.width = b + '%';

        document.getElementById('lbl-gpu').textContent = g + '%';
        document.getElementById('lbl-cpu').textContent = c + '%';
        document.getElementById('lbl-ram').textContent = r + '%';
        document.getElementById('lbl-board').textContent = b + '%';
        
        if (currentType === 'laptop') {
            document.getElementById('allocation-section').style.opacity = '0.3';
            document.getElementById('allocation-section').style.pointerEvents = 'none';
        } else {
            document.getElementById('allocation-section').style.opacity = '1';
        }
    }

    function updateCalculator() {
        if (!slider) return;
        const val = parseInt(slider.value);
        if (output) output.textContent = val.toLocaleString();

        let tier = 'low';
        if (val >= 185000) tier = 'high';
        else if (val >= 90000) tier = 'mid';

        if (calcResult) {
            calcResult.style.animation = 'none';
            void calcResult.offsetWidth; 
            calcResult.style.animation = 'fadeIn 0.3s ease';
        }

        if (tier === 'low') {
            if(tierBadge) {
                tierBadge.textContent = 'Entry Level Tier';
                tierBadge.style.background = '#3B82F6'; 
            }
            if(tierTitle) tierTitle.textContent = 'Basic Productivity & Browsing';
            if(tierDesc) tierDesc.textContent = 'Perfect for students and everyday home use. Basic processing capability.';
            if(exploreBtn) exploreBtn.setAttribute('href', '#tier-low');
            
            // Calc logic depending on val and type
            let gamingP = val > 60000 ? 30 : 10;
            let prodP = val > 60000 ? 80 : 60;
            let createP = val > 60000 ? 35 : 15;
            
            updateBars(gamingP, prodP, createP);
            updateAlloc(currentType === 'desktop' ? 0 : 0, 45, 25, 30);
        } 
        else if (tier === 'mid') {
            if(tierBadge) {
                tierBadge.textContent = 'Mid-Range Value Tier';
                tierBadge.style.background = '#8B5CF6'; 
            }
            if(tierTitle) tierTitle.textContent = '1080p Gaming & Creation';
            if(tierDesc) tierDesc.textContent = 'The sweet spot for performance. Handles 1080p gaming and rendering efficiently.';
            if(exploreBtn) exploreBtn.setAttribute('href', '#tier-mid');
            
            let scaleP = (val - 90000) / 95000; // 0 to 1
            updateBars(50 + (scaleP * 30), 85 + (scaleP * 10), 45 + (scaleP * 30));
            updateAlloc(40, 20, 20, 20);
        }
        else {
            if(tierBadge) {
                tierBadge.textContent = 'High-End Enthusiast';
                tierBadge.style.background = '#EC4899'; 
            }
            if(tierTitle) tierTitle.textContent = 'Uncompromising Power';
            if(tierDesc) tierDesc.textContent = 'Capable of flawless 1440p to 4K gaming, heavy 3D rendering, and extreme multitasking.';
            if(exploreBtn) exploreBtn.setAttribute('href', '#tier-high');
            
            let scaleP = Math.min((val - 185000) / 100000, 1);
            updateBars(85 + (scaleP * 15), 95 + (scaleP * 5), 80 + (scaleP * 20));
            updateAlloc(45, 20, 15, 20);
        }
    }

    if(slider) {
        slider.addEventListener('input', updateCalculator);
        updateCalculator(); 
    }
});