import sys

file_path = '/home/college/Documents/3rd-SEM/Know Your PC/HTML/home.html'
with open(file_path, 'r') as f:
    content = f.read()

parts = content.split('<a href="#" class="news-link">Read Article')
if len(parts) == 7:  # 6 instances
    new_content = parts[0]
    for i in range(1, 7):
        new_content += f'<a href="article-detail.html?id={i}" class="news-link">Read Article' + parts[i]
    
    # Remove modal
    modal_start = new_content.find('<!-- Article Modal Overlay -->')
    modal_end = new_content.find('<script src="../JS/home.js"></script>')
    if modal_start != -1 and modal_end != -1:
        new_content = new_content[:modal_start] + new_content[modal_end:]
    
    with open(file_path, 'w') as f:
        f.write(new_content)
    print("Successfully replaced links and removed modal!")
else:
    print(f"Failed. Found {len(parts)-1} instances.")
