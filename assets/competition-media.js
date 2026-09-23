(function () {
  'use strict';

  var projectUrl = 'https://zbgvgzzaejaxrgcjjovc.supabase.co';
  var bucket = 'competition_media';

  function encodePath(path) {
    return String(path || '').split('/').map(encodeURIComponent).join('/');
  }

  function variantPath(path, variant) {
    var cleanPath = String(path || '');
    var dot = cleanPath.lastIndexOf('.');
    var stem = dot > cleanPath.lastIndexOf('/') ? cleanPath.slice(0, dot) : cleanPath;
    return stem + '.' + variant + '.webp';
  }

  function local(path, variant) {
    if (!path) return '';
    return new URL('../assets/competition-media/' + encodePath(variantPath(path, variant)), document.baseURI).href;
  }

  function original(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return projectUrl + '/storage/v1/object/public/' + bucket + '/' + encodePath(path);
  }

  function useOriginal(image, path) {
    image.onerror = null;
    image.src = original(path);
  }

  window.SIOAMedia = {
    display: function (path) { return local(path, 'display'); },
    thumb: function (path) { return local(path, 'thumb'); },
    original: original,
    useOriginal: useOriginal
  };
}());
