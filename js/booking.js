// js/booking.js
// Handles booking form submission and optional WhatsApp message

document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('booking-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Collect form data
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const service = form.service.value;
    const date = form.date.value;
    const time = form.time.value;
    const message = form.message.value.trim();

    // Simple validation
    if (!name || !email || !phone || !service || !date || !time) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare WhatsApp message
    const whatsappMessage = `Hi, I'd like to book a service with Beauty & Glamour:%0A` +
                            `Name: ${name}%0A` +
                            `Email: ${email}%0A` +
                            `Phone: ${phone}%0A` +
                            `Service: ${service}%0A` +
                            `Date: ${date}%0A` +
                            `Time: ${time}%0A` +
                            (message ? `Notes: ${message}` : '');

    // Open WhatsApp link
    const whatsappURL = `https://wa.me/2349012728201?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');

    // Optional: show alert or reset form
    alert('Your booking request has been prepared in WhatsApp. Please confirm your slot!');
    form.reset();
  });

});
