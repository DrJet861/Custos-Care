/* CUSTOS Protection V16.2 – validate client-side, then POST multipart to FormSubmit. */
(() => {
  'use strict';
  const form=document.getElementById('protectionInquiry');
  if(!form)return;
  const branches=[...form.querySelectorAll('[data-branch]')];
  const error=document.getElementById('protectionFormError');
  const photos=document.getElementById('protectionPhotos');
  const photoInputs=[...form.querySelectorAll('input[type="file"][name^="attachment"]')];
  const photoHelp=document.getElementById('photoHelp');
  const customPanels=document.getElementById('customPanelsWrap');
  const interiorOptions=document.getElementById('interiorOptions');
  const interior=form.elements.namedItem('interior');
  const exterior=()=>form.querySelector('input[name="exteriorPackage"]:checked')?.value||'';
  const activeType=()=>form.querySelector('input[name="projectType"]:checked')?.value||'vehicle';
  function clearError(){error.hidden=true;error.textContent='';}
  function updateOptions(){
    const veh=activeType()==='vehicle';
    const custom=veh&&exterior()==='Individuelle Bauteile';
    customPanels.hidden=!custom;
    customPanels.querySelectorAll('textarea').forEach(input=>{input.disabled=!custom;input.required=custom;});
    const intr=veh&&interior.checked;
    interiorOptions.hidden=!intr;
    interiorOptions.querySelectorAll('input,textarea').forEach(input=>{input.disabled=!intr;});
    clearError();
  }
  function toggleBranch(){
    const current=activeType();
    branches.forEach(b=>{
      const active=b.dataset.branch===current;
      b.hidden=!active;
      b.querySelectorAll('input,select,textarea').forEach(el=>{el.disabled=!active;});
    });
    updateOptions();
  }
  form.querySelectorAll('input[name="projectType"]').forEach(el=>el.addEventListener('change',toggleBranch));
  form.querySelectorAll('input[name="exteriorPackage"]').forEach(el=>el.addEventListener('change',updateOptions));
  interior.addEventListener('change',updateOptions);
  const maxPhotos=5, maxBytes=10*1024*1024;
  const allFiles=()=>photoInputs.flatMap(inp=>[...inp.files]);
  function photoValid(){
    const files=allFiles();
    const total=files.reduce((n,f)=>n+f.size,0);
    return files.length<=maxPhotos && total<=maxBytes && files.every(f=>f.size<=maxBytes && ['image/jpeg','image/png','image/webp'].includes(f.type));
  }
  photoInputs.forEach(inp=>inp.addEventListener('change',()=>{
    const files=allFiles();
    const valid=photoValid();
    photoHelp.classList.toggle('v14-invalid',!valid);
    photoHelp.textContent=!valid?'Bitte Fotos korrigieren: höchstens 5 JPG-/PNG-/WebP-Bilder mit insgesamt maximal 10 MB.':files.length?`${files.length} Foto(s) ausgewählt · ${(files.reduce((n,f)=>n+f.size,0)/1048576).toFixed(1)} MB insgesamt.`:'Optional: bis zu 5 Fotos, zusammen maximal 10 MB.';
    clearError();
  }));
  form.addEventListener('submit',ev=>{
    clearError();
    let msg='',target=null;
    if(activeType()==='vehicle' && exterior()==='Keine Aussenfolierung' && !interior.checked){
      msg='Bitte für eine reine Innenraumanfrage «Auch Innenraumfolierung anfragen» auswählen.'; target=interior;
    } else if(!photoValid()){
      msg='Bitte Bilder korrigieren: maximal 5 JPG/PNG/WebP, zusammen höchstens 10 MB.';target=photos;
    } else if(!form.checkValidity()){
      msg='Bitte die Pflichtfelder vollständig ausfüllen und die E-Mail-Adresse prüfen.';
      target=[...form.querySelectorAll('input,select,textarea')].find(e=>!e.disabled&&!e.checkValidity());
    }
    if(msg){ev.preventDefault();error.hidden=false;error.textContent=msg;target?.focus();target?.scrollIntoView({behavior:'smooth',block:'center'});}
  });
  toggleBranch();
})();
