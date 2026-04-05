import { useEffect, useRef } from 'react';

/**
 * Adds `.visible` to any child with `.fade-up` once it enters the viewport.
 * Attach the returned ref to a wrapper element.
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>('.fade-up');
    targets.forEach((t) => observer.observe(t));

    return () => observer.disconnect();
  }, []);

  return ref;
}