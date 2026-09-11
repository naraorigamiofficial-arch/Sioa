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
  var fallbackControlsHost = document.querySelector('.topbar-right, .login-actions, .bar-user, header');
  if (nav || fallbackControlsHost) {
    var controls = document.createElement('div');
    controls.className = 'sioa-controls';
    controls.appendChild(select);
    var controlsHost = nav ? (nav.querySelector('.nav-right') || nav.querySelector('.nav-container, .topbar-inner, .nav-inner, .bar-inner') || nav) : fallbackControlsHost;
    controlsHost.appendChild(controls);
  }

  var common = {
    hi: { About:'परिचय', Home:'मुखपृष्ठ', Platform:'मंच', Competition:'प्रतियोगिता', Connect:'जुड़ें', Login:'प्रवेश', Logout:'बाहर निकलें', Donate:'सहयोग दें', Resources:'संसाधन', Artists:'कलाकार', Explore:'अन्वेषण', Gallery:'दीर्घा', Submit:'प्रस्तुत करें', Standings:'स्थान सूची', 'Browse Artists':'कलाकार देखें', 'Founding Core':'संस्थापक मंडल', 'Educational Blog':'शैक्षिक पत्रिका', 'Folding Diagrams':'तह आरेख', 'Video Tutorials':'वीडियो मार्गदर्शन', 'Certification Programmes':'प्रमाणन कार्यक्रम', 'Our Philosophy':'हमारा दर्शन', 'The Prizes':'पुरस्कार', 'Competition Entries':'प्रतियोगिता प्रविष्टियाँ', 'Support Our Mission':'हमारे ध्येय का समर्थन करें', 'Your Competition Profile':'आपकी प्रतियोगिता प्रोफ़ाइल', 'Set New Password':'नया पासवर्ड बनाएँ', 'VAGH 2026 Judging':'VAGH 2026 निर्णयन', 'Entry Received':'प्रविष्टि प्राप्त हुई', 'Entry Not Found':'प्रविष्टि नहीं मिली', 'Artist Not Found':'कलाकार नहीं मिला', 'No artist selected':'कोई कलाकार नहीं चुना गया', 'Join SIOA':'SIOA से जुड़ें', 'View the work':'कृतियाँ देखें', 'Create your profile':'अपनी प्रोफ़ाइल बनाएँ' },
    ta: { About:'அறிமுகம்', Home:'முகப்பு', Platform:'தளம்', Competition:'போட்டி', Connect:'இணைவு', Login:'உள்நுழைவு', Logout:'வெளியேறு', Donate:'ஆதரவு', Resources:'வளங்கள்', Artists:'கலைஞர்கள்', Explore:'ஆராயுங்கள்', Gallery:'காட்சியகம்', Submit:'சமர்ப்பிக்கவும்', Standings:'தரவரிசை', 'Browse Artists':'கலைஞர்களைப் பாருங்கள்', 'Founding Core':'நிறுவனர் குழு', 'Educational Blog':'கல்வி இதழ்', 'Folding Diagrams':'மடிப்பு வரைபடங்கள்', 'Video Tutorials':'காணொளி பயிற்சிகள்', 'Certification Programmes':'சான்றிதழ் திட்டங்கள்', 'Our Philosophy':'எங்கள் தத்துவம்', 'The Prizes':'பரிசுகள்', 'Competition Entries':'போட்டி படைப்புகள்', 'Support Our Mission':'எங்கள் நோக்கத்தை ஆதரிக்கவும்', 'Your Competition Profile':'உங்கள் போட்டி சுயவிவரம்', 'Set New Password':'புதிய கடவுச்சொல்லை அமைக்கவும்', 'VAGH 2026 Judging':'VAGH 2026 மதிப்பீடு', 'Entry Received':'படைப்பு பெறப்பட்டது', 'Entry Not Found':'படைப்பு கிடைக்கவில்லை', 'Artist Not Found':'கலைஞர் கிடைக்கவில்லை', 'No artist selected':'கலைஞர் தேர்ந்தெடுக்கப்படவில்லை', 'Join SIOA':'SIOA-வில் சேருங்கள்', 'View the work':'படைப்புகளைப் பாருங்கள்', 'Create your profile':'உங்கள் சுயவிவரத்தை உருவாக்குங்கள்' },
    te: { About:'పరిచయం', Home:'ముఖపుట', Platform:'వేదిక', Competition:'పోటీ', Connect:'కలవండి', Login:'లాగిన్', Logout:'లాగ్ అవుట్', Donate:'మద్దతు', Resources:'వనరులు', Artists:'కళాకారులు', Explore:'అన్వేషించండి', Gallery:'ప్రదర్శనశాల', Submit:'సమర్పించండి', Standings:'స్థానాలు', 'Browse Artists':'కళాకారులను చూడండి', 'Founding Core':'వ్యవస్థాపక బృందం', 'Educational Blog':'విద్యా పత్రిక', 'Folding Diagrams':'మడత రేఖాచిత్రాలు', 'Video Tutorials':'వీడియో పాఠాలు', 'Certification Programmes':'ధ్రువీకరణ కార్యక్రమాలు', 'Our Philosophy':'మా తత్వం', 'The Prizes':'బహుమతులు', 'Competition Entries':'పోటీ సమర్పణలు', 'Support Our Mission':'మా లక్ష్యానికి మద్దతివ్వండి', 'Your Competition Profile':'మీ పోటీ ప్రొఫైల్', 'Set New Password':'కొత్త పాస్‌వర్డ్ పెట్టండి', 'VAGH 2026 Judging':'VAGH 2026 నిర్ణయ ప్రక్రియ', 'Entry Received':'సమర్పణ అందింది', 'Entry Not Found':'సమర్పణ కనబడలేదు', 'Artist Not Found':'కళాకారుడు కనబడలేదు', 'No artist selected':'కళాకారుడు ఎంపిక కాలేదు', 'Join SIOA':'SIOAలో చేరండి', 'View the work':'కృతులను చూడండి', 'Create your profile':'మీ ప్రొఫైల్ సృష్టించండి' },
    mr: { About:'परिचय', Home:'मुख्यपृष्ठ', Platform:'मंच', Competition:'स्पर्धा', Connect:'जोडा', Login:'प्रवेश', Logout:'बाहेर पडा', Donate:'सहाय्य करा', Resources:'संसाधने', Artists:'कलाकार', Explore:'अन्वेषण', Gallery:'कलादालन', Submit:'सादर करा', Standings:'क्रमवारी', 'Browse Artists':'कलाकार पहा', 'Founding Core':'संस्थापक मंडळ', 'Educational Blog':'शैक्षणिक पत्रिका', 'Folding Diagrams':'घडी आकृत्या', 'Video Tutorials':'व्हिडिओ मार्गदर्शिका', 'Certification Programmes':'प्रमाणपत्र कार्यक्रम', 'Our Philosophy':'आमचे तत्त्वज्ञान', 'The Prizes':'पारितोषिके', 'Competition Entries':'स्पर्धा प्रवेशिका', 'Support Our Mission':'आमच्या ध्येयाला साथ द्या', 'Your Competition Profile':'तुमची स्पर्धा प्रोफाइल', 'Set New Password':'नवा संकेतशब्द ठेवा', 'VAGH 2026 Judging':'VAGH 2026 परीक्षण', 'Entry Received':'प्रवेशिका प्राप्त झाली', 'Entry Not Found':'प्रवेशिका सापडली नाही', 'Artist Not Found':'कलाकार सापडला नाही', 'No artist selected':'कलाकार निवडलेला नाही', 'Join SIOA':'SIOA मध्ये सामील व्हा', 'View the work':'कृती पहा', 'Create your profile':'तुमचे प्रोफाइल तयार करा' }
  };
  var competitionCopy = {
    hi: {
      'Leaderboard':'अंक तालिका', 'All Entries':'सभी प्रविष्टियाँ', 'Society of Indian Origami Artists':'भारतीय ओरिगामी कलाकार संस्था',
      'National Origami Competition · 2026':'राष्ट्रीय ओरिगामी प्रतियोगिता · 2026',
      'VAGH 2026 has come to a close. Thank you to every folder who took part, judging is complete and the results are in.':'VAGH 2026 संपन्न हो चुका है। भाग लेने वाले हर फोल्डर का धन्यवाद। निर्णयन पूरा हो गया है और परिणाम घोषित हैं।',
      'Results are live.':'परिणाम घोषित हैं।', "See the final rankings on the leaderboard, or browse every entry from this year's competition.":'अंतिम क्रम अंक तालिका में देखें या इस वर्ष की सभी प्रविष्टियाँ देखें।',
      'View Leaderboard':'अंक तालिका देखें', 'Browse All Entries':'सभी प्रविष्टियाँ देखें', 'Scroll':'नीचे जाएँ', 'About VAGH':'VAGH का परिचय',
      '"Great origami is not about making more folds. It is about making the right ones."':'“श्रेष्ठ ओरिगामी अधिक तहों से नहीं, सही तहों से बनता है।”', 'VAGH 2026 Competition Philosophy':'VAGH 2026 प्रतियोगिता दर्शन',
      'VAGH was built on a simple belief: origami should stay both':'VAGH एक सरल विश्वास पर बना है: ओरिगामी', 'accessible and respected':'सुलभ और सम्मानित',
      'as an art form. Rather than rewarding complexity for its own sake, judging looked at precision, shaping, and overall execution, so a beautifully folded traditional model could stand alongside an advanced technical piece.':'कला के रूप में बना रहे। निर्णयन ने केवल जटिलता नहीं, बल्कि शुद्धता, आकार और संपूर्ण प्रस्तुति को महत्व दिया, ताकि पारंपरिक और तकनीकी दोनों कृतियाँ साथ खड़ी हों।',
      "This was only the first edition. Thank you to every artist who folded, photographed, and shared their work. We hope to see even more of India's origami community at the next VAGH.":'यह केवल पहला संस्करण था। अपनी कृतियाँ मोड़ने, चित्रित करने और साझा करने वाले हर कलाकार का धन्यवाद। अगले VAGH में भारत के और अधिक ओरिगामी कलाकारों से मिलने की आशा है।',
      'Awards':'पुरस्कार', 'What the top three folders of VAGH 2026 took home.':'VAGH 2026 के शीर्ष तीन फोल्डरों को मिले पुरस्कार।', 'Top Prize':'सर्वोच्च पुरस्कार',
      'First Place':'प्रथम स्थान', 'Champion':'विजेता', 'Second Place':'द्वितीय स्थान', 'Runner-Up':'उपविजेता', 'Third Place':'तृतीय स्थान', 'Merit':'विशेष योग्यता',
      'A copy of':'एक प्रति', "Sampreet Manna's new book":'सम्प्रीत मन्ना की नई पुस्तक', 'Multiple large-size':'कई बड़े आकार के', 'DT papers':'DT कागज़',
      'from Nara Origami Shop':'नारा ओरिगामी शॉप से', 'Signed certificate':'हस्ताक्षरित प्रमाणपत्र', 'from SIOA':'SIOA से', 'Papers':'कागज़',
      'Official recognition & featured showcase on the platform':'आधिकारिक सम्मान और मंच पर विशेष प्रदर्शन', 'See Who Won on the Leaderboard':'अंक तालिका में विजेताओं को देखें',
      '© 2026 Society of Indian Origami Artists. All rights reserved.':'© 2026 भारतीय ओरिगामी कलाकार संस्था। सर्वाधिकार सुरक्षित।',
      "Each entry's final score is the average of three judges' weighted totals, out of 100. Judges stay anonymous, shown only as A, B and C, while judging is open.":'हर प्रविष्टि का अंतिम अंक तीन निर्णायकों के भारित अंकों का औसत है। निर्णयन के दौरान निर्णायक A, B और C के रूप में गुमनाम रहते हैं।',
      'Loading standings…':'अंक तालिका लोड हो रही है…','Rank':'स्थान','Entry':'प्रविष्टि','Judge A':'निर्णायक A','Judge B':'निर्णायक B','Judge C':'निर्णायक C','Final':'अंतिम','Refresh':'फिर लोड करें','See all entries':'सभी प्रविष्टियाँ देखें',
      'Difficulty':'कठिनाई','State':'राज्य','All':'सभी','Beginner':'आरंभिक','Intermediate':'मध्यम','Advanced':'उन्नत','Newest First':'नवीनतम पहले','Oldest First':'पुराने पहले','Artist Name A-Z':'कलाकार नाम A-Z','Model Name A-Z':'मॉडल नाम A-Z','Loading entries...':'प्रविष्टियाँ लोड हो रही हैं...','No entries found':'कोई प्रविष्टि नहीं मिली','Try adjusting your search or filter to see more results.':'अधिक परिणामों के लिए खोज या फ़िल्टर बदलें।','Model Name':'मॉडल नाम','Artist Name':'कलाकार का नाम','Designer':'डिज़ाइनर','Paper':'कागज़','Time':'समय','Artist Statement':'कलाकार वक्तव्य','Open':'खोलें'
    },
    ta: {
      'Leaderboard':'தரவரிசை', 'All Entries':'அனைத்து படைப்புகள்', 'Society of Indian Origami Artists':'இந்திய ஓரிகாமி கலைஞர்கள் சங்கம்',
      'National Origami Competition · 2026':'தேசிய ஓரிகாமி போட்டி · 2026',
      'VAGH 2026 has come to a close. Thank you to every folder who took part, judging is complete and the results are in.':'VAGH 2026 நிறைவடைந்தது. பங்கேற்ற ஒவ்வொரு மடிப்புக் கலைஞருக்கும் நன்றி. மதிப்பீடு முடிந்து முடிவுகள் வெளியாகியுள்ளன.',
      'Results are live.':'முடிவுகள் வெளியாகியுள்ளன.', "See the final rankings on the leaderboard, or browse every entry from this year's competition.":'இறுதி தரவரிசையைப் பார்க்கவும் அல்லது இந்த ஆண்டின் அனைத்து படைப்புகளையும் பார்வையிடவும்.',
      'View Leaderboard':'தரவரிசையைப் பார்க்கவும்', 'Browse All Entries':'அனைத்து படைப்புகளையும் பார்க்கவும்', 'Scroll':'கீழே செல்லவும்', 'About VAGH':'VAGH பற்றி',
      '"Great origami is not about making more folds. It is about making the right ones."':'“சிறந்த ஓரிகாமி அதிக மடிப்புகளில் இல்லை. சரியான மடிப்புகளில்தான் உள்ளது.”', 'VAGH 2026 Competition Philosophy':'VAGH 2026 போட்டித் தத்துவம்',
      'VAGH was built on a simple belief: origami should stay both':'VAGH ஒரு எளிய நம்பிக்கையில் உருவானது: ஓரிகாமி', 'accessible and respected':'அணுகத்தக்கதும் மதிக்கத்தக்கதும்',
      'as an art form. Rather than rewarding complexity for its own sake, judging looked at precision, shaping, and overall execution, so a beautifully folded traditional model could stand alongside an advanced technical piece.':'ஒரு கலைவடிவமாக இருக்க வேண்டும். சிக்கலுக்கு மட்டும் பரிசளிக்காமல், துல்லியம், வடிவமைப்பு மற்றும் முழுமையான செயலாக்கம் மதிப்பிடப்பட்டது. இதனால் பாரம்பரியமும் தொழில்நுட்பமும் சமமாக நிற்க முடிந்தது.',
      "This was only the first edition. Thank you to every artist who folded, photographed, and shared their work. We hope to see even more of India's origami community at the next VAGH.":'இது முதல் பதிப்பு மட்டுமே. தங்கள் படைப்புகளை மடித்து, படம்பிடித்து, பகிர்ந்த ஒவ்வொரு கலைஞருக்கும் நன்றி. அடுத்த VAGH இல் இந்தியாவின் மேலும் பல ஓரிகாமி கலைஞர்களை காண நம்புகிறோம்.',
      'Awards':'விருதுகள்', 'The Prizes':'பரிசுகள்', 'What the top three folders of VAGH 2026 took home.':'VAGH 2026 இன் முதல் மூன்று கலைஞர்கள் பெற்ற பரிசுகள்.', 'Top Prize':'முதன்மைப் பரிசு',
      'First Place':'முதல் இடம்', 'Champion':'வெற்றியாளர்', 'Second Place':'இரண்டாம் இடம்', 'Runner-Up':'இரண்டாம் பரிசாளர்', 'Third Place':'மூன்றாம் இடம்', 'Merit':'சிறப்பிடம்',
      'A copy of':'ஒரு பிரதியை', "Sampreet Manna's new book":'சம்ப்ரீத் மன்னாவின் புதிய புத்தகம்', 'Multiple large-size':'பல பெரிய அளவிலான', 'DT papers':'DT காகிதங்கள்',
      'from Nara Origami Shop':'நாரா ஓரிகாமி கடையிலிருந்து', 'Signed certificate':'கையொப்பமிட்ட சான்றிதழ்', 'from SIOA':'SIOA வழங்கியது', 'Papers':'காகிதங்கள்',
      'Official recognition & featured showcase on the platform':'அதிகாரப்பூர்வ அங்கீகாரமும் தளத்தில் சிறப்பு காட்சியும்', 'See Who Won on the Leaderboard':'தரவரிசையில் வெற்றியாளர்களைப் பார்க்கவும்',
      '© 2026 Society of Indian Origami Artists. All rights reserved.':'© 2026 இந்திய ஓரிகாமி கலைஞர்கள் சங்கம். அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
      "Each entry's final score is the average of three judges' weighted totals, out of 100. Judges stay anonymous, shown only as A, B and C, while judging is open.":'ஒவ்வொரு படைப்பின் இறுதி மதிப்பெண் மூன்று நடுவர்களின் எடையிட்ட மதிப்பெண்களின் சராசரி. மதிப்பீட்டின்போது நடுவர்கள் A, B, C என மறைபெயரில் இருப்பார்கள்.',
      'Loading standings…':'தரவரிசை ஏற்றப்படுகிறது…','Rank':'இடம்','Entry':'படைப்பு','Judge A':'நடுவர் A','Judge B':'நடுவர் B','Judge C':'நடுவர் C','Final':'இறுதி','Refresh':'புதுப்பிக்கவும்','See all entries':'அனைத்து படைப்புகளையும் பார்க்கவும்',
      'Difficulty':'கடினநிலை','State':'மாநிலம்','All':'அனைத்தும்','Beginner':'தொடக்கநிலை','Intermediate':'இடைநிலை','Advanced':'மேம்பட்ட','Newest First':'புதியவை முதலில்','Oldest First':'பழையவை முதலில்','Artist Name A-Z':'கலைஞர் பெயர் A-Z','Model Name A-Z':'மாதிரி பெயர் A-Z','Loading entries...':'படைப்புகள் ஏற்றப்படுகின்றன...','No entries found':'படைப்புகள் இல்லை','Try adjusting your search or filter to see more results.':'மேலும் முடிவுகளுக்கு தேடல் அல்லது வடிகட்டியை மாற்றவும்.','Model Name':'மாதிரி பெயர்','Artist Name':'கலைஞர் பெயர்','Designer':'வடிவமைப்பாளர்','Paper':'காகிதம்','Time':'நேரம்','Artist Statement':'கலைஞர் குறிப்பு','Open':'திறக்கவும்'
    },
    te: {
      'Leaderboard':'ర్యాంకుల పట్టిక', 'All Entries':'అన్ని సమర్పణలు', 'Society of Indian Origami Artists':'భారతీయ ఒరిగామి కళాకారుల సంఘం',
      'National Origami Competition · 2026':'జాతీయ ఒరిగామి పోటీ · 2026',
      'VAGH 2026 has come to a close. Thank you to every folder who took part, judging is complete and the results are in.':'VAGH 2026 ముగిసింది. పాల్గొన్న ప్రతి మడత కళాకారుడికి ధన్యవాదాలు. నిర్ణయ ప్రక్రియ పూర్తయి ఫలితాలు వెలువడ్డాయి.',
      'Results are live.':'ఫలితాలు వెలువడ్డాయి.', "See the final rankings on the leaderboard, or browse every entry from this year's competition.":'తుది ర్యాంకులను చూడండి లేదా ఈ సంవత్సరపు అన్ని సమర్పణలను వీక్షించండి.',
      'View Leaderboard':'ర్యాంకుల పట్టిక చూడండి', 'Browse All Entries':'అన్ని సమర్పణలు చూడండి', 'Scroll':'కిందికి వెళ్లండి', 'About VAGH':'VAGH గురించి',
      '"Great origami is not about making more folds. It is about making the right ones."':'“గొప్ప ఒరిగామి ఎక్కువ మడతల గురించి కాదు. సరైన మడతల గురించి.”', 'VAGH 2026 Competition Philosophy':'VAGH 2026 పోటీ తత్వం',
      'VAGH was built on a simple belief: origami should stay both':'VAGH ఒక సరళమైన నమ్మకంపై నిర్మించబడింది: ఒరిగామి', 'accessible and respected':'అందుబాటులోనూ గౌరవప్రదంగానూ',
      'as an art form. Rather than rewarding complexity for its own sake, judging looked at precision, shaping, and overall execution, so a beautifully folded traditional model could stand alongside an advanced technical piece.':'ఒక కళారూపంగా ఉండాలి. కేవలం సంక్లిష్టతను కాకుండా ఖచ్చితత్వం, ఆకృతి, మొత్తం అమలును నిర్ణయంలో పరిగణించారు. అందువల్ల సంప్రదాయ మరియు సాంకేతిక కృతులు సమానంగా నిలిచాయి.',
      "This was only the first edition. Thank you to every artist who folded, photographed, and shared their work. We hope to see even more of India's origami community at the next VAGH.":'ఇది మొదటి సంచిక మాత్రమే. తమ కృతులను మడిచి, చిత్రీకరించి, పంచుకున్న ప్రతి కళాకారుడికి ధన్యవాదాలు. తదుపరి VAGH లో భారత ఒరిగామి సమాజం మరింతగా పాల్గొనాలని ఆశిస్తున్నాం.',
      'Awards':'పురస్కారాలు', 'The Prizes':'బహుమతులు', 'What the top three folders of VAGH 2026 took home.':'VAGH 2026లో మొదటి మూడు కళాకారులు పొందిన బహుమతులు.', 'Top Prize':'ప్రధాన బహుమతి',
      'First Place':'మొదటి స్థానం', 'Champion':'విజేత', 'Second Place':'రెండవ స్థానం', 'Runner-Up':'ద్వితీయ విజేత', 'Third Place':'మూడవ స్థానం', 'Merit':'ప్రతిభా స్థానం',
      'A copy of':'ఒక ప్రతిని', "Sampreet Manna's new book":'సంప్రీత్ మన్నా కొత్త పుస్తకం', 'Multiple large-size':'అనేక పెద్ద పరిమాణపు', 'DT papers':'DT కాగితాలు',
      'from Nara Origami Shop':'నారా ఒరిగామి షాప్ నుండి', 'Signed certificate':'సంతకం చేసిన ధృవపత్రం', 'from SIOA':'SIOA నుండి', 'Papers':'కాగితాలు',
      'Official recognition & featured showcase on the platform':'అధికారిక గుర్తింపు మరియు వేదికపై ప్రత్యేక ప్రదర్శన', 'See Who Won on the Leaderboard':'ర్యాంకుల పట్టికలో విజేతలను చూడండి',
      '© 2026 Society of Indian Origami Artists. All rights reserved.':'© 2026 భారతీయ ఒరిగామి కళాకారుల సంఘం. అన్ని హక్కులు పరిరక్షించబడ్డాయి.',
      "Each entry's final score is the average of three judges' weighted totals, out of 100. Judges stay anonymous, shown only as A, B and C, while judging is open.":'ప్రతి సమర్పణ తుది స్కోరు ముగ్గురు న్యాయనిర్ణేతల బరువైన స్కోర్ల సగటు. నిర్ణయం జరుగుతున్నప్పుడు వారు A, B, C పేర్లతో గోప్యంగా ఉంటారు.',
      'Loading standings…':'ర్యాంకులు లోడ్ అవుతున్నాయి…','Rank':'స్థానం','Entry':'సమర్పణ','Judge A':'న్యాయనిర్ణేత A','Judge B':'న్యాయనిర్ణేత B','Judge C':'న్యాయనిర్ణేత C','Final':'తుది','Refresh':'తాజాకరించండి','See all entries':'అన్ని సమర్పణలు చూడండి',
      'Difficulty':'కఠినత','State':'రాష్ట్రం','All':'అన్నీ','Beginner':'ప్రారంభ','Intermediate':'మధ్యస్థ','Advanced':'ఉన్నత','Newest First':'కొత్తవి ముందు','Oldest First':'పాతవి ముందు','Artist Name A-Z':'కళాకారుడి పేరు A-Z','Model Name A-Z':'మోడల్ పేరు A-Z','Loading entries...':'సమర్పణలు లోడ్ అవుతున్నాయి...','No entries found':'సమర్పణలు లేవు','Try adjusting your search or filter to see more results.':'మరిన్ని ఫలితాల కోసం శోధన లేదా వడపోతను మార్చండి.','Model Name':'మోడల్ పేరు','Artist Name':'కళాకారుడి పేరు','Designer':'రూపకర్త','Paper':'కాగితం','Time':'సమయం','Artist Statement':'కళాకారుడి వివరణ','Open':'తెరవండి'
    },
    mr: {
      'Leaderboard':'गुणतालिका', 'All Entries':'सर्व प्रवेशिका', 'Society of Indian Origami Artists':'सोसायटी ऑफ इंडियन ओरिगामी आर्टिस्ट्स',
      'National Origami Competition · 2026':'राष्ट्रीय ओरिगामी स्पर्धा · 2026',
      'VAGH 2026 has come to a close. Thank you to every folder who took part, judging is complete and the results are in.':'VAGH 2026 पूर्ण झाली आहे. सहभागी झालेल्या प्रत्येक घडीकाराचे आभार. परीक्षण पूर्ण झाले असून निकाल जाहीर झाले आहेत.',
      'Results are live.':'निकाल जाहीर झाले आहेत.', "See the final rankings on the leaderboard, or browse every entry from this year's competition.":'अंतिम क्रम गुणतालिकेत पाहा किंवा यंदाच्या सर्व प्रवेशिका पहा.',
      'View Leaderboard':'गुणतालिका पाहा', 'Browse All Entries':'सर्व प्रवेशिका पाहा', 'Scroll':'खाली जा', 'About VAGH':'VAGH विषयी',
      '"Great origami is not about making more folds. It is about making the right ones."':'“उत्तम ओरिगामी अधिक घड्यांमध्ये नसते. ते योग्य घड्यांमध्ये असते.”', 'VAGH 2026 Competition Philosophy':'VAGH 2026 स्पर्धेचे तत्त्वज्ञान',
      'VAGH was built on a simple belief: origami should stay both':'VAGH एका साध्या विश्वासावर उभी आहे: ओरिगामी', 'accessible and respected':'सुलभ आणि सन्मानित',
      'as an art form. Rather than rewarding complexity for its own sake, judging looked at precision, shaping, and overall execution, so a beautifully folded traditional model could stand alongside an advanced technical piece.':'कला म्हणून टिकली पाहिजे. केवळ गुंतागुंतीऐवजी अचूकता, आकार आणि एकूण सादरीकरण तपासले गेले, जेणेकरून पारंपरिक आणि तांत्रिक कलाकृती समानपणे उभ्या राहतील.',
      "This was only the first edition. Thank you to every artist who folded, photographed, and shared their work. We hope to see even more of India's origami community at the next VAGH.":'ही केवळ पहिली आवृत्ती होती. कलाकृती घडवून, छायाचित्रित करून आणि सामायिक करणाऱ्या प्रत्येक कलाकाराचे आभार. पुढील VAGH मध्ये भारतातील आणखी मोठा ओरिगामी समुदाय सहभागी होईल अशी आशा आहे.',
      'Awards':'पुरस्कार', 'The Prizes':'पारितोषिके', 'What the top three folders of VAGH 2026 took home.':'VAGH 2026 मधील पहिल्या तीन घडीकारांना मिळालेली पारितोषिके.', 'Top Prize':'सर्वोच्च पारितोषिक',
      'First Place':'प्रथम क्रमांक', 'Champion':'विजेता', 'Second Place':'द्वितीय क्रमांक', 'Runner-Up':'उपविजेता', 'Third Place':'तृतीय क्रमांक', 'Merit':'गुणवत्ता स्थान',
      'A copy of':'एक प्रत', "Sampreet Manna's new book":'सम्प्रीत मन्ना यांचे नवे पुस्तक', 'Multiple large-size':'अनेक मोठ्या आकाराचे', 'DT papers':'DT कागद',
      'from Nara Origami Shop':'नारा ओरिगामी शॉपकडून', 'Signed certificate':'स्वाक्षरी केलेले प्रमाणपत्र', 'from SIOA':'SIOA कडून', 'Papers':'कागद',
      'Official recognition & featured showcase on the platform':'अधिकृत गौरव आणि मंचावर विशेष प्रदर्शन', 'See Who Won on the Leaderboard':'गुणतालिकेत विजेते पाहा',
      '© 2026 Society of Indian Origami Artists. All rights reserved.':'© 2026 सोसायटी ऑफ इंडियन ओरिगामी आर्टिस्ट्स. सर्व हक्क राखीव.',
      "Each entry's final score is the average of three judges' weighted totals, out of 100. Judges stay anonymous, shown only as A, B and C, while judging is open.":'प्रत्येक प्रवेशिकेचा अंतिम गुण तीन परीक्षकांच्या भारित गुणांची सरासरी आहे. परीक्षण सुरू असताना परीक्षक A, B आणि C म्हणून गुप्त राहतात.',
      'Loading standings…':'गुणतालिका लोड होत आहे…','Rank':'क्रमांक','Entry':'प्रवेशिका','Judge A':'परीक्षक A','Judge B':'परीक्षक B','Judge C':'परीक्षक C','Final':'अंतिम','Refresh':'पुन्हा लोड करा','See all entries':'सर्व प्रवेशिका पाहा',
      'Difficulty':'कठीणपणा','State':'राज्य','All':'सर्व','Beginner':'प्रारंभिक','Intermediate':'मध्यम','Advanced':'प्रगत','Newest First':'नवीन आधी','Oldest First':'जुने आधी','Artist Name A-Z':'कलाकार नाव A-Z','Model Name A-Z':'मॉडेल नाव A-Z','Loading entries...':'प्रवेशिका लोड होत आहेत...','No entries found':'प्रवेशिका सापडल्या नाहीत','Try adjusting your search or filter to see more results.':'अधिक निकालांसाठी शोध किंवा गाळणी बदला.','Model Name':'मॉडेल नाव','Artist Name':'कलाकाराचे नाव','Designer':'रचनाकार','Paper':'कागद','Time':'वेळ','Artist Statement':'कलाकाराचे निवेदन','Open':'उघडा'
    }
  };
  Object.keys(competitionCopy).forEach(function (lang) { Object.assign(common[lang], competitionCopy[lang]); });
  var originalTextNodes = new WeakMap();
  function applyCommonLanguage(lang) {
    var dict = common[lang] || {};
    document.querySelectorAll('a,button,h1,h2,h3,h4,p,span,label,option,legend,div').forEach(function (node) {
      if (!node.children.length) {
        var original = node.dataset.sioaOriginal || node.textContent.trim();
        node.dataset.sioaOriginal = original;
        var target = lang === 'en' ? original : (dict[original] || original);
        if (node.textContent !== target) node.textContent = target;
        return;
      }
      Array.prototype.forEach.call(node.childNodes, function (textNode) {
        if (textNode.nodeType !== 3 || !textNode.nodeValue.trim()) return;
        if (!originalTextNodes.has(textNode)) originalTextNodes.set(textNode, textNode.nodeValue.trim());
        var originalText = originalTextNodes.get(textNode);
        var translated = lang === 'en' ? originalText : (dict[originalText] || originalText);
        var leading = /^\s*/.exec(textNode.nodeValue)[0];
        var trailing = /\s*$/.exec(textNode.nodeValue)[0];
        var nextValue = leading + translated + trailing;
        if (textNode.nodeValue !== nextValue) textNode.nodeValue = nextValue;
      });
    });
    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(function (field) {
      var originalPlaceholder = field.dataset.sioaOriginalPlaceholder || field.getAttribute('placeholder');
      field.dataset.sioaOriginalPlaceholder = originalPlaceholder;
      field.setAttribute('placeholder', lang === 'en' ? originalPlaceholder : (dict[originalPlaceholder] || originalPlaceholder));
    });
    var languageLabels = {
      en: 'Choose language', hi: 'भाषा चुनें', ta: 'மொழியைத் தேர்ந்தெடுக்கவும்',
      te: 'భాషను ఎంచుకోండి', mr: 'भाषा निवडा'
    };
    select.setAttribute('aria-label', languageLabels[lang] || languageLabels.en);
  }
  window.sioaApplyLanguage = applyCommonLanguage;
  window.sioaT = function (key) { return (common[select.value] && common[select.value][key]) || key; };
  document.documentElement.lang = select.value;
  applyCommonLanguage(select.value);
  var languageFrame = 0;
  new MutationObserver(function () {
    if (select.value === 'en' || languageFrame) return;
    languageFrame = requestAnimationFrame(function () { languageFrame = 0; applyCommonLanguage(select.value); });
  }).observe(document.body, { childList: true, subtree: true });
  window.dispatchEvent(new CustomEvent('sioa:languagechange', { detail: { language: select.value } }));
})();
