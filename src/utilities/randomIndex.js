/**
 * Generates a random integer between two numbers in a range
 * @param {number} max - the maximum possible exclusive value. In most cases,
 * this defaults to the array's length
 * @param {number} min - the minimum possible inclusive value; defaults to 0
 */
const getRandomIndex = (max, min = 0) => {
  let rangeMax = max;
  let rangeMin = min;
  /* swap min and max if min is bigger than max */
  if (rangeMax < rangeMin) {
    [rangeMax, rangeMin] = [rangeMin, rangeMax];
  }
  return Math.floor((Math.random() * (rangeMax - rangeMin)) + rangeMin);
};

export { getRandomIndex };