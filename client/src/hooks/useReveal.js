import { useEffect, useRef } from "react";

/**
 * Adds the `.in` class to an element once it scrolls into view.
 * Usage: const ref = useReveal(); <div ref={ref} className="reveal">...</div>
 */
export default function useReveal(options = { threshold: 0.15 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add("in");
        observer.unobserve(el);
      }
    }, options);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
