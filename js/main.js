const EMAIL_CONTATO = 'associacaofundacaofteixeira@gmail.com';

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible'); observer.unobserve(e.target);} });
}, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAVBAR MOBILE =====
const navLinks = document.getElementById('navLinks');
const hamburger = document.getElementById('hamburger');
function setMenu(open) {
  navLinks.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
hamburger.addEventListener('click', () => setMenu(!navLinks.classList.contains('open')));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');
let ticking = false;
function updateActiveNav() {
  let current = '';
  sections.forEach(s => {if (window.scrollY >= s.offsetTop - 100) current = s.id;});
  navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) {requestAnimationFrame(updateActiveNav); ticking = true;}
}, {passive: true});

// ===== GALERIA (FOTO INDISPONÍVEL) =====
function mostrarPlaceholder(img) {
  img.style.display = 'none';
  img.nextElementSibling.style.display = 'flex';
}
document.querySelectorAll('.galeria-item img').forEach(img => {
  // A imagem pode ter falhado antes deste script carregar
  if (img.complete && img.naturalWidth === 0) mostrarPlaceholder(img);
  else img.addEventListener('error', () => mostrarPlaceholder(img));
});

// ===== GALERIA (LIGHTBOX) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
function abrirFoto(item) {
  const img = item.querySelector('img');
  if (!img || img.style.display === 'none' || !lightbox.showModal) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.querySelector('figcaption').textContent;
  lightbox.showModal();
}
document.querySelectorAll('.galeria-item').forEach(item => {
  item.addEventListener('click', () => abrirFoto(item));
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {e.preventDefault(); abrirFoto(item);}
  });
});
lightbox.addEventListener('click', e => {
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) lightbox.close();
});

// ===== CONTATO FORM =====
const toast = document.getElementById('toast');
function mostrarToast(texto) {
  toast.textContent = texto;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}
document.getElementById('contatoForm').addEventListener('submit', e => {
  e.preventDefault();
  const campo = id => document.getElementById(id).value.trim();
  const nome = campo('nome'), email = campo('email'), mensagem = campo('mensagem');
  if (!nome || !email || !mensagem) {
    mostrarToast('⚠️ Por favor, preencha Nome, E-mail e Mensagem.');
    return;
  }
  if (!document.getElementById('email').checkValidity()) {
    mostrarToast('⚠️ Informe um e-mail válido.');
    return;
  }
  const assunto = campo('assunto') || 'Contato pelo site';
  const corpo = `Nome: ${nome}\nE-mail: ${email}\nTelefone: ${campo('telefone')}\nAssunto: ${assunto}\n\nMensagem:\n${mensagem}`;
  window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  mostrarToast(`✉️ Abrindo seu aplicativo de e-mail… Se não abrir, escreva para ${EMAIL_CONTATO}`);
});

document.getElementById('ano').textContent = new Date().getFullYear();
