import re

def clean_file(filepath, active_page):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Unifex meta tags and title
    content = re.sub(
        r'<meta name="description"\s+content="[^"]*"\s*/>',
        '<meta name="description" content="Talha - Full Stack Developer Portfolio. Specializing in Next.js, React, TypeScript, PostgreSQL, and AI integration." />',
        content
    )
    content = re.sub(
        r'<meta name="keywords"\s+content="[^"]*"\s*/>',
        '<meta name="keywords" content="Full Stack Developer, React, Next.js, TypeScript, Portfolio, Node.js, PostgreSQL" />',
        content
    )
    content = re.sub(
        r'<title>[^<]*</title>',
        '<title>Talha | Full Stack Developer Portfolio</title>',
        content
    )

    # Replace menu
    menu_pattern = r'<div class="main-menu">[\s\S]*?</nav>\s*</div>'
    
    home_active = 'class="color-active" ' if active_page == 'home' else ''
    about_active = 'class="color-active" ' if active_page == 'about' else ''
    port_active = 'class="color-active" ' if active_page == 'portfolio' else ''
    contact_active = 'class="color-active" ' if active_page == 'contact' else ''

    new_menu = f'''<div class="main-menu">
            <nav class="tw-main-menu-content">
              <ul>
                <li><a {home_active}href="index.html">Home</a></li>
                <li><a {about_active}href="about.html">About</a></li>
                <li><a {port_active}href="portfolio.html">Portfolio</a></li>
                <li><a {contact_active}href="contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>'''

    content = re.sub(menu_pattern, new_menu, content)

    # Replace footer links
    footer_pattern = r'<ul class="d-flex tw-gap-2 flex-wrap">[\s\S]*?</ul>'
    new_footer_links = '''<ul class="d-flex tw-gap-2 flex-wrap">
                      <li>
                        <a class="tw-text-lg text-white" href="index.html">Home,</a>
                      </li>
                      <li>
                        <a class="tw-text-lg text-white" href="about.html">About,</a>
                      </li>
                      <li>
                        <a class="tw-text-lg text-white" href="portfolio.html">Portfolio,</a>
                      </li>
                      <li>
                        <a class="tw-text-lg text-white" href="contact.html">Contact</a>
                      </li>
                    </ul>'''
    
    # We replace only inside the footer quick links block
    content = re.sub(footer_pattern, new_footer_links, content)

    # Strip HTML comments
    content = re.sub(r'<!--(?!\[if).*?-->', '', content, flags=re.DOTALL)
    
    # Clean up empty lines created by comment removal
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

clean_file('index.html', 'home')
clean_file('portfolio.html', 'portfolio')
clean_file('about.html', 'about')
clean_file('contact.html', 'contact')
print("Cleaned successfully.")
