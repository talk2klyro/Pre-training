// js/gallery.js
// Handles Snap Gallery functionality for portfolio pages

document.addEventListener('DOMContentLoaded', async () => {

  const galleryContainers = document.querySelectorAll('.snap-gallery');

  if (!galleryContainers.length) return;

  // Fetch portfolio JSON
  async function fetchPortfolio() {
    try {
      const response = await fetch('data/portfolio.json');
      if (!response.ok) throw new Error('Failed to fetch portfolio.json');
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  const portfolioItems = await fetchPortfolio();

  galleryContainers.forEach(container => {
    container.innerHTML = portfolioItems.map(item => `
      <div>
        <img src="${item.image}" alt="${item.title || 'Portfolio image'}">
      </div>
    `).join('');

    // Optional: Animated scroll progress
    const progressBar = document.createElement('div');
    progressBar.className = 'snap-progress';
    progressBar.style.position = 'absolute';
    progressBar.style.bottom = '0';
    progressBar.style.left = '0';
    progressBar.style.height = '4px';
    progressBar.style.backgroundColor = 'var(--accent)';
    progressBar.style.width = '0%';
    progressBar.style.transition = 'width 0.2s ease';
    container.style.position = 'relative';
    container.appendChild(progressBar);

    container.addEventListener('scroll', () => {
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const progressPercent = scrollWidth ? (scrollLeft / scrollWidth) * 100 : 0;
      progressBar.style.width = `${progressPercent}%`;
    });
  });

});
