import { useEffect, useRef } from "react";

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
