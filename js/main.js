/* main.js
   - Injects header/footer
   - Adds mobile menu toggle accessibility
   - Boots initial data-driven sections once components are ready
*/
async function loadComponent(id, url){
  const el = document.getElementById(id);
  if (!el) return;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Component load failed');
    el.innerHTML = await res.text();
  } catch (err) {
    // keep el empty (we included noscript fallback where needed)
    console.warn('Unable to load component', url, err);
  }
}

async function init(){
  // inject header and footer
  await loadComponent('header', 'components/header.html');
  await loadComponent('footer', 'components/footer.html');

  // setup mobile menu toggle (works after header injection)
  const toggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('show');
    });
  }

  // keyboard accessibility for dropdowns: open on focus
  document.querySelectorAll('.dropdown > a').forEach(link => {
    link.addEventListener('focus', () => {
      link.setAttribute('aria-expanded','true');
      const menu = link.nextElementSibling;
      if (menu) menu.style.display = 'block';
    });
    link.addEventListener('blur', () => {
      link.setAttribute('aria-expanded','false');
      const menu = link.nextElementSibling;
      if (menu) menu.style.display = '';
    });
  });

  // boot other features (safe to call even if those files are not loaded yet)
  if (window.loadServices) window.loadServices('#services-bento-grid');
  if (window.loadPortfolioPreview) window.loadPortfolioPreview('#portfolio-preview-gallery', 4);
  if (window.loadTestimonialsPreview) window.loadTestimonialsPreview('#testimonial-preview', 2);

  // add "skip to content" link for a11y (if desired)
  addSkipLink();
}

function addSkipLink(){
  if (document.getElementById('skip-link')) return;
  const a = document.createElement('a');
  a.id = 'skip-link';
  a.href = '#main';
  a.textContent = 'Skip to main content';
  a.style.position = 'absolute';
  a.style.left = '-9999px';
  a.style.top = 'auto';
  a.style.width = '1px';
  a.style.height = '1px';
  document.body.prepend(a);
}

document.addEventListener('DOMContentLoaded', init);
