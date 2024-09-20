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
  showKey,
  showVal,

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
  showKey: string | null;
  showVal: string | null;

  onClick: (() => void) | undefined | null;
}) {
  const [state, setState] = useState(0);
  const [widthInOneCol, setWidthInOneCol] = useState<number>(0);

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref?.current) return;
    const calWidthInOneCol = ref.current.offsetWidth / cols - gaps * 2;

    setWidthInOneCol(calWidthInOneCol);
  }, [ref?.current]);
  useEffect(() => {
    if (!ref.current) return;
    const dataFilter = data.filter((va: any) =>
      showVal && showKey && va[showKey] ? va[showKey] === showVal : true
    );
    let width = isInOneLine ? height : widthInOneCol;
    data.forEach((val: any, index: number) => {
      let isHidden: boolean = false;
      if (showKey && showVal && val[showKey] && val[showKey] !== showVal) {
        isHidden = true;
      }
      if (isInOneLine && val) {
        val.col = 1;
      }
      console.log(isHidden);
      animate(
        document.getElementsByClassName(childClass)[index],
        {
          transform: calTransform(
            val,
            calGridCols(isHidden ? data : dataFilter, cols, keyId, isInOneLine),
            isOdd,
            width,
            height,
            keyId,
            gaps
          ),
          width: (val.col || 1) * (width || 1) + (val.col - 1) * gaps + 'px',
          opacity: isHidden ? '0' : '1',
          zIndex: isHidden ? '-1' : '1',
        },
        { duration: 1 }
      );
    });
    return function () {};
  }, [data, widthInOneCol, ref.current, isInOneLine, isOdd, showVal]);

  // Hook1: Tie media queries to the number of columns

  return (
    <div
      ref={ref}
      onClick={onClick || function () {}}
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
