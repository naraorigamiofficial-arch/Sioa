(function () {
  var path = location.pathname.toLowerCase();
  var page = path.indexOf('vagh2026') >= 0 ? 'competition' : path.indexOf('blog') >= 0 ? 'journal' : path.indexOf('artist') >= 0 || path.indexOf('net') >= 0 || path.indexOf('members') >= 0 || path.indexOf('publicprofile') >= 0 ? 'artists' : path.indexOf('login') >= 0 || path.indexOf('dashbord') >= 0 || path.indexOf('reset') >= 0 ? 'account' : 'home';
  document.body.classList.add('sioa-archive-page');
  document.body.dataset.sioaPage = page;
  document.querySelectorAll('a').forEach(function (link) {
    var label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    if (label === 'competition' || link.dataset.i18n === 'competition') {
      link.setAttribute('href', '/Vagh2026/about.html');
    }
  });
  var motif = document.createElement('div');
  motif.className = 'sioa-motif';
  motif.setAttribute('aria-hidden', 'true');
  var motifs = {
    competition: '<path d="M50 8 92 50 50 92 8 50Z"/><path d="M50 20 80 50 50 80 20 50Z"/><circle cx="50" cy="50" r="10"/><path d="M8 50h84M50 8v84"/>',
    journal: '<rect x="14" y="14" width="72" height="72"/><rect x="25" y="25" width="50" height="50"/><path d="M14 32h72M32 14v72M68 14v72M14 68h72"/><circle cx="50" cy="50" r="9"/>',
    artists: '<path d="M50 7c14 17 14 29 0 43C36 36 36 24 50 7ZM50 93c14-17 14-29 0-43-14 14-14 26 0 43ZM7 50c17-14 29-14 43 0-14 14-26 14-43 0ZM93 50c-17-14-29-14-43 0 14 14 26 14 43 0Z"/><circle cx="50" cy="50" r="7"/>',
    account: '<rect x="12" y="12" width="76" height="76"/><path d="M12 12 50 50 88 12M12 88 50 50 88 88"/><circle cx="50" cy="50" r="12"/>',
    home: '<circle cx="50" cy="50" r="38"/><path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77"/><circle cx="50" cy="50" r="9"/>'
  };
  motif.innerHTML = '<svg viewBox="0 0 100 100" role="presentation"><g class="motif-core">' + motifs[page] + '</g></svg>';
  document.body.appendChild(motif);

  var select = document.createElement('select');
  select.id = 'sioaLanguage';
  select.className = 'sioa-language';
  select.setAttribute('aria-label', 'Choose language');
  select.innerHTML = '<option value="en">English</option><option value="hi">हिन्दी</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option>';
  select.value = localStorage.getItem('sioa-language') || 'en';
  select.addEventListener('change', function () {
    localStorage.setItem('sioa-language', select.value);
    document.documentElement.lang = select.value;
    applyCommonLanguage(select.value);
    window.dispatchEvent(new CustomEvent('sioa:languagechange', { detail: { language: select.value } }));
  });
  var nav = document.querySelector('nav');
  if (nav) {
    var controls = document.createElement('div');
    controls.className = 'sioa-controls';
    controls.appendChild(select);
    var controlsHost = nav.querySelector('.nav-right') || nav.querySelector('.nav-container, .topbar-inner, .nav-inner, .bar-inner') || nav;
    controlsHost.appendChild(controls);
  }

  var common = {
    hi: { About:'परिचय', Home:'मुखपृष्ठ', Platform:'मंच', Competition:'प्रतियोगिता', Connect:'जुड़ें', Login:'प्रवेश', Logout:'बाहर निकलें', Donate:'सहयोग दें', Resources:'संसाधन', Artists:'कलाकार', Explore:'अन्वेषण', Gallery:'दीर्घा', Submit:'प्रस्तुत करें', Standings:'स्थान सूची', 'Browse Artists':'कलाकार देखें', 'Founding Core':'संस्थापक मंडल', 'Educational Blog':'शैक्षिक पत्रिका', 'Folding Diagrams':'तह आरेख', 'Video Tutorials':'वीडियो मार्गदर्शन', 'Certification Programmes':'प्रमाणन कार्यक्रम', 'Our Philosophy':'हमारा दर्शन', 'The Prizes':'पुरस्कार', 'Competition Entries':'प्रतियोगिता प्रविष्टियाँ', 'Support Our Mission':'हमारे ध्येय का समर्थन करें', 'Your Competition Profile':'आपकी प्रतियोगिता प्रोफ़ाइल', 'Set New Password':'नया पासवर्ड बनाएँ', 'VAGH 2026 Judging':'VAGH 2026 निर्णयन', 'Entry Received':'प्रविष्टि प्राप्त हुई', 'Entry Not Found':'प्रविष्टि नहीं मिली', 'Artist Not Found':'कलाकार नहीं मिला', 'No artist selected':'कोई कलाकार नहीं चुना गया', 'Join SIOA':'SIOA से जुड़ें', 'View the work':'कृतियाँ देखें', 'Create your profile':'अपनी प्रोफ़ाइल बनाएँ' },
    ta: { About:'அறிமுகம்', Home:'முகப்பு', Platform:'தளம்', Competition:'போட்டி', Connect:'இணைவு', Login:'உள்நுழைவு', Logout:'வெளியேறு', Donate:'ஆதரவு', Resources:'வளங்கள்', Artists:'கலைஞர்கள்', Explore:'ஆராயுங்கள்', Gallery:'காட்சியகம்', Submit:'சமர்ப்பிக்கவும்', Standings:'தரவரிசை', 'Browse Artists':'கலைஞர்களைப் பாருங்கள்', 'Founding Core':'நிறுவனர் குழு', 'Educational Blog':'கல்வி இதழ்', 'Folding Diagrams':'மடிப்பு வரைபடங்கள்', 'Video Tutorials':'காணொளி பயிற்சிகள்', 'Certification Programmes':'சான்றிதழ் திட்டங்கள்', 'Our Philosophy':'எங்கள் தத்துவம்', 'The Prizes':'பரிசுகள்', 'Competition Entries':'போட்டி படைப்புகள்', 'Support Our Mission':'எங்கள் நோக்கத்தை ஆதரிக்கவும்', 'Your Competition Profile':'உங்கள் போட்டி சுயவிவரம்', 'Set New Password':'புதிய கடவுச்சொல்லை அமைக்கவும்', 'VAGH 2026 Judging':'VAGH 2026 மதிப்பீடு', 'Entry Received':'படைப்பு பெறப்பட்டது', 'Entry Not Found':'படைப்பு கிடைக்கவில்லை', 'Artist Not Found':'கலைஞர் கிடைக்கவில்லை', 'No artist selected':'கலைஞர் தேர்ந்தெடுக்கப்படவில்லை', 'Join SIOA':'SIOA-வில் சேருங்கள்', 'View the work':'படைப்புகளைப் பாருங்கள்', 'Create your profile':'உங்கள் சுயவிவரத்தை உருவாக்குங்கள்' },
    te: { About:'పరిచయం', Home:'ముఖపుట', Platform:'వేదిక', Competition:'పోటీ', Connect:'కలవండి', Login:'లాగిన్', Logout:'లాగ్ అవుట్', Donate:'మద్దతు', Resources:'వనరులు', Artists:'కళాకారులు', Explore:'అన్వేషించండి', Gallery:'ప్రదర్శనశాల', Submit:'సమర్పించండి', Standings:'స్థానాలు', 'Browse Artists':'కళాకారులను చూడండి', 'Founding Core':'వ్యవస్థాపక బృందం', 'Educational Blog':'విద్యా పత్రిక', 'Folding Diagrams':'మడత రేఖాచిత్రాలు', 'Video Tutorials':'వీడియో పాఠాలు', 'Certification Programmes':'ధ్రువీకరణ కార్యక్రమాలు', 'Our Philosophy':'మా తత్వం', 'The Prizes':'బహుమతులు', 'Competition Entries':'పోటీ సమర్పణలు', 'Support Our Mission':'మా లక్ష్యానికి మద్దతివ్వండి', 'Your Competition Profile':'మీ పోటీ ప్రొఫైల్', 'Set New Password':'కొత్త పాస్‌వర్డ్ పెట్టండి', 'VAGH 2026 Judging':'VAGH 2026 నిర్ణయ ప్రక్రియ', 'Entry Received':'సమర్పణ అందింది', 'Entry Not Found':'సమర్పణ కనబడలేదు', 'Artist Not Found':'కళాకారుడు కనబడలేదు', 'No artist selected':'కళాకారుడు ఎంపిక కాలేదు', 'Join SIOA':'SIOAలో చేరండి', 'View the work':'కృతులను చూడండి', 'Create your profile':'మీ ప్రొఫైల్ సృష్టించండి' },
    mr: { About:'परिचय', Home:'मुख्यपृष्ठ', Platform:'मंच', Competition:'स्पर्धा', Connect:'जोडा', Login:'प्रवेश', Logout:'बाहेर पडा', Donate:'सहाय्य करा', Resources:'संसाधने', Artists:'कलाकार', Explore:'अन्वेषण', Gallery:'कलादालन', Submit:'सादर करा', Standings:'क्रमवारी', 'Browse Artists':'कलाकार पहा', 'Founding Core':'संस्थापक मंडळ', 'Educational Blog':'शैक्षणिक पत्रिका', 'Folding Diagrams':'घडी आकृत्या', 'Video Tutorials':'व्हिडिओ मार्गदर्शिका', 'Certification Programmes':'प्रमाणपत्र कार्यक्रम', 'Our Philosophy':'आमचे तत्त्वज्ञान', 'The Prizes':'पारितोषिके', 'Competition Entries':'स्पर्धा प्रवेशिका', 'Support Our Mission':'आमच्या ध्येयाला साथ द्या', 'Your Competition Profile':'तुमची स्पर्धा प्रोफाइल', 'Set New Password':'नवा संकेतशब्द ठेवा', 'VAGH 2026 Judging':'VAGH 2026 परीक्षण', 'Entry Received':'प्रवेशिका प्राप्त झाली', 'Entry Not Found':'प्रवेशिका सापडली नाही', 'Artist Not Found':'कलाकार सापडला नाही', 'No artist selected':'कलाकार निवडलेला नाही', 'Join SIOA':'SIOA मध्ये सामील व्हा', 'View the work':'कृती पहा', 'Create your profile':'तुमचे प्रोफाइल तयार करा' }
  };
  function applyCommonLanguage(lang) {
    var dict = common[lang] || {};
    document.querySelectorAll('a,button,h1,h2,h3,h4,p,span,label').forEach(function (node) {
      if (node.children.length) return;
      var original = node.dataset.sioaOriginal || node.textContent.trim();
      node.dataset.sioaOriginal = original;
      if (lang === 'en') node.textContent = original;
      else if (dict[original]) node.textContent = dict[original];
    });
    var languageLabels = {
      en: 'Choose language', hi: 'भाषा चुनें', ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      te: 'భాషను ఎంచుకోండి', mr: 'भाषा निवडा'
    };
    select.setAttribute('aria-label', languageLabels[lang] || languageLabels.en);
  }
  document.documentElement.lang = select.value;
  applyCommonLanguage(select.value);
  window.dispatchEvent(new CustomEvent('sioa:languagechange', { detail: { language: select.value } }));
})();
