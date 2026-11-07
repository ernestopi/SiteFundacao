const EMAIL_CONTATO = 'associacaofundacaofteixeira@gmail.com';

// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible'); observer.unobserve(e.target);} });
}, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAVBAR MOBILE =====
const navLinks = document.getElementById('navLinks');
const menu = navLinks.closest('.menu');
const hamburger = document.getElementById('hamburger');
function setMenu(open) {
  menu.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', open);
  hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
}
hamburger.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
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

// ===== DESTAQUES (CARROSSEL) =====
// Troca só quando a pessoa clica: sem passagem automática
const heroTrilho = document.getElementById('heroTrilho');
const heroSlides = heroTrilho.querySelectorAll('.hero-slide');
const heroPontos = document.querySelectorAll('.hero-pontos button');
let heroAtual = 0;
function irPara(indice) {
  heroAtual = (indice + heroSlides.length) % heroSlides.length;
  heroTrilho.style.transform = `translateX(-${heroAtual * 100}%)`;
  heroSlides.forEach((slide, i) => {
    const ativo = i === heroAtual;
    slide.setAttribute('aria-hidden', !ativo);
    // Links e botões de slides escondidos saem da ordem do Tab
    slide.querySelectorAll('a, button').forEach(el => el.tabIndex = ativo ? 0 : -1);
  });
  heroPontos.forEach((p, i) => p.setAttribute('aria-selected', i === heroAtual));
}
document.querySelector('.hero-anterior').addEventListener('click', () => irPara(heroAtual - 1));
document.querySelector('.hero-proximo').addEventListener('click', () => irPara(heroAtual + 1));
heroPontos.forEach((p, i) => p.addEventListener('click', () => irPara(i)));
let toqueInicio = null;
heroTrilho.addEventListener('touchstart', e => {toqueInicio = e.touches[0].clientX;}, {passive: true});
heroTrilho.addEventListener('touchend', e => {
  if (toqueInicio === null) return;
  const delta = e.changedTouches[0].clientX - toqueInicio;
  if (Math.abs(delta) > 50) irPara(heroAtual + (delta < 0 ? 1 : -1));
  toqueInicio = null;
});
irPara(0);

// ===== GALERIA (LIGHTBOX) =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
function abrirFoto(item) {
  const img = item.querySelector('img');
  if (!img || !lightbox.showModal) return;
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.querySelector('figcaption').textContent;
  lightbox.showModal();
}
document.querySelectorAll('.galeria-item, .midia-item[role="button"]').forEach(item => {
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
const contatoForm = document.getElementById('contatoForm');
const botaoEnviar = contatoForm.querySelector('button[type="submit"]');

// Plano B quando o Netlify Forms não responde (ex.: site aberto pelo GitHub Pages)
function abrirEmail(assunto, corpo) {
  window.location.href = `mailto:${EMAIL_CONTATO}?subject=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;
  mostrarToast(`✉️ Abrindo seu aplicativo de e-mail… Se não abrir, escreva para ${EMAIL_CONTATO}`);
}

contatoForm.addEventListener('submit', async e => {
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

  botaoEnviar.disabled = true;
  try {
    const resposta = await fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams(new FormData(contatoForm)).toString()
    });
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    contatoForm.reset();
    mostrarToast('✅ Mensagem enviada! Responderemos em breve pelo seu e-mail.');
  } catch {
    abrirEmail(assunto, corpo);
  } finally {
    botaoEnviar.disabled = false;
  }
});

// ===== AVISOS COM DATA DE VALIDADE =====
// Elementos com data-ate="AAAA-MM-DD" somem sozinhos depois dessa data
document.querySelectorAll('[data-ate]').forEach(el => {
  if (new Date() > new Date(el.dataset.ate + 'T23:59:59')) el.hidden = true;
});

document.getElementById('ano').textContent = new Date().getFullYear();
