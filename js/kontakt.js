/* CUSTOS Kontakt V16.2 – HTML form POST to FormSubmit; no fake success message. */
(() => {
  'use strict';
  const choices = [...document.querySelectorAll('.v16-choice[data-route]')];
  const panels = [...document.querySelectorAll('.v16-panel[data-panel]')];
  if (!choices.length || !panels.length) return;
  const params = new URLSearchParams(window.location.search);
  const validRoutes = new Set(['care','protection','allgemein']);
  const validPlans = new Set(['care','pro','elite','unsicher']);
  const plan = document.getElementById('carePlan');
  function selectRoute(route, jump=false) {
    const selected = validRoutes.has(route) ? route : 'care';
    choices.forEach(b => {
      const active = b.dataset.route === selected;
      b.classList.toggle('is-selected',active);
      b.setAttribute('aria-pressed',String(active));
    });
    panels.forEach(panel => {
      const active = panel.dataset.panel === selected;
      panel.hidden = !active;
      panel.querySelectorAll('input, select, textarea, button').forEach(el => {el.disabled = !active;});
    });
    if (jump) document.getElementById('kontaktformular')?.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  choices.forEach(b => b.addEventListener('click',()=>selectRoute(b.dataset.route,true)));
  if (plan && validPlans.has(params.get('paket'))) plan.value = params.get('paket');
  selectRoute((params.get('bereich')||'care').toLowerCase());
  window.addEventListener('popstate',()=>{
    const q = new URLSearchParams(location.search);
    if (plan && validPlans.has(q.get('paket'))) plan.value=q.get('paket');
    selectRoute((q.get('bereich')||'care').toLowerCase());
  });
  ['careContactForm','generalContactForm'].forEach(id=>{
    const f=document.getElementById(id);
    f?.addEventListener('submit',e=>{
      if (!f.checkValidity()) {e.preventDefault();f.reportValidity();}
    });
  });
})();
