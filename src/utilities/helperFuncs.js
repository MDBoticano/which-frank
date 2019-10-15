/**
 * Returns an array of all unique values for a given object key
 * @param {array} array - array of objects to search
 * @param {string} key - what unique values to get
 */
export const getUniqueValues = (array, key) => {
  const uniqueValues = [];
  array.forEach((element) => {
    const keyValue = element[key];
    if (!uniqueValues.includes(keyValue)) {
      uniqueValues.push(keyValue);
    }
  })
  return uniqueValues;
}

/**
 * Generates a random integer between two numbers in a range
 * @param {number} max - the maximum possible exclusive value. In most cases,
 * this defaults to the array's length
 * @param {number} min - the minimum possible inclusive value; defaults to 0
 */
export const getRandomIndex = (max, min = 0) => {
  let rangeMax = max;
  let rangeMin = min;
  /* swap min and max if min is bigger than max */
  if (rangeMax < rangeMin) {
    [rangeMax, rangeMin] = [rangeMin, rangeMax];
  }
  return Math.floor((Math.random() * (rangeMax - rangeMin)) + rangeMin);
};

/**
 * Creates an array of ordered indices from 0 to a (number - 1)
 * example: getOrderedIndices(3) ==> [0, 1, 2]
 * note: uses ES6 spread operator & keys() function
 * @param {number} maxNumExclusive - what number to end at, exlusive
 */
export const getOrderedIndices = (maxNumExclusive) => {
  if (Number.isInteger(maxNumExclusive) && maxNumExclusive > 0) {
    return [...Array(maxNumExclusive).keys()];
  }
  return [];
}


/**
 * Creates an array of indices randomly ordered
 */
// Should this use getOrderedIndices to generate the array itself?
export const randomizeOrderedIndices = (indicesArray) => {

}