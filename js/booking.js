/* booking.js
   Renders a booking form (if #booking-form present) and handles:
     - Validation
     - Opens WhatsApp prefilled message
     - Optional: opens Flutterwave deposit link in new tab if user clicks "Pay deposit"
*/
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('booking-form');
  if (!el) return;

  // Basic form markup
  el.innerHTML = `
    <form id="bookForm" class="booking-form" novalidate>
      <label>Name <input name="name" required /></label>
      <label>Phone <input name="phone" type="tel" required placeholder="+234..." /></label>
      <label>Service
        <select name="service" required>
          <option value="">Choose a service...</option>
        </select>
      </label>
      <label>Date <input name="date" type="date" required /></label>
      <label>Message <textarea name="message" rows="3" placeholder="Any details (location, bridal trial, etc)"></textarea></label>

      <div style="display:flex;gap:8px;align-items:center;margin-top:10px;">
        <button type="submit" class="btn">Send via WhatsApp</button>
        <button type="button" id="pay-deposit" class="pay-btn">Pay Deposit</button>
      </div>
    </form>
  `;

  // Populate services from services.json
  fetch('data/services.json').then(r => r.json()).then(data => {
    const sel = el.querySelector('select[name=service]');
    data.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = `${s.name} — ${s.price}`;
      sel.appendChild(opt);
    });
  });

  // Submission: open WhatsApp with prefilled message
  const form = document.getElementById('bookForm');
  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    if (!form.reportValidity()) return;
    const formData = new FormData(form);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    const date = formData.get('date');
    const msg = formData.get('message') || '';
    const text = encodeURIComponent(`Hi, I'm ${name} (${phone}). I'd like to book: ${service} on ${date}. ${msg}`);
    const wa = `https://wa.me/2349012728201?text=${text}`;
    window.open(wa, '_blank', 'noopener');
    // Save to localStorage for admin quick reference (simple queue)
    try {
      const store = JSON.parse(localStorage.getItem('bookings') || '[]');
      store.unshift({name, phone, service, date, msg, created: Date.now()});
      localStorage.setItem('bookings', JSON.stringify(store.slice(0,50)));
    } catch(e){ /* ignore */ }
    form.reset();
  });

  // Pay deposit: open a Flutterwave link — choose one (or show small menu)
  const payBtn = document.getElementById('pay-deposit');
  payBtn.addEventListener('click', () => {
    // simple menu: open a small choice (for now open link1)
    const url = 'https://flutterwave.com/pay/7dvrq9hz4idf';
    window.open(url, '_blank', 'noopener');
  });
});
