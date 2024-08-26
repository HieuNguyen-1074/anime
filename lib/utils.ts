import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function calGridCols(
  data: any[],

  cols: number,
  key: string,
  isInOneLine: boolean
) {
  console.log(isInOneLine);
  let row = 1;
  const d = data.reduce((grid: any, d: any, index: number) => {
    if (!isInOneLine) {
      grid[row] &&
        grid[row]?.reduce((vals: any, val: any) => {
          vals += val.col;
          return vals;
        }, 0) >= cols &&
        row++;
    }

    const val = { [key]: d[key], col: d.col || 1 };

    if (!grid[row]) {
      grid[row] = [val];
    } else if (grid[row].length < cols || isInOneLine) {
      grid[row].push(val);
    } else {
      return grid;
    }

    return grid;
  }, []);

  return d.filter((val: any) => val);
}

export function shuffle(array: any) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
