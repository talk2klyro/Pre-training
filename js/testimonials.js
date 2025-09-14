// js/testimonials.js
// Handles testimonial slider functionality

document.addEventListener('DOMContentLoaded', async () => {

  const slider = document.getElementById('testimonial-slider') || document.getElementById('testimonial-preview');
  if (!slider) return;

  // Fetch testimonials JSON
  async function fetchTestimonials() {
    try {
      const response = await fetch('data/testimonials.json');
      if (!response.ok) throw new Error('Failed to fetch testimonials.json');
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  const testimonials = await fetchTestimonials();

  // Populate slider
  slider.innerHTML = testimonials.map(t => `
    <div class="testimonial-item" style="flex:0 0 auto;scroll-snap-align:center;padding:16px;border-radius:12px;background:#fff;box-shadow:0 2px 6px rgba(0,0,0,0.05);max-width:300px;margin-right:12px;">
      <p>"${t.feedback}"</p>
      <h3>- ${t.name}${t.occasion ? ', ' + t.occasion : ''}</h3>
    </div>
  `).join('');

  // Optional: autoplay scroll
  let scrollIndex = 0;
  const interval = 4000; // 4 seconds per slide
  const items = slider.querySelectorAll('.testimonial-item');
  if (items.length <= 1) return; // no need for slider if 1 or 0 items

  setInterval(() => {
    scrollIndex++;
    if (scrollIndex >= items.length) scrollIndex = 0;
    const target = items[scrollIndex];
    slider.scrollTo({
      left: target.offsetLeft - slider.offsetLeft,
      behavior: 'smooth'
    });
  }, interval);

});
