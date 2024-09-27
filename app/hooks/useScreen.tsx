import { useEffect, useRef } from 'react';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * A hook that returns an object with boolean values of the following screen sizes:
 * - sm: < 640px
 * - md: < 768px
 * - xmd: < 889px
 * - lg: < 1024px
 * - xlg: < 1124px
 * - xl: < 1280px
 * - xxl: < 1536px
 *
 * This hook is client-side only and will return an object with all false values
 * on the server.
 */
/******  b62e7214-a1cb-4513-b6ff-bed691865331  *******/
export default function useScreen() {
  if (typeof window === 'undefined') {
    return {
      sm: false,
      md: false,
      lg: false,
      xmd: false,
      xlg: false,
      xl: false,
      'xxl': false,
    };
  }
  const screenSize = useRef(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', () => {
      screenSize.current = window.innerWidth || 0;
    });
    return () => {
      window.removeEventListener('resize', () => {
        screenSize.current = window.innerWidth || 0;
      });
    };
  }, []);

  return {
    sm: screenSize.current < 640,
    md: screenSize.current < 768,
    xmd: screenSize.current < 889,
    lg: screenSize.current < 1024,
    xlg: screenSize.current < 1124,
    xl: screenSize.current < 1280,
    'xxl': screenSize.current < 1536,
  };
}
