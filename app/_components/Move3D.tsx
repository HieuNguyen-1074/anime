'use client';
import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'framer-motion';

const ROTATION_RANGE = 200.5;
const HALF_ROTATION_RANGE = 200.5 / 2;

const Move3D = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  const ref = useRef<any>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e: any) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform,
      }}
      className={className}>
      {children}
    </motion.div>
  );
};

export default Move3D;
