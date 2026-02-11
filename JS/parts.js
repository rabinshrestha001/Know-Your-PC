
document.addEventListener('DOMContentLoaded', () => {

    // --- Filter Functionality ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const partCards = document.querySelectorAll('.part-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            partCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Trigger animation again
                    card.classList.remove('reveal');
                    void card.offsetWidth; // trigger reflow
                    card.classList.add('reveal', 'active');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- Modal / Detail View Logic ---
    const modal = document.getElementById('part-modal');
    const modalClose = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.btn-view-details');

    // Part Details Data (could be fetched, but we'll store static here for speed)
    const partDetails = {
        'cpu': {
            title: 'Central Processing Unit (CPU)',
            subtitle: 'The Brain of Your Computer',
            desc: 'The CPU executes instructions and orchestrates the data flow. It affects everything from opening applications to running complex simulations.',
            specs: [
                { label: 'Key Metrics', value: 'Cores, Threads, Clock Speed (GHz)' },
                { label: 'Leading Brands', value: 'Intel (Core i), AMD (Ryzen)' },
                { label: 'Upgrade Priority', value: 'High' }
            ],
            proTip: 'For gaming, a mid-range i5 or Ryzen 5 is often sufficient. For video editing, go for i7/i9 with more cores.'
        },
        'gpu': {
            title: 'Graphics Processing Unit (GPU)',
            subtitle: 'The Visual Powerhouse',
            desc: 'Essential for gaming, 3D rendering, and video editing. The GPU handles complex mathematical calculations needed for visuals.',
            specs: [
                { label: 'Key Metrics', value: 'VRAM, CUDA Cores, Clock Speed' },
                { label: 'Leading Brands', value: 'NVIDIA (RTX), AMD (Radeon)' },
                { label: 'Upgrade Priority', value: 'Very High (for Gamers)' }
            ],
            proTip: 'Never pair a high-end GPU with a weak CPU, or you will experience "bottlenecking".'
        },
        'ram': {
            title: 'Random Access Memory (RAM)',
            subtitle: 'Short-term Memory Workspace',
            desc: 'RAM stores data that is currently in use. More RAM allows you to run more applications simultaneously without slowing down.',
            specs: [
                { label: 'Key Metrics', value: 'Capacity (GB), Speed (MHz), Latency' },
                { label: 'Standard', value: 'DDR4 or DDR5' },
                { label: 'Upgrade Priority', value: 'Medium' }
            ],
            proTip: '16GB is the sweet spot for most users. Ensure you install sticks in dual-channel slots for speed.'
        },
        'storage': {
            title: 'Storage (SSD / NVMe)',
            subtitle: 'Long-term Data Vault',
            desc: 'Where your OS, games, and files live. Modern NVMe SSDs are significantly faster than older SATA SSDs or mechanical HDDs.',
            specs: [
                { label: 'Key Metrics', value: 'Read/Write Speed (MB/s), Capacity' },
                { label: 'Types', value: 'NVMe M.2, SATA SSD, HDD' },
                { label: 'Upgrade Priority', value: 'Medium' }
            ],
            proTip: 'Always install your Operating System on an NVMe SSD for 10-second boot times.'
        },
        'mobo': {
            title: 'Motherboard',
            subtitle: 'The Central Nervous System',
            desc: 'Connects all components together. Determines which CPU you can use and how many features (USB ports, Wi-Fi) you have.',
            specs: [
                { label: 'Key Metrics', value: 'Socket Type, Chipset, Form Factor' },
                { label: 'Sizes', value: 'ATX, Micro-ATX, Mini-ITX' },
                { label: 'Upgrade Priority', value: 'Low (unless changing CPU)' }
            ],
            proTip: 'Make sure your motherboard socket (e.g., LGA1700) matches your CPU before buying.'
        },
        'psu': {
            title: 'Power Supply Unit (PSU)',
            subtitle: 'The Heartbeat',
            desc: 'Converts wall power to clean DC power for components. A bad PSU can destroy your PC.',
            specs: [
                { label: 'Key Metrics', value: 'Wattage (W), 80+ Efficiency Rating' },
                { label: 'Modularity', value: 'Full, Semi, or Non-modular' },
                { label: 'Upgrade Priority', value: 'Critical Safety Component' }
            ],
            proTip: 'Never cheap out on a PSU. Look for "80 Plus Gold" certification.'
        },
        'cooling': {
            title: 'Cooling System',
            subtitle: 'Thermal Management',
            desc: 'Keeps components from overheating. Can be air cooling (fans/heatsinks) or liquid cooling (AIO).',
            specs: [
                { label: 'Key Metrics', value: 'TDP Rating, Noise Level (dB)' },
                { label: 'Types', value: 'Air Cooler, AIO Liquid' },
                { label: 'Upgrade Priority', value: 'Medium' }
            ],
            proTip: 'Air coolers are more reliable, but Liquid Coolers (AIO) look cleaner and cool high-end chips better.'
        },
        'screen': {
            title: 'Monitor / Display',
            subtitle: 'The Visual Output',
            desc: 'The window into your digital world. Specs define sharpness, color accuracy, and motion smoothness.',
            specs: [
                { label: 'Key Metrics', value: 'Resolution, Refresh Rate (Hz), Panel Type' },
                { label: 'Panel Types', value: 'IPS (Colors), VA (Contrast), TN (Speed)' },
                { label: 'Upgrade Priority', value: 'High' }
            ],
            proTip: 'For gaming, prioritize Refresh Rate (144Hz+). For creative work, prioritize Color Accuracy (IPS).'
        },
        'ports': {
            title: 'Ports & Connectivity',
            subtitle: 'External Interfaces',
            desc: 'USB, HDMI, DisplayPort, and Audio jacks. They determine what you can plug into your PC.',
            specs: [
                { label: 'Common Types', value: 'USB-C, USB-A, HDMI 2.1, DP 1.4' },
                { label: 'Speed', value: 'USB 3.2 Gen 2 (10Gbps+)' },
                { label: 'Upgrade Priority', value: 'N/A' }
            ],
            proTip: 'Thunderbolt / USB 4 ports allow extremely high-speed data and display output simultaneously.'
        }
    };

    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const partId = btn.getAttribute('data-part');
            const data = partDetails[partId];

            if (data) {
                // Populate Modal (Simple Text Replacement)
                document.getElementById('modal-title').innerText = data.title;
                document.getElementById('modal-subtitle').innerText = data.subtitle;
                document.getElementById('modal-desc').innerText = data.desc;
                document.getElementById('modal-protip').innerText = data.proTip;

                // Populate Specs List
                const specsList = document.getElementById('modal-specs');
                specsList.innerHTML = '';
                data.specs.forEach(spec => {
                    specsList.innerHTML += `
                        <div class="spec-row">
                            <span class="spec-label">${spec.label}</span>
                            <span class="spec-value">${spec.value}</span>
                        </div>
                    `;
                });

                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Stop scrolling
            }
        });
    });

    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'initial';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'initial';
        }
    });

    // --- Observer for Scroll Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

});
