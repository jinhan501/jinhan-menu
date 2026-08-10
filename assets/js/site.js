const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? '關閉選單' : '開啟選單');
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', '開啟選單');
    }
  });
}

const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a').forEach((link) => {
  const href = link.getAttribute('href');
  if (href === path || (path === '' && href === 'index.html')) {
    link.setAttribute('aria-current', 'page');
  }
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealNodes.forEach((node) => observer.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add('is-visible'));
}
