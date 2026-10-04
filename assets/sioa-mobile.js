(function () {
  'use strict';

  var asset = new URL(document.currentScript.src);
  var root = new URL('../', asset);
  var css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = new URL('sioa-mobile.css', asset).href;
  document.head.appendChild(css);

  var bar = document.createElement('div');
  bar.className = 'sioa-mobilebar';
  var logo = document.createElement('a');
  logo.href = root.href;
  logo.textContent = 'SIOA';
  logo.setAttribute('aria-label', 'SIOA home');
  var toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.textContent = 'Menu';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'sioaMobileDialog');
  bar.append(logo, toggle);

  var dialog = document.createElement('dialog');
  dialog.id = 'sioaMobileDialog';
  dialog.className = 'sioa-mobile-dialog';
  dialog.setAttribute('aria-label', 'Site navigation');
  var heading = document.createElement('div');
  heading.className = 'sioa-menu-heading';
  var mark = document.createElement('strong');
  mark.textContent = 'SIOA';
  var close = document.createElement('button');
  close.type = 'button';
  close.textContent = 'Close';
  heading.append(mark, close);

  var nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Mobile navigation');
  var groups = [
    ['Explore', [['Home', 'index.html'], ['Artists', 'net/index.html'], ['Magazine', 'Blog/index.html'], ['About SIOA', 'index.html#about']]],
    ['Competition', [['All editions', 'competition/'], ['VAGH 2026', 'Vagh2026/about.html'], ['2026 entries', 'Vagh2026/gallery.html'], ['2026 leaderboard', 'Vagh2026/leaderboard.html']]]
  ];
  function makeLink(item) {
    var link = document.createElement('a');
    link.textContent = item[0];
    link.href = new URL(item[1], root).href;
    if (link.pathname === location.pathname && (!link.hash || link.hash === location.hash)) link.setAttribute('aria-current', 'page');
    return link;
  }
  var details = [];
  groups.forEach(function (groupData) {
    var group = document.createElement('details');
    var summary = document.createElement('summary');
    summary.textContent = groupData[0];
    var list = document.createElement('div');
    list.className = 'sioa-menu-links';
    groupData[1].forEach(function (item) { list.appendChild(makeLink(item)); });
    group.append(summary, list);
    nav.appendChild(group);
    details.push(group);
  });
  var account = makeLink(['My account', 'login/app/loggedin.html']);
  account.className = 'sioa-menu-account';
  nav.appendChild(account);
  details.forEach(function (group) {
    group.addEventListener('toggle', function () {
      if (group.open) details.forEach(function (other) { if (other !== group) other.open = false; });
    });
  });
  dialog.append(heading, nav);
  document.body.append(bar, dialog);

  var previousOverflow = '';
  toggle.addEventListener('click', function () {
    previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
  });
  close.addEventListener('click', function () { dialog.close(); });
  nav.addEventListener('click', function (event) { if (event.target.closest('a')) dialog.close(); });
  dialog.addEventListener('click', function (event) { if (event.target === dialog && event.clientY > dialog.getBoundingClientRect().bottom) dialog.close(); });
  dialog.addEventListener('close', function () {
    document.body.style.overflow = previousOverflow;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.focus({ preventScroll: true });
  });
  matchMedia('(max-width:920px)').addEventListener('change', function (event) { if (!event.matches && dialog.open) dialog.close(); });
}());
