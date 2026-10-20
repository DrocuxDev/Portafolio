import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import clsx from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import './effects.css';

const mergeClasses = extendTailwindMerge({ prefix: 'tw' });
const spring = { stiffness: 180, damping: 24 };

export default function InteractiveCard({ children, className, delay = 0, tilt = 3, ...props }) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const lightX = useMotionValue(0);
  const lightY = useMotionValue(0);
  const lightOpacity = useSpring(0, spring);

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    lightOpacity.set(0);
  };

  const move = (event) => {
    if (reducedMotion || event.pointerType === 'touch'
      || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.min(rect.width, Math.max(0, event.clientX - rect.left));
    const y = Math.min(rect.height, Math.max(0, event.clientY - rect.top));
    rotateX.set((0.5 - y / rect.height) * tilt * 2);
    rotateY.set((x / rect.width - 0.5) * tilt * 2);
    lightX.set(x);
    lightY.set(y);
    lightOpacity.set(1);
  };

  return (
    <motion.article
      {...props}
      className={mergeClasses(clsx('interactive-card tw:relative tw:isolate tw:min-w-0', className))}
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: reducedMotion ? 0 : 0.5, delay: reducedMotion ? 0 : delay }}
      style={{
        transformPerspective: 1100,
        rotateX: reducedMotion ? 0 : rotateX,
        rotateY: reducedMotion ? 0 : rotateY,
      }}
      onPointerMove={move}
      onPointerLeave={reset}
      onPointerCancel={reset}
    >
      <div className="interactive-card__light-clip" aria-hidden="true">
        <motion.div
          className="interactive-card__light"
          style={{ x: lightX, y: lightY, opacity: reducedMotion ? 0 : lightOpacity }}
        />
      </div>
      {children}
    </motion.article>
  );
}
