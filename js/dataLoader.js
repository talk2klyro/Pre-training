/* dataLoader.js
   Small utility functions to fetch JSON and render services/portfolio/testimonials.
   All functions expose a simple global API:
     - loadServices(containerSelector)
     - loadPortfolioPreview(containerSelector, maxItems)
     - loadTestimonialsPreview(containerSelector, maxItems)
*/
const DATA_PATH = 'data/';

async function fetchJSON(name){
  try{
    const res = await fetch(DATA_PATH + name);
    if (!res.ok) throw new Error(res.statusText);
    return await res.json();
  } catch(e){
    console.error('Failed to fetch', name, e);
    return [];
  }
}

async function loadServices(containerSelector){
  const data = await fetchJSON('services.json');
  const container = document.querySelector(containerSelector);
  if (!container) return;
  // build bento cards with classes to vary size
  const sizeClasses = ['large','tall','wide',''];
  const html = data.map((s,i) => {
    const cls = sizeClasses[i % sizeClasses.length];
    const img = s.image || 'assets/images/service-placeholder.jpg';
    return `
      <article class="bento-card ${cls}" role="article" aria-label="${s.name}">
        <img data-src="${img}" alt="${s.name}" class="lazy" width="600" height="450" />
        <div class="meta">
          <h3>${s.name}</h3>
          <div style="font-size:0.95rem">${s.price}</div>
        </div>
      </article>`;
  }).join('');
  container.innerHTML = html;
  // lazy-load images
  lazyLoadImages(container);
}

async function loadPortfolioPreview(containerSelector, maxItems = 4){
  const data = await fetchJSON('portfolio.json');
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = data.slice(0, maxItems);
  container.innerHTML = items.map(item => `
    <div class="snap-item">
      <img class="lazy" data-src="${item.url}" alt="${item.title}" width="800" height="1000" />
      <div class="caption">${item.title}</div>
    </div>
  `).join('');
  lazyLoadImages(container);
}

/* Testimonials preview: shows only first N */
async function loadTestimonialsPreview(containerSelector, maxItems = 2){
  const data = await fetchJSON('testimonials.json');
  const container = document.querySelector(containerSelector);
  if (!container) return;
  const items = data.slice(0, maxItems);
  container.innerHTML = items.map(t => `
    <div class="testimonial-card" role="article">
      <p class="testimonial-text">“${t.feedback}”</p>
      <div class="testimonial-author">💇‍♀️ ${t.name}</div>
      <div class="stars">${'⭐'.repeat(t.rating)}</div>
    </div>
  `).join('');
  // simple rotation
  let index = 0;
  const cards = container.querySelectorAll('.testimonial-card');
  if (!cards.length) return;
  function show(i){
    cards.forEach((c, idx) => c.style.transform = `translateX(${100 * (idx - i)}%)`);
  }
  show(index);
  setInterval(()=>{ index=(index+1)%cards.length; show(index); }, 4500);
}

/* Lazy loader using IntersectionObserver */
function lazyLoadImages(root = document){
  const imgs = root.querySelectorAll('img.lazy');
  if (!('IntersectionObserver' in window) || !imgs.length){
    // fallback: load immediately
    imgs.forEach(i => { i.src = i.dataset.src; i.classList.remove('lazy'); });
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting){
        const img = e.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  }, {rootMargin: '200px'});
  imgs.forEach(i => io.observe(i));
}

/* expose to other scripts */
window.loadServices = loadServices;
window.loadPortfolioPreview = loadPortfolioPreview;
window.loadTestimonialsPreview = loadTestimonialsPreview;
