const header = document.getElementById('siteHeader');
const toggle = document.getElementById('menuToggle');
const menu = document.getElementById('mobileMenu');
if (header && toggle && menu) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 28);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
  const closeMenu = () => {
    header.classList.remove('menu-open'); menu.classList.remove('open'); menu.inert = true;
    toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.style.overflow = '';
  };
  const openMenu = () => {
    header.classList.add('menu-open'); menu.inert = false; menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true'); toggle.setAttribute('aria-label', 'Menü schliessen');
    document.body.style.overflow = 'hidden';
  };
  toggle.addEventListener('click', () => menu.classList.contains('open') ? closeMenu() : openMenu());
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); }
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1023 && menu.classList.contains('open')) closeMenu();
  });
}
// Kontakt-Demoformular V5 wurde durch den zentralen Anfrageweg in V16 ersetzt.
