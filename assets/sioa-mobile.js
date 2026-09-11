(function () {
  const asset = new URL(document.currentScript.src);
  const root = new URL('../', asset);
  const mobileCopy = {
    hi:{Menu:'मेनू',Close:'बंद करें',Explore:'खोजें',Home:'मुखपृष्ठ',Artists:'कलाकार',Magazine:'पत्रिका','About SIOA':'SIOA परिचय',Competition:'प्रतियोगिता',Overview:'परिचय',Entries:'प्रविष्टियाँ',Leaderboard:'अंक तालिका','My account':'मेरा खाता',Language:'भाषा'},
    ta:{Menu:'பட்டி',Close:'மூடுக',Explore:'ஆராயுங்கள்',Home:'முகப்பு',Artists:'கலைஞர்கள்',Magazine:'இதழ்','About SIOA':'SIOA பற்றி',Competition:'போட்டி',Overview:'அறிமுகம்',Entries:'படைப்புகள்',Leaderboard:'தரவரிசை','My account':'என் கணக்கு',Language:'மொழி'},
    te:{Menu:'మెనూ',Close:'మూసివేయి',Explore:'అన్వేషించండి',Home:'ముఖపుట',Artists:'కళాకారులు',Magazine:'పత్రిక','About SIOA':'SIOA గురించి',Competition:'పోటీ',Overview:'పరిచయం',Entries:'సమర్పణలు',Leaderboard:'ర్యాంకుల పట్టిక','My account':'నా ఖాతా',Language:'భాష'},
    mr:{Menu:'मेनू',Close:'बंद करा',Explore:'अन्वेषण',Home:'मुख्यपृष्ठ',Artists:'कलाकार',Magazine:'पत्रिका','About SIOA':'SIOA विषयी',Competition:'स्पर्धा',Overview:'परिचय',Entries:'प्रवेशिका',Leaderboard:'गुणतालिका','My account':'माझे खाते',Language:'भाषा'}
  };
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('sioa-mobile.css', asset).href;
  document.head.appendChild(css);
  const bar = document.createElement('div');
  bar.className = 'sioa-mobilebar';
  const logo = document.createElement('a');
  const isDraft = location.pathname.toLowerCase().startsWith('/draft/');
  logo.href = isDraft ? new URL('draft/', root).href : root.href;
  logo.textContent = 'SIOA';
  logo.setAttribute('aria-label', 'SIOA home');
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = 'Menu';
  toggle.dataset.mobileKey = 'Menu';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'sioaMobileDialog');
  bar.append(logo, toggle);
  const dialog = document.createElement('dialog');
  dialog.id = 'sioaMobileDialog';
  dialog.className = 'sioa-mobile-dialog';
  dialog.setAttribute('aria-label', 'Site navigation');
  const heading = document.createElement('div');
  heading.className = 'sioa-menu-heading';
  const mark = document.createElement('strong');
  mark.textContent = 'SIOA';
  const close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close';
  close.dataset.mobileKey = 'Close';
  heading.append(mark, close);
  const nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Mobile navigation');
  const groups = [
    ['Explore', [
      ['Home', isDraft ? 'draft/' : 'index.html'],
      ['Artists', 'net/index.html'],
      ['Magazine', 'Blog/index.html'],
      ['About SIOA', isDraft ? 'draft/#about' : 'index.html#about'],
    ]],
    ['Competition', [
      ['Overview', 'Vagh2026/about.html'],
      ['Entries', 'Vagh2026/gallery.html'],
      ['Leaderboard', 'Vagh2026/leaderboard.html'],
    ]],
  ];
  const makeLink = ([text, path]) => {
    const a=document.createElement('a');a.textContent=text;a.href=new URL(path,root).href;
    a.dataset.mobileKey=text;
    if(a.pathname===location.pathname && (!a.hash || a.hash===location.hash))a.setAttribute('aria-current','page');
    return a;
  };
  const details=[];
  groups.forEach(([label, links]) => {
    const group=document.createElement('details');
    const summary=document.createElement('summary');summary.textContent=label;summary.dataset.mobileKey=label;
    const list=document.createElement('div');list.className='sioa-menu-links';
    links.forEach(link=>list.appendChild(makeLink(link)));
    group.append(summary,list);nav.appendChild(group);details.push(group);
  });
  const account=makeLink(['My account','login/app/loggedin.html']);account.className='sioa-menu-account';nav.appendChild(account);
  details.forEach(group=>group.addEventListener('toggle',()=>{if(group.open)details.forEach(other=>{if(other!==group)other.open=false})}));
  dialog.append(heading, nav);
  const originalLanguage=document.getElementById('sioaLanguage');
  if(originalLanguage){
    const label=document.createElement('label');label.className='sioa-menu-language';label.textContent='Language';label.dataset.mobileKey='Language';
    const select=originalLanguage.cloneNode(true);select.id='sioaMobileLanguage';
    select.value=originalLanguage.value;
    select.addEventListener('change',()=>{originalLanguage.value=select.value;originalLanguage.dispatchEvent(new Event('change',{bubbles:true}));});
    label.appendChild(select);dialog.appendChild(label);
  }
  document.body.append(bar,dialog);
  const applyMobileLanguage = language => {
    const dict=mobileCopy[language]||{};
    document.querySelectorAll('[data-mobile-key]').forEach(element=>{const key=element.dataset.mobileKey;element.childNodes[0].nodeValue=(dict[key]||key);});
  };
  applyMobileLanguage(localStorage.getItem('sioa-language')||'en');
  window.addEventListener('sioa:languagechange',event=>applyMobileLanguage(event.detail.language));
  let previousOverflow='';
  toggle.addEventListener('click',()=>{previousOverflow=document.body.style.overflow;dialog.showModal();document.body.style.overflow='hidden';toggle.setAttribute('aria-expanded','true');});
  close.addEventListener('click',()=>dialog.close());
  nav.addEventListener('click',event=>{if(event.target.closest('a'))dialog.close();});
  dialog.addEventListener('click',event=>{if(event.target===dialog && event.clientY>dialog.getBoundingClientRect().bottom)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;toggle.setAttribute('aria-expanded','false');toggle.focus({preventScroll:true});});
  matchMedia('(max-width:920px)').addEventListener('change',event=>{if(!event.matches && dialog.open)dialog.close();});
})();
