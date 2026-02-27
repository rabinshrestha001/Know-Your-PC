document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    // Simulate database lookup of articles based on what was existing in the HTML
    const articleDatabase = {
        '1': {
            title: "The Ultimate 1080p Gaming Build under NPR 80,000",
            tag: "Guides",
            date: "Feb 10, 2026",
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2670&auto=format&fit=crop",
            content: `
                <p>We picked the best value components to play modern AAA games at high settings without breaking the bank.</p>
                <h3>Why 1080p Gaming is Still Relevant</h3>
                <p>Despite the push for 4K and 1440p resolutions, 1080p remains the most popular resolution among gamers worldwide. It offers a perfect balance of crisp visuals and high frame rates.</p>
                <p>Building a PC capable of handling this resolution powerfully is more cost-effective than ever.</p>
                <h3>Component Breakdown</h3>
                <ul>
                    <li><strong>CPU:</strong> Options like the Intel i5 12400F or Ryzen 5 5600 give exceptional value.</li>
                    <li><strong>GPU:</strong> The AMD Radeon RX 6600 or NVIDIA RTX 3060 perfectly match 1080p target resolution.</li>
                    <li><strong>RAM:</strong> 16GB of DDR4 memory running at 3200MHz is the sweet spot.</li>
                    <li><strong>Storage:</strong> A 1TB NVMe SSD ensures fast load times.</li>
                </ul>
                <p>In our tests, this combination achieves an average of 90+ FPS on Ultra settings in demanding games like Cyberpunk 2077.</p>
            `
        },
        '2': {
            title: "NVIDIA RTX 50-Series: What We Know So Far",
            tag: "News",
            date: "Feb 08, 2026",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop",
            content: `
                <p>Leaks suggest a massive performance jump. Here is everything we know about release dates and pricing.</p>
                <h3>The Architecture Leap</h3>
                <p>The upcoming 50-series built on the new Blackwell architecture is rumored to deliver an unprecedented 60-70% generational uplift over the current 40-series.</p>
                <h3>Expected Pricing</h3>
                <p>While performance is increasing, pricing models suggest NVIDIA might push the top-end even higher.</p>
                <div style="padding: 15px; border-left: 4px solid var(--primary); background: #f8fafc; margin: 20px 0;">
                    <em>"The generational leap we are seeing in internal test units is unprecedented. The 5090 sets an entirely new benchmark for enthusiasts." - Anonymous Source</em>
                </div>
                <h3>Release Timeline</h3>
                <p>Industry insiders point toward a Q3 2026 announcement with flagship models shipping by Q4, right in time for the holiday season.</p>
            `
        },
        '3': {
            title: "Laptop vs Desktop: Which One Do You Really Need?",
            tag: "Laptops",
            date: "Feb 05, 2026",
            image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=2564&auto=format&fit=crop",
            content: `
                <p>Portability or raw power? We break down the pros and cons for students and professionals.</p>
                <h3>The Case for Laptops</h3>
                <p>Modern laptops have significantly closed the performance gap. With M-series chips from Apple and highly efficient mobile processors from AMD and Intel, mobility no longer means compromising on speed.</p>
                <ul>
                    <li>Unmatched portability for students and remote workers.</li>
                    <li>All-in-one system ready to go out of the box.</li>
                    <li>Built-in battery backup against power outages.</li>
                </ul>
                <h3>The Desktop Advantage</h3>
                <p>However, desktops remain the king of performance-per-dollar.</p>
                <ul>
                    <li>Superior cooling for sustained workloads.</li>
                    <li>Completely upgradable components keeping your system relevant for years longer.</li>
                    <li>Significantly cheaper for identical performance metrics.</li>
                </ul>
                <p><strong>Conclusion:</strong> If you travel more than 3 days a week, buy a laptop. If you work from a dedicated desk, build a PC.</p>
            `
        },
        '4': {
            title: "How To Clean Your PC Like a Pro",
            tag: "Guides",
            date: "Feb 02, 2026",
            image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80&w=2642&auto=format&fit=crop",
            content: `
                <p>Dust is the enemy of performance. Learn the safe and effective way to clean your rig without damaging components.</p>
                <h3>Why Cleaning Matters</h3>
                <p>Dust buildup acts as an insulator, trapping heat inside your parts. This forces your fans to run louder and causes your CPU and GPU to thermal throttle—reducing performance.</p>
                <h3>Tools You Need</h3>
                <ul>
                    <li>Compressed air (can) or an electric air duster.</li>
                    <li>Isopropyl alcohol (90%+).</li>
                    <li>Microfiber cloths.</li>
                    <li>Soft-bristled brush.</li>
                </ul>
                <h3>Step-by-Step Process</h3>
                <ol>
                    <li><strong>Turn Everything Off:</strong> Unplug the system entirely and take it to a well-ventilated area.</li>
                    <li><strong>Hold the Fans:</strong> Never let compressed air spin your fans freely; this damages bearings. Hold them still while dusting.</li>
                    <li><strong>Short Bursts:</strong> Use short bursts of compressed air to dislodge dust from heatsinks.</li>
                    <li><strong>Wipe Down:</strong> Carefully wipe fan blades and case interiors with a lightly moistened microfiber cloth.</li>
                </ol>
            `
        },
        '5': {
            title: "MacBook Pro M4 vs Custom PC",
            tag: "Comparisons",
            date: "Jan 28, 2026",
            image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2574&auto=format&fit=crop",
            content: `
                <p>The latest Apple silicon is powerful, but does it match a high-end desktop running Windows? We put them to the test.</p>
                <h3>The Silicon Battle</h3>
                <p>Apple's M4 architecture is an engineering marvel. Achieving high-end desktop performance while sipping 30 watts of power is incredible.</p>
                <h3>Where Apple Wins</h3>
                <p>For video editing, specifically ProRes workflows, audio engineering, and UI/UX design, the MacBook holds a severe advantage in optimization and battery life.</p>
                <h3>Where Windows Wins</h3>
                <p>The custom PC completely destroys the MacBook in two main areas: 3D Rendering (Blender, Maya) and Gaming. The ability to drop in an RTX 4090 gives raw compute power that Apple simply doesn't offer yet.</p>
                <div style="background: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 8px; padding: 20px; margin: 20px 0;">
                    <h4 style="color: #be185d; margin-top:0;">Final Verdict</h4>
                    <p style="margin-bottom:0;">It entirely comes down to software dependency. If your apps run natively on Metal, get a Mac. If you need CUDA cores or DirectX, build a PC.</p>
                </div>
            `
        },
        '6': {
            title: "AMD Unveils New Budget GPUs",
            tag: "News",
            date: "Jan 25, 2026",
            image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=2600&auto=format&fit=crop",
            content: `
                <p>Great news for budget gamers as new affordable graphics cards hit the market with stellar price-to-performance ratios.</p>
                <h3>The Entry Level King</h3>
                <p>The newly announced Radeon RX 8600 targets the $249 price point squarely, promising to deliver consistent 60+ FPS in modern AAA titles at 1080p high settings.</p>
                <h3>VRAM Advantage</h3>
                <p>Unlike competitors who have notoriously squeezed memory capacities, AMD is outfitting these entry cards with a comfortable 12GB of GDDR6 memory, ensuring texture loading doesn't become a bottleneck in games released heavily in 2025 and 2026.</p>
                <h3>Availability</h3>
                <p>Cards are expected to hit shelves late next month. We strongly advise checking multiple retailers as bot scalping remains an issue for highly anticipated budget launches.</p>
            `
        }
    };

    const contentContainer = document.getElementById('articleContent');
    const loadingState = document.getElementById('loading');
    const errorState = document.getElementById('errorState');

    // Display correct state
    if (!articleId || !articleDatabase[articleId]) {
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        return;
    }

    const articleData = articleDatabase[articleId];

    // Populate data
    document.getElementById('articleTitle').textContent = articleData.title;
    document.getElementById('articleTag').textContent = articleData.tag;
    document.getElementById('articleDate').textContent = articleData.date;
    document.getElementById('articleImage').src = articleData.image;
    document.getElementById('articleImage').alt = articleData.title;
    document.getElementById('articleBody').innerHTML = articleData.content;

    // Update Document Title
    document.title = articleData.title + " - Know Your PC";

    // Show Content 
    setTimeout(() => { // Simulated slight network delay
        loadingState.classList.add('hidden');
        contentContainer.classList.remove('hidden');
    }, 400);
});
