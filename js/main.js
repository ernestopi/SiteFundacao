// ===== SCROLL REVEAL =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {if (e.isIntersecting) {e.target.classList.add('visible');} });
}, {threshold: 0.1, rootMargin: '0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== NAVBAR MOBILE =====
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {if (window.scrollY >= s.offsetTop - 100) current = s.id;});
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? 'var(--dourado)' : '';
  });
});

// ===== CONTATO FORM =====
function enviarMensagem() {
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();
  if (!nome || !email || !mensagem) {
    alert('Por favor, preencha Nome, E-mail e Mensagem.');
    return;
  }
  const assunto = document.getElementById('assunto').value || 'Contato pelo site';
  const telefone = document.getElementById('telefone').value;
  const corpo = `Nome: ${nome}%0ATelefone: ${telefone}%0AAssunto: ${assunto}%0A%0AMensagem:%0A${encodeURIComponent(mensagem)}`;
  window.location.href = `mailto:associacaoamigosdeLagoa@email.com?subject=${encodeURIComponent(assunto)}&body=${corpo}`;
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}
