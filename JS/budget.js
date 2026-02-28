document.addEventListener('DOMContentLoaded', () => {
    // Budget Guide Data
    const budgetData = {
        '50k': {
            title: 'Foundational Tech',
            subtitle: 'Perfect for students & basic office excellence',
            color: '#10B981',
            laptop: {
                name: 'Essential Student Laptop',
                image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
                specs: ['Intel Core i3 / AMD Ryzen 3 (12th Gen+)', '8GB DDR4 RAM', '512GB NVMe SSD', 'FHD IPS Anti-glare Display', '720p HD Webcam'],
                bestFor: ['Academic Research', 'Document Processing', 'Virtual Meetings', 'Entertainment Streaming'],
                proTips: ['Prioritize SSD over high CPU clock speed for daily tasks.', '8GB RAM is the absolute minimum for Windows 11.', 'Check for backlit keyboard if you study at night.'],
                tipClass: 'emerald'
            },
            desktop: {
                name: 'Pro-Office Workstation',
                image: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&q=80&w=800',
                specs: ['AMD Ryzen 3 4300G (APU)', '8GB 3200MHz RAM', '256GB SSD + 1TB HDD', 'Custom Micro-ATX Case', '450W Bronze PSU'],
                bestFor: ['Tally & Accounting', 'Data Entry', 'Store Management', 'High-speed Browsing'],
                proTips: ['Desktops at this price offer 2-3x better durability than laptops.', 'APUs allow for decent graphics without a dedicated card.', 'Built-in Wi-Fi is rarely included, buy a dongle.'],
                tipClass: 'slate'
            }
        },
        '80k': {
            title: 'Modern Professional',
            subtitle: 'The sweet spot for productivity and speed',
            color: '#3B82F6',
            laptop: {
                name: 'Business Elite Laptop',
                image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800',
                specs: ['Intel Core i5 / Ryzen 5 (Latest Gen)', '16GB DDR4 RAM (Dual Channel)', '512GB Gen4 SSD', 'Precision Glass Trackpad', 'Fingerprint Security'],
                bestFor: ['Professional Multitasking', 'Financial Modeling', 'Light Photo Editing', 'Corporate Productivity'],
                proTips: ['16GB RAM is essential for Chrome users with 20+ tabs.', 'IPS panels offer significantly better colors than TN panels.', 'Look for USB-C PD charging for universal compatibility.'],
                tipClass: 'blue'
            },
            desktop: {
                name: 'Content Creator Starter',
                image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800',
                specs: ['Intel Core i5-12400F', '16GB 3600MHz RAM', '512GB NVMe SSD', 'NVIDIA GTX 1650 4GB', 'Airflow Mesh Chassis'],
                bestFor: ['FHD Video Editing (1080p)', 'Adobe Creative Suite', 'Entry-level Gaming', 'Digital Marketing'],
                proTips: ['The "F" in Intel CPUs means you MUST have a graphic card.', 'Invest in a decent cooler to prevent thermal throttling.', 'Dual-channel RAM increases performance by up to 15%.'],
                tipClass: 'indigo'
            }
        },
        '120k': {
            title: 'Performance Powerhouse',
            subtitle: 'High-octane gaming and creative mastery',
            color: '#A855F7',
            laptop: {
                name: 'Stealth Gaming Laptop',
                image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&q=80&w=800',
                specs: ['Intel Core i7 / Ryzen 7 (H-Series)', '16GB DDR5 4800MHz RAM', '512GB Gen4 SSD', 'NVIDIA RTX 4050 6GB', '144Hz High-Refresh Screen'],
                bestFor: ['AAA Gaming at High Settings', '4K Video Editing', '3D Modeling (Blender)', 'Heavy Dev Workloads'],
                proTips: ['RTX 4050 supports DLSS 3 frame generation for smoother FPS.', 'Gaming laptops MUST be plugged in to get full performance.', 'High refresh rate (144Hz) makes windows feel twice as fast.'],
                tipClass: 'purple'
            },
            desktop: {
                name: 'The Battle-Station',
                image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&q=80&w=800',
                specs: ['AMD Ryzen 5 5600X / Intel i5-13400', '16GB RGB 3600MHz RAM', '1TB NVMe SSD', 'NVIDIA RTX 4060 8GB', '650W Gold Rated PSU'],
                bestFor: ['Competitive eSports (Valorant/CS2)', 'Streaming on Twitch/YT', 'VFX & Animation', '2K Gaming'],
                proTips: ['Mechanical keyboards are a must-pair for this build.', 'Ensure your case has at least 3 intake fans for the GPU.', 'NVENC encoder on RTX cards makes streaming weightless on CPU.'],
                tipClass: 'fuchsia'
            }
        },
        '160k': {
            title: 'Ultimate Enthusiast',
            subtitle: 'Uncompromising power for the elite 1%',
            color: '#F97316',
            laptop: {
                name: 'Nebula Workstation',
                image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800',
                specs: ['Core i9-13980HX / Ryzen 9', '32GB DDR5 RAM', '2TB RAID 0 SSD Storage', 'NVIDIA RTX 4070/4080 8GB+', 'QHD+ 100% DCI-P3 Display'],
                bestFor: ['AI & Machine Learning', 'Professional Rendering', '8K Video Production', 'VR Development'],
                proTips: ['32GB RAM is the new standard for professional workstation laptops.', 'QHD resolution is significantly sharper than FHD on 16" screens.', 'Look for vapor chamber cooling to handle the i9 heat.'],
                tipClass: 'orange'
            },
            desktop: {
                name: 'The Titan Rig',
                image: 'https://images.unsplash.com/photo-1616057912444-2f22fa1b5940?auto=format&fit=crop&q=80&w=800',
                specs: ['AMD Ryzen 9 7900X', '32GB DDR5 6000MHz RAM', '2TB Gen5 High-Speed SSD', 'NVIDIA RTX 4070 Ti / 4080', '360mm AIO Liquid Cooling'],
                bestFor: ['Heavy AI Training', 'Architectural Visualization', 'Max-Settings 4K Gaming', 'Professional Studio Work'],
                proTips: ['DDR5 6000MHz is the "Sweet Spot" for Ryzen 7000 series.', 'A liquid cooler (AIO) is highly recommended for high-end CPUs.', 'Get a 1000W PSU to ensure future GPU upgrade headroom.'],
                tipClass: 'rose'
            }
        }
    };

    const budgetTabs = document.querySelectorAll('.budget-tab');
    const contentArea = document.getElementById('budgetContent');

    function renderContent(budgetKey) {
        const data = budgetData[budgetKey];
        if (!data) return;

        // Create HTML structure for dynamic injection
        const html = `
            <div class="budget-content-block">
                <div class="selected-budget-header" data-aos="fade-down">
                    <span class="tier-badge" style="background: ${data.color}20; color: ${data.color};">
                        ${budgetKey === '50k' ? 'Starter' : budgetKey === '80k' ? 'Pro' : budgetKey === '120k' ? 'Elite' : 'Ultimate'} Tier
                    </span>
                    <h2 class="selected-budget-title">${data.title}</h2>
                    <p class="selected-budget-subtitle">${data.subtitle}</p>
                </div>

                <div class="product-grid">
                    <!-- Laptop Box -->
                    <div class="product-card reveal active">
                        <div class="product-image-box">
                            <img src="${data.laptop.image}" alt="${data.laptop.name}">
                            <div class="product-info-overlay">
                                <span class="device-tag">Laptop</span>
                                <h4 class="product-name">${data.laptop.name}</h4>
                            </div>
                        </div>
                        <div class="product-details">
                            <div class="detail-section">
                                <h4 class="spec-header"><i class="fa-solid fa-microchip"></i> Tech Specs</h4>
                                <ul class="specs-list">
                                    ${data.laptop.specs.map(s => `<li><i class="fa-solid fa-check"></i> ${s}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="detail-section">
                                <h4 class="spec-header"><i class="fa-solid fa-bullseye"></i> Target Use</h4>
                                <div class="use-tags">
                                    ${data.laptop.bestFor.map(u => `<span class="use-pill">${u}</span>`).join('')}
                                </div>
                            </div>
                            <div class="pro-tips-premium ${data.laptop.tipClass}">
                                <div class="tip-header"><i class="fa-solid fa-wand-magic-sparkles"></i> Advisor Insight</div>
                                <ul class="tips-list">
                                    ${data.laptop.proTips.map(t => `<li>${t}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <!-- Desktop Box -->
                    <div class="product-card reveal active">
                        <div class="product-image-box" style="background: #F1F5F9;">
                            <img src="${data.desktop.image}" alt="${data.desktop.name}">
                            <div class="product-info-overlay">
                                <span class="device-tag">Desktop</span>
                                <h4 class="product-name">${data.desktop.name}</h4>
                            </div>
                        </div>
                        <div class="product-details">
                            <div class="detail-section">
                                <h4 class="spec-header"><i class="fa-solid fa-memory"></i> Build Configuration</h4>
                                <ul class="specs-list">
                                    ${data.desktop.specs.map(s => `<li><i class="fa-solid fa-check"></i> ${s}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="detail-section">
                                <h4 class="spec-header"><i class="fa-solid fa-rocket"></i> Best Capability</h4>
                                <div class="use-tags">
                                    ${data.desktop.bestFor.map(u => `<span class="use-pill">${u}</span>`).join('')}
                                </div>
                            </div>
                            <div class="pro-tips-premium ${data.desktop.tipClass}">
                                <div class="tip-header"><i class="fa-solid fa-lightbulb"></i> Hardware Advice</div>
                                <ul class="tips-list">
                                    ${data.desktop.proTips.map(t => `<li>${t}</li>`).join('')}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        contentArea.innerHTML = html;
    }

    // Tab interaction
    budgetTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            budgetTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.dataset.budget;
            renderContent(key);
        });
    });

    // Initial load
    renderContent('50k');
});
