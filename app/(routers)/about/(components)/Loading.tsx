import React, { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';
export default function Loading() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  //effect
  useEffect(() => {
    let interval;
    if (counter >= 10 || counter2 > 10) {
      clearInterval(interval);
      return;
    }

    interval = setInterval(() => {
      if (counter >= 10) return;
      const increase = counter2 + 1;

      setCounter2(increase);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    if (counter2 === 9) {
      setCounter2(0);
      setCounter(counter + 1);

      if (counter + 1 + counter2 < 100) {
        setTimeout(() => {
          animate(
            '.loading',
            { opacity: 0, pointerEvents: 'none' },
            { duration: 0.5 }
          );
        }, 1000);
      }
    }
  }, [counter2]);

  return (
    <div className=' loading bg-white fixed w-screen h-screen z-[1000] flex overflow-hidden  justify-center items-center'>
      <div className='h-fit flex justify-center items-center text-[3rem] overflow-hidden font-fetch'>
        <motion.div className='loading-2'>
          <p>{counter}</p>
        </motion.div>
        <motion.div className='loading-1 '>
          <p>{counter2}</p>
        </motion.div>
        <p>%</p>
      </div>
    </div>
  );
}

function runMotion(className: string) {
  animate(className, { transform: 'translateY(0%)' }, { duration: 0.5 });
}
