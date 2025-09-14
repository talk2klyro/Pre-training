/* testimonials.js
   Full page testimonials: reads data/testimonials.json and creates a slider with controls.
*/
async function loadTestimonials(url = 'data/testimonials.json', containerSelector = '#testimonial-slider'){
  const res = await fetch(url);
  const data = await res.json();
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = data.map((t, idx) => `
    <div class="testimonial-card" role="article" data-index="${idx}">
      <p class="testimonial-text">“${t.feedback}”</p>
      <div class="testimonial-author">${t.name}</div>
      <div class="stars">${'⭐'.repeat(t.rating)}</div>
    </div>
  `).join('');

  let index = 0;
  const cards = container.querySelectorAll('.testimonial-card');
  if (!cards.length) return;

  function show(i){
    cards.forEach((c, idx) => c.style.transform = `translateX(${100 * (idx - i)}%)`);
  }
  show(index);

  // pause on hover/focus
  let paused = false;
  container.addEventListener('mouseenter', ()=> paused = true);
  container.addEventListener('mouseleave', ()=> paused = false);

  setInterval(() => {
    if (!paused) { index = (index + 1) % cards.length; show(index); }
  }, 4000);
}
window.loadTestimonials = loadTestimonials;
