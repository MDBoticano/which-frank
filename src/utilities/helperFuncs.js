/**
 * Reduces an array to the sum of all its values
 * @param {[number]} numberArray - array of numbers to sum up
 */
export const sumReducer = (numberArray) => {
  if (numberArray.length === 0) return 0;
  const sum = numberArray.reduce((a, b) => a + b);
  return sum;
};

/**
 * Returns an array of all unique values for a given object key in an object
 * array.
 * @param {array} array - array of objects to search
 * @param {string} key - key for the values to retreive
 */
export const getUniqueValues = (array, key) => {
  const uniqueValues = [];
  array.forEach((element) => {
    const keyValue = element[key];
    if (!uniqueValues.includes(keyValue)) {
      uniqueValues.push(keyValue);
    }
  });
  return uniqueValues;
};

/**
 * Generates a random integer between two numbers in a range. Uses ES6
 * destructuring for swapping values.
 * @param {number} maximum - maximum possible exclusive value
 * @param {number} minimum - minimum possible inclusive value (defaults to 0)
 */
export const getRandomIndex = (maximum, minimum = 0) => {
  let [max, min] = [maximum, minimum];

  // Swap min and max if min is bigger than max to correct ranges
  if (max < min) {
    [max, min] = [min, max];
  }

  const index = Math.floor((Math.random() * (max - min)) + min);

  return index;
};

/**
 * Creates an array of integers ordered from 0 to (maxNumExclusive - 1). Uses
 * ES6 spread operator and keys() function.
 * @param {number} maxNum - whole number for the end of the range (exlusive)
 */
export const getOrderedIndices = (maxNum) => {
  if (Number.isInteger(maxNum) && maxNum > 0) {
    return [...Array(maxNum).keys()];
  }
  return [];
};

/**
 * Makes an array from 0 to maxNum (exclusive) and shuffles the numbers.
 * @param {maxNum} number - positive integer for range of indices [0, maxNum)
 */
export const shuffleIndices = (maxNum) => {
  const orderedIndices = getOrderedIndices(maxNum);

  const numberOfIndices = orderedIndices.length;
  if (numberOfIndices === 0) return [];
  if (numberOfIndices === 1) return orderedIndices;

  // Durstenfeld shuffle a deep copy of the ordered array.
  const shuffledIndices = [...orderedIndices];
  for (let i = numberOfIndices; i > 0; i -= 1) {
    const randomIndex = getRandomIndex(i);

    // retrive and swap the end value with the random index value
    const endValue = shuffledIndices[i - 1];
    shuffledIndices[i - 1] = shuffledIndices[randomIndex];
    shuffledIndices[randomIndex] = endValue;
  }

  return shuffledIndices;
};
