// js/dataLoader.js
// Handles loading of JSON data for services, portfolio, and testimonials
document.addEventListener('DOMContentLoaded', () => {

  // Helper function to fetch JSON
  async function fetchJSON(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch ${url}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  // 1. Load Services for Bento grid and select dropdown
  async function loadServices() {
    const services = await fetchJSON('data/services.json');
    
    // Bento grid (index.html)
    const bentoGrid = document.getElementById('services-bento-grid');
    if (bentoGrid) {
      bentoGrid.innerHTML = services.map(service => `
        <div class="bento-item" style="padding:16px;border:1px solid #eee;border-radius:12px;text-align:center;">
          <h3>${service.name}</h3>
          <p>${service.description || ''}</p>
          <p style="font-weight:600;">₦${service.price}</p>
        </div>
      `).join('');
    }

    // Select dropdown (contact.html)
    const serviceSelect = document.querySelector('select[name="service"]');
    if (serviceSelect) {
      serviceSelect.innerHTML += services.map(service => `
        <option value="${service.name}">${service.name} — ₦${service.price}</option>
      `).join('');
    }
  }

  // 2. Load Portfolio images (portfolio.html & index preview)
  async function loadPortfolio() {
    const portfolio = await fetchJSON('data/portfolio.json');
    const gallery = document.getElementById('portfolio-gallery') || document.getElementById('portfolio-preview-gallery');
    if (gallery) {
      gallery.innerHTML = portfolio.map(item => `
        <div>
          <img src="${item.image}" alt="${item.title || 'Portfolio image'}">
        </div>
      `).join('');
    }
  }

  // 3. Load Testimonials (index preview or testimonials.html)
  async function loadTestimonials() {
    const testimonials = await fetchJSON('data/testimonials.json');
    const slider = document.getElementById('testimonial-slider') || document.getElementById('testimonial-preview');
    if (slider) {
      slider.innerHTML = testimonials.map(t => `
        <div>
          <p>"${t.feedback}"</p>
          <h3>- ${t.name}${t.occasion ? ', ' + t.occasion : ''}</h3>
        </div>
      `).join('');
    }
  }

  // Run all loaders
  loadServices();
  loadPortfolio();
  loadTestimonials();

});
