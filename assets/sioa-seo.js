(function () {
  'use strict';

  const SITE = 'https://sioa.art';
  const DEFAULT_IMAGE = SITE + '/assets/og-image.png';
  const ORGANIZATION = {
    '@type': 'Organization',
    '@id': SITE + '/#organization',
    name: 'Society of Indian Origami Artists',
    alternateName: 'SIOA',
    url: SITE + '/',
    email: 'sioa.paper@gmail.com',
    foundingDate: '2025-12',
    sameAs: ['https://www.instagram.com/socieryofindianorigamiartists/']
  };

  function clean(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function truncate(value, limit) {
    const text = clean(value);
    return text.length <= limit ? text : text.slice(0, limit - 1).replace(/\s+\S*$/, '') + '…';
  }

  function setMeta(attribute, key, content) {
    let node = document.head.querySelector('meta[' + attribute + '="' + key + '"]');
    if (!node) {
      node = document.createElement('meta');
      node.setAttribute(attribute, key);
      document.head.appendChild(node);
    }
    node.setAttribute('content', content);
  }

  function setCanonical(url) {
    let node = document.head.querySelector('link[rel="canonical"]');
    if (!node) {
      node = document.createElement('link');
      node.rel = 'canonical';
      document.head.appendChild(node);
    }
    node.href = url;
  }

  function setJsonLd(data) {
    let node = document.getElementById('sioa-dynamic-structured-data');
    if (!node) {
      node = document.createElement('script');
      node.id = 'sioa-dynamic-structured-data';
      node.type = 'application/ld+json';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify(data);
  }

  function applyPageMeta(title, description, url, type, image) {
    const shareImage = image || DEFAULT_IMAGE;
    document.title = title;
    setMeta('name', 'description', truncate(description, 160));
    setMeta('name', 'robots', 'index,follow,max-image-preview:large');
    setMeta('property', 'og:type', type || 'website');
    setMeta('property', 'og:site_name', 'SIOA');
    setMeta('property', 'og:locale', 'en_IN');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', truncate(description, 200));
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', shareImage);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', truncate(description, 200));
    setMeta('name', 'twitter:image', shareImage);
    setCanonical(url);
  }

  window.SIOASeo = {
    profile(profile) {
      const name = clean(profile.full_name || profile.username || 'SIOA Artist');
      const username = clean(profile.username);
      const location = [profile.city, profile.state].filter(Boolean).join(', ');
      const description = profile.bio
        ? truncate(profile.bio, 155)
        : name + ' is an origami artist in the Society of Indian Origami Artists community' + (location ? ' from ' + location : '') + '.';
      const url = SITE + '/artists/index.html?u=' + encodeURIComponent(username);
      const title = name + ' | Indian Origami Artist at SIOA';
      const specialties = Array.isArray(profile.specialty)
        ? profile.specialty
        : clean(profile.specialty).split(',').map(item => item.trim()).filter(Boolean);

      applyPageMeta(title, description, url, 'profile');
      setJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          ORGANIZATION,
          {
            '@type': 'ProfilePage',
            '@id': url + '#webpage',
            url,
            name: title,
            description,
            inLanguage: 'en-IN',
            isPartOf: { '@id': SITE + '/#website' },
            mainEntity: {
              '@type': 'Person',
              '@id': url + '#artist',
              name,
              alternateName: username ? '@' + username : undefined,
              description,
              homeLocation: location ? { '@type': 'Place', name: location } : undefined,
              knowsAbout: specialties,
              memberOf: { '@id': SITE + '/#organization' }
            }
          }
        ]
      });
    },

    entry(entry, imageUrl) {
      const model = clean(entry.model_name || 'Untitled origami model');
      const folder = clean(entry.artist_name || entry.full_name || 'Anonymous');
      const designer = clean(entry.designer);
      const entryId = clean(entry.id);
      const url = SITE + '/Vagh2026/entry.html?id=' + encodeURIComponent(entryId);
      const title = model + ' | VAGH 2026 Origami Entry';
      const description = truncate(
        clean(entry.artistic_statement) || model + ', folded by ' + folder + (designer ? ' and designed by ' + designer : '') + ', presented at VAGH 2026.',
        155
      );

      applyPageMeta(title, description, url, 'article', imageUrl);
      setJsonLd({
        '@context': 'https://schema.org',
        '@graph': [
          ORGANIZATION,
          {
            '@type': 'VisualArtwork',
            '@id': url + '#artwork',
            url,
            name: model,
            description,
            image: imageUrl || DEFAULT_IMAGE,
            artform: 'Origami',
            artMedium: clean(entry.paper_used || 'Paper'),
            creator: designer ? { '@type': 'Person', name: designer } : undefined,
            contributor: { '@type': 'Person', name: folder },
            isPartOf: {
              '@type': 'CreativeWorkSeries',
              name: 'VAGH 2026, India’s National Origami Competition',
              url: SITE + '/Vagh2026/about.html'
            }
          }
        ]
      });
    }
  };
})();
