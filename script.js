// Clinic details are read from the URL so every doctor can share this same page.
// Example: ?doctor=Dr.%20Maya%20Shah&clinic=Bright%20Smiles&phone=%2B919876543210
const params = new URLSearchParams(window.location.search);
const get = (key, fallback) => params.get(key)?.trim() || fallback;
const doctor = get('doctor', 'Dr. Anya Kapoor');
const clinic = get('clinic', 'SmileCare');
const phone = get('phone', '+91 98765 43210');
const email = get('email', 'info@smilecare.com');
const address = get('address', '123 Main Road, Andheri West, Mumbai, Maharashtra - 400058');
const patients = get('patients', '500+');
const experience = get('experience', '10+');
const certifications = get('certifications', '3');
document.title = `${clinic} Dental Clinic | ${doctor}`;
document.querySelectorAll('[data-clinic]').forEach(el => el.textContent = clinic);
document.querySelectorAll('[data-doctor]').forEach(el => el.textContent = doctor);
document.querySelectorAll('[data-address]').forEach(el => el.textContent = address);
document.querySelector('[data-patients]').textContent = patients;
document.querySelector('[data-experience]').textContent = experience;
document.querySelector('[data-certifications]').textContent = certifications;
const mapFrame = document.querySelector('.map-frame');
mapFrame.src = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
document.querySelectorAll('[data-phone]').forEach(el => { el.textContent = phone; el.href = `tel:${phone.replace(/[^+\d]/g, '')}`; });
document.querySelectorAll('[data-email]').forEach(el => { el.textContent = email; el.href = `mailto:${email}`; });
document.querySelectorAll('[data-call]').forEach(el => el.href = `tel:${phone.replace(/[^+\d]/g, '')}`);
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = Object.fromEntries(new FormData(event.currentTarget));
  const message = `Hello ${doctor}, I would like to book an appointment at ${clinic}.\nName: ${fields.name}\nService: ${fields.service}\nClinic address: ${address}`;
  const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  if (!whatsappWindow) window.location.assign(whatsappUrl);
});

const results = document.querySelector('.result-grid');
document.querySelectorAll('.carousel-controls button').forEach((button, index) => button.addEventListener('click', () => {
  results.scrollBy({ left: (index ? 1 : -1) * results.clientWidth / 3, behavior: 'smooth' });
}));
