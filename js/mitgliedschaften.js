/* CUSTOS V13 — Accessible mobile membership comparison. No external libraries or requests. */
(() => {
  const plans = {"care": {"name": "CARE", "price": "CHF 650", "description": "Kontinuierliche Betreuung für ein Fahrzeug", "rows": [["Monatspreis", "CHF 650"], ["Fahrzeuge", "1"], ["Persönliche Einsätze / Monat", "2"], ["Monatliche Fahrzeugpflege", "1, im Kontingent"], ["Übertragbare Einsätze", "1 · max. 3 im Folgemonat"], ["Terminplanung", "Regulär"], ["Jahresanalyse je Fahrzeug", "–"], ["Collection Management", "–"], ["Laufende Organisation & Concierge", "Enthalten"], ["Digitale Berichte nach Einsätzen", "Enthalten"]]}, "pro": {"name": "PRO", "price": "CHF 1’390", "description": "Mehr Flexibilität für ein oder zwei Fahrzeuge", "rows": [["Monatspreis", "CHF 1’390"], ["Fahrzeuge", "1–2"], ["Persönliche Einsätze / Monat", "5"], ["Monatliche Fahrzeugpflege", "Je Fahrzeug, im Kontingent"], ["Übertragbare Einsätze", "2 · max. 7 im Folgemonat"], ["Terminplanung", "Bevorzugt"], ["Jahresanalyse je Fahrzeug", "Enthalten"], ["Collection Management", "–"], ["Laufende Organisation & Concierge", "Enthalten"], ["Digitale Berichte nach Einsätzen", "Enthalten"]]}, "elite": {"name": "ELITE", "price": "Ab CHF 2’490", "description": "Individuell vereinbartes Collection Management", "rows": [["Monatspreis", "Ab CHF 2’490"], ["Fahrzeuge", "Individuell vereinbart"], ["Persönliche Einsätze / Monat", "Unbegrenzt¹"], ["Monatliche Fahrzeugpflege", "Nach vereinbartem Bedarf¹"], ["Übertragbare Einsätze", "Keine feste Monatsquote"], ["Terminplanung", "Höchste Priorität"], ["Jahresanalyse je Fahrzeug", "Enthalten"], ["Collection Management", "Enthalten"], ["Laufende Organisation & Concierge", "Enthalten"], ["Digitale Berichte nach Einsätzen", "Enthalten"]]}};
  const tabs = Array.from(document.querySelectorAll('.v13-tabs [role="tab"]'));
  const panel = document.getElementById('v13-selected-panel');
  const rows = document.getElementById('v13-selected-rows');
  if (!tabs.length || !panel || !rows) return;
  const text = (id, value) => { const el = document.getElementById(id); if(el) el.textContent=value; };
  const render = (key, focus = false) => {
    const plan = plans[key]; if(!plan) return;
    tabs.forEach(tab => { const selected=tab.dataset.plan === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex=selected?0:-1; if(selected && focus) tab.focus(); });
    panel.setAttribute('aria-labelledby', 'v13-tab-'+key);
    text('v13-selected-name', plan.name); text('v13-selected-price', plan.price); text('v13-selected-description',plan.description);
    rows.replaceChildren();
    plan.rows.forEach(([label,value]) => {const row=document.createElement('div'); const dt=document.createElement('dt');const dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);rows.append(row);});
  };
  tabs.forEach((tab,i) => {
    tab.addEventListener('click',()=>render(tab.dataset.plan));
    tab.addEventListener('keydown',e=>{ if(!['ArrowRight','ArrowLeft','Home','End'].includes(e.key))return; e.preventDefault(); const index=e.key==='Home'?0:e.key==='End'?tabs.length-1:(i+(e.key==='ArrowRight'?1:-1)+tabs.length)%tabs.length; render(tabs[index].dataset.plan,true); });
  });
  render('care');
})();
