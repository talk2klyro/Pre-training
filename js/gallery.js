/* gallery.js
   Creates a horizontal snap gallery with progress bar and keyboard accessibility.
   Usage on portfolio.html: loadPortfolio('data/portfolio.json', 'gallery-container')
*/
async function loadPortfolio(url, containerId = 'gallery-container', progressId = 'progress-bar'){
  try{
    const res = await fetch(url);
    const data = await res.json();
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = data.map(item => `
      <div class="snap-item" tabindex="0">
        <img data-src="${item.url}" alt="${item.title}" class="lazy" width="800" height="1000" />
        <div class="caption">${item.title}</div>
      </div>
    `).join('');

    // lazy load those images
    if (window.lazyLoadImages) lazyLoadImages(container);

    // progress bar
    const progressBar = document.querySelector(`#${progressId} span`);
    if (progressBar){
      container.addEventListener('scroll', () => {
        const scrollWidth = container.scrollWidth - container.clientWidth;
        const progress = scrollWidth <= 0 ? 100 : (container.scrollLeft / scrollWidth) * 100;
        progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
      });
    }

    // keyboard arrows to navigate
    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') container.scrollBy({left: 320, behavior: 'smooth'});
      if (e.key === 'ArrowLeft') container.scrollBy({left: -320, behavior: 'smooth'});
    });

    // click to open image in new tab (lightbox could be added later)
    container.addEventListener('click', (e) => {
      const img = e.target.closest('.snap-item')?.querySelector('img');
      if (img && img.dataset && img.dataset.src) window.open(img.dataset.src, '_blank', 'noopener');
    });

  } catch (err) {
    console.error('Error loading gallery', err);
  }
}

window.loadPortfolio = loadPortfolio;
