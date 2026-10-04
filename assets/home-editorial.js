const menuToggle = document.querySelector('.menu-toggle');
// Keep the compact navigation usable with touch and keyboard input.
const mobileNav = document.getElementById('mobileNav');

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
  mobileNav.classList.toggle('open', open);
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});
mobileNav.addEventListener('click', event => {
  if (event.target.closest('a')) setMenu(false);
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header') && menuToggle.getAttribute('aria-expanded') === 'true') setMenu(false);
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});
window.addEventListener('resize', () => {
  if (innerWidth > 1080) setMenu(false);
});

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.explore-card, .about-section, .closing-note').forEach(section => {
    if (section.getBoundingClientRect().top < innerHeight) return;
    section.classList.add('reveal-pending');
    observer.observe(section);
  });
  motionPreference.addEventListener('change', event => {
    if (!event.matches) return;
    document.querySelectorAll('.reveal-pending').forEach(section => section.classList.add('is-revealed'));
    observer.disconnect();
  });
}

(async () => {
  if (!window.supabase) return;
  try {
    const client = window.supabase.createClient(
      'https://zbgvgzzaejaxrgcjjovc.supabase.co',
      'sb_publishable_gCLTB6WM95Iw6Txcf2fjCA_5fnXPw77'
    );
    const { data } = await client.auth.getSession();
    if (!data?.session) return;
    for (const id of ['accountLink', 'mobileAccountLink']) {
      const link = document.getElementById(id);
      link.textContent = 'Your account';
      link.href = 'login/app/loggedin.html';
    }
  } catch (error) {
    // The public page remains available while authentication is unavailable.
  }
})();
