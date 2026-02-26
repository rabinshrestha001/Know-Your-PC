import re
import glob
import os

files = glob.glob('/home/college/Documents/3rd-SEM/Know Your PC/HTML/*.html')

new_logo_html = """            <a href="home.html" class="logo" style="display: flex; align-items: center; gap: 10px; text-decoration: none;">
                <svg viewBox="0 0 100 100" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="var(--primary)" />
                            <stop offset="100%" stop-color="var(--secondary)" />
                        </linearGradient>
                    </defs>
                    <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#brandGrad)" opacity="0.1" />
                    <path d="M 32 25 L 32 75" fill="none" stroke="url(#brandGrad)" stroke-width="10" stroke-linecap="round" />
                    <path d="M 68 25 L 32 50 L 68 75" fill="none" stroke="url(#brandGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                    <circle cx="32" cy="50" r="4" fill="var(--primary)" />
                    <circle cx="68" cy="25" r="4" fill="var(--secondary)" />
                    <circle cx="68" cy="75" r="4" fill="var(--secondary)" />
                </svg>
                <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.4rem; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;">Know Your PC</span>
            </a>"""

new_footer_logo_html = """                    <div class="logo footer-logo" style="display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;">
                        <svg viewBox="0 0 100 100" width="38" height="38" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient id="brandGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stop-color="var(--primary)" />
                                    <stop offset="100%" stop-color="var(--secondary)" />
                                </linearGradient>
                            </defs>
                            <rect x="5" y="5" width="90" height="90" rx="24" fill="url(#brandGrad)" opacity="0.1" />
                            <path d="M 32 25 L 32 75" fill="none" stroke="url(#brandGrad)" stroke-width="10" stroke-linecap="round" />
                            <path d="M 68 25 L 32 50 L 68 75" fill="none" stroke="url(#brandGrad)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" />
                            <circle cx="32" cy="50" r="4" fill="var(--primary)" />
                            <circle cx="68" cy="25" r="4" fill="var(--secondary)" />
                            <circle cx="68" cy="75" r="4" fill="var(--secondary)" />
                        </svg>
                        <span style="font-family: 'Outfit', sans-serif; font-weight: 800; font-size: 1.4rem; letter-spacing: -0.02em; background: linear-gradient(135deg, var(--text-main) 0%, var(--primary) 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; line-height: 1;">Know Your PC</span>
                    </div>"""

for f in files:
    with open(f, 'r') as file:
        content = file.read()
    
    # Replace navbar logo
    # Matches <a href="..." class="logo"...>...</a>
    # Note: re.DOTALL so it matches across newlines
    content = re.sub(r'<a[^>]+class="logo"[^>]*>.*?</a>', new_logo_html, content, flags=re.DOTALL)
    
    # Replace footer logo variants
    # Variant 1: <div class="logo footer-logo">...</div>
    content = re.sub(r'<div[^>]+class="logo footer-logo"[^>]*>.*?</div>', new_footer_logo_html, content, flags=re.DOTALL)
    
    # Variant 2: <div class="footer-logo">...</div>
    content = re.sub(r'<div[^>]+class="footer-logo"[^>]*>.*?</div>', new_footer_logo_html, content, flags=re.DOTALL)

    with open(f, 'w') as file:
        file.write(content)
        
print("Replacement completed.")
