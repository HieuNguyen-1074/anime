import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
/**
 * This function takes an array of objects and calculates the number of columns
 * in a grid layout. If the array is not in a single line, it will create a new
 * row for each group of columns. Otherwise, it will return the original array.
 *
 * @param {any[]} data - an array of objects
 * @param {number} cols - the number of columns
 * @param {string} key - the key of the object that represents the column
 * @param {boolean} isInOneLine - whether the array should be in a single line
 * @returns {any[][]} an array of arrays, where each sub array represents a row
 */
export function calGridCols(
  data: any[],

  cols: number,
  key: string,
  isInOneLine: boolean
) {
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

export function getTranslateX(className: string) {
  console.log(document);
  var element = document.getElementsByClassName(`${className}`);
  var style = element && window.getComputedStyle(element[0]);
  var matrix = style && new WebKitCSSMatrix(style.transform);
  return matrix?.m41;
}
