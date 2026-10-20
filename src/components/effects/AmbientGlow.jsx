import { useRef } from 'react';
import { useInView } from 'framer-motion';
import './effects.css';

export default function AmbientGlow() {
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <div ref={ref} className="ambient-glow" data-active={visible} aria-hidden="true">
      <span className="ambient-glow__orb" />
      <span className="ambient-glow__orb ambient-glow__orb--cyan" />
    </div>
  );
}
