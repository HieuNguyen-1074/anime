import { calGridCols } from '@/lib/utils';
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from 'react';
import { stagger, animate } from 'framer-motion';
// import styles from './styles.module.css';

export default function Masonry({
  children,
  cols,
  data,
  keyId,
  isOdd,
  height,
  className,
  childClass,
  gaps,
  isInOneLine,
  onHover,
  onLeave,
  onClick,
}: {
  children: React.ReactNode;
  cols: number;
  data: any;
  keyId: string;
  isOdd: boolean;
  height: number;
  className: string;
  childClass: string;
  gaps: number;
  isInOneLine: boolean;
  onHover: (() => void) | undefined | null;
  onLeave: (() => void) | undefined | null;
  onClick: (() => void) | undefined | null;
}) {
  const [state, setState] = useState(0);
  const [widthInOneCol, setWidthInOneCol] = useState<number>(0);

  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (!ref?.current) return;
    const calWidthInOneCol = screen.width / cols - gaps * 2;

    setWidthInOneCol(calWidthInOneCol);
  }, [ref?.current]);
  useEffect(() => {
    if (!ref.current) return;

    data.forEach((va: any, index: number) => {
      animate(
        document.getElementsByClassName(childClass)[index],
        {
          transform: calTransform(
            va,
            calGridCols(data, cols, keyId, isInOneLine),
            isOdd,
            widthInOneCol,
            height,
            keyId,
            gaps
          ),
          width:
            (va.col || 1) * (widthInOneCol || 1) + (va.col - 1) * gaps + 'px',
        },
        { duration: 1 }
      );
    });
    return function () {};
  }, [data, widthInOneCol, ref.current, isInOneLine, isOdd]);

  // Hook1: Tie media queries to the number of columns

  return (
    <div
      ref={ref}
      onClick={onClick || function () {}}
      onMouseMove={onHover || function () {}}
      onMouseLeave={onLeave || function () {}}
      className={className}>
      {children}
    </div>
  );
}

function calTransform(
  data: any,
  grid: any,
  isOdd: boolean,
  widthInOneCol: number,
  height: number,
  keyId: string,
  gaps: number
) {
  console.log('data', data, grid);
  const se = grid.reduce((transform: any, val: any, index1: any) => {
    let colBefore = 0;
    val.forEach((value: any, index2: number) => {
      if (value[keyId] === data[keyId]) {
        transform = `translate(${
          colBefore * widthInOneCol +
          (isOdd && index1 % 2 === 0 ? widthInOneCol / 2 : 0) +
          gaps * colBefore
        }px , ${index1 * height + gaps * index1}px)`;
      } else {
        colBefore += value.col || 1;
      }
    });

    return transform;
  }, '');
  return se;
}
