import { useEffect } from 'react';

export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    document.documentElement.classList.add('js');

    const els = Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
    if (!els.length) return;

    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
