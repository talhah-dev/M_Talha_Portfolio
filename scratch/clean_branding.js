const fs = require('fs');

const files = [
  { name: 'index.html', page: 'home', title: 'Talha | Full Stack Developer Portfolio' },
  { name: 'about.html', page: 'about', title: 'About Me - Talha | Full Stack Developer' },
  { name: 'portfolio.html', page: 'portfolio', title: 'Portfolio - Talha | Full Stack Developer' },
  { name: 'contact.html', page: 'contact', title: 'Contact - Talha | Full Stack Developer' },
];

files.forEach(({ name, page, title }) => {
  if (!fs.existsSync(name)) return;
  let content = fs.readFileSync(name, 'utf8');

  // 1. Head Meta & Title
  content = content.replace(
    /<meta name="description"[\s\S]*?\/>/,
    '<meta name="description" content="Talha - Full Stack Developer Portfolio. Specializing in Next.js, React, TypeScript, PostgreSQL, and AI integration." />'
  );
  content = content.replace(
    /<meta name="keywords"[\s\S]*?\/>/,
    '<meta name="keywords" content="Full Stack Developer, React, Next.js, TypeScript, Portfolio, Node.js, PostgreSQL" />'
  );
  content = content.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);

  // 2. Replace Header & Offcanvas Logo Images with Text "MY PORTFOLIO"
  content = content.replace(
    /<div class="header-three-logo tw-rounded-md">[\s\S]*?<\/div>/,
    `<div class="header-three-logo tw-rounded-md">
          <a href="index.html" class="link tw-text-2xl fw-bold text-uppercase text-heading tracking-wider">
            MY PORTFOLIO
          </a>
        </div>`
  );

  content = content.replace(
    /<div class="twoffcanvas__logo">[\s\S]*?<\/div>/,
    `<div class="twoffcanvas__logo">
            <a class="logo-1 tw-text-2xl fw-bold text-uppercase text-white tracking-wider" href="index.html">MY PORTFOLIO</a>
          </div>`
  );

  // 3. Offcanvas Contact Info fix for index.html
  if (name === 'index.html') {
    content = content.replace(
      /<ul>\s*<li>\s*<span class="text-main-two-600 tw-text-xl"><i class="ph ph-map-pin-line"><\/i><\/span>[\s\S]*?<\/ul>/,
      `<ul>
              <li>
                <span class="text-main-two-600 tw-text-xl"><i class="ph ph-map-pin-line"></i></span>
                <a class="text-white" href="#" target="_blank">Pakistan</a>
              </li>
              <li>
                <span class="text-main-two-600 tw-text-xl"><i class="ph ph-envelope"></i></span>
                <a class="text-white" href="mailto:talha18513@gmail.com">talha18513@gmail.com</a>
              </li>
              <li>
                <span class="text-main-two-600 tw-text-xl"><i class="ph ph-phone-call"></i></span>
                <a class="text-white" href="tel:03152666263">03152666263</a>
              </li>
            </ul>`
    );

    content = content.replace(
      /<div class="footer-social"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
      `<div class="footer-social" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
            <ul class="tw-gap-2">
              <li>
                <a href="https://github.com" target="_blank">
                  <span class="active-media d-flex align-items-center tw-gap-1">GITHUB <i
                      class="ph ph-arrow-bend-up-right"></i></span>
                  <span class="hover-media"><i class="ph ph-github-logo"></i></span>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank">
                  <span class="active-media d-flex align-items-center tw-gap-1">LINKEDIN <i
                      class="ph ph-arrow-bend-up-right"></i></span>
                  <span class="hover-media"><i class="ph ph-linkedin-logo"></i></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>`
    );
  }

  // 4. Hide front header navigation bar (keep d-none so JS populates offcanvas menu on toggle click)
  const homeActive = page === 'home' ? 'class="color-active" ' : '';
  const aboutActive = page === 'about' ? 'class="color-active" ' : '';
  const portActive = page === 'portfolio' ? 'class="color-active" ' : '';
  const contactActive = page === 'contact' ? 'class="color-active" ' : '';

  const newMenu = `<div class="header-menu d-none">
          <div class="main-menu">
            <nav class="tw-main-menu-content">
              <ul>
                <li><a ${homeActive}href="index.html">Home</a></li>
                <li><a ${aboutActive}href="about.html">About</a></li>
                <li><a ${portActive}href="portfolio.html">Portfolio</a></li>
                <li><a ${contactActive}href="contact.html">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>`;

  content = content.replace(/<div class="header-menu[\s\S]*?<\/nav>\s*<\/div>\s*<\/div>/, newMenu);

  // 5. Simplified Footer Quick Links
  const newFooterLinks = `<ul class="d-flex tw-gap-2 flex-wrap">
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
                    </ul>`;

  content = content.replace(/<ul class="d-flex tw-gap-2 flex-wrap">[\s\S]*?<\/ul>/, newFooterLinks);

  // 6. Replace any remaining Unifex text
  content = content.replace(/Unifex Agency/gi, 'Talha');
  content = content.replace(/Unifex Theme/gi, 'Talha');
  content = content.replace(/Unifex/gi, 'Talha');

  // 7. Strip all HTML comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // 8. Clean excessive blank lines
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');

  fs.writeFileSync(name, content, 'utf8');
  console.log(`Processed ${name}`);
});
