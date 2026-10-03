(function () {
  'use strict';

  var path = location.pathname.toLowerCase();
  var page = path.indexOf('vagh2026') >= 0 ? 'competition'
    : path.indexOf('blog') >= 0 ? 'journal'
    : path.indexOf('artist') >= 0 || path.indexOf('net') >= 0 || path.indexOf('members') >= 0 || path.indexOf('publicprofile') >= 0 ? 'artists'
    : path.indexOf('login') >= 0 || path.indexOf('dashbord') >= 0 || path.indexOf('reset') >= 0 ? 'account'
    : 'home';

  document.documentElement.lang = 'en';
  localStorage.removeItem('sioa-language');
  document.body.classList.add('sioa-archive-page');
  document.body.dataset.sioaPage = page;

  document.querySelectorAll('a').forEach(function (link) {
    var label = link.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    if (label === 'competition' || link.dataset.i18n === 'competition') link.setAttribute('href', '/Vagh2026/about.html');
  });

  var motifs = {
    competition: '<path d="M50 8 92 50 50 92 8 50Z"/><path d="M50 20 80 50 50 80 20 50Z"/><circle cx="50" cy="50" r="10"/><path d="M8 50h84M50 8v84"/>',
    journal: '<rect x="14" y="14" width="72" height="72"/><rect x="25" y="25" width="50" height="50"/><path d="M14 32h72M32 14v72M68 14v72M14 68h72"/><circle cx="50" cy="50" r="9"/>',
    artists: '<path d="M50 7c14 17 14 29 0 43C36 36 36 24 50 7ZM50 93c14-17 14-29 0-43-14 14-14 26 0 43ZM7 50c17-14 29-14 43 0-14 14-26 14-43 0ZM93 50c-17-14-29-14-43 0 14 14 26 14 43 0Z"/><circle cx="50" cy="50" r="7"/>',
    account: '<rect x="12" y="12" width="76" height="76"/><path d="M12 12 50 50 88 12M12 88 50 50 88 88"/><circle cx="50" cy="50" r="12"/>',
    home: '<circle cx="50" cy="50" r="38"/><path d="M50 12v76M12 50h76M23 23l54 54M77 23 23 77"/><circle cx="50" cy="50" r="9"/>'
  };
  var motif = document.createElement('div');
  motif.className = 'sioa-motif';
  motif.setAttribute('aria-hidden', 'true');
  motif.innerHTML = '<svg viewBox="0 0 100 100" role="presentation"><g class="motif-core">' + motifs[page] + '</g></svg>';
  document.body.appendChild(motif);
}());
