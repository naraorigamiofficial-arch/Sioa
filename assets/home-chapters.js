(() => {
  const chapters = [...document.querySelectorAll('.home-chapter')];
  if (!chapters.length || !('IntersectionObserver' in window)) return;
  const updateBackdrop = () => {
    const middle = innerHeight / 2;
    const active = chapters.find(chapter => {
      const bounds = chapter.getBoundingClientRect();
      return bounds.top <= middle && bounds.bottom > middle;
    });
    if (active) document.body.classList.toggle('home-inner-view', active.id !== 'welcome');
  };
  const observer = new IntersectionObserver(updateBackdrop, { threshold: [0, .2, .4, .6, .8, 1] });
  chapters.forEach(chapter => observer.observe(chapter));
  addEventListener('resize', updateBackdrop);
  addEventListener('pageshow', updateBackdrop);
  updateBackdrop();
})();
