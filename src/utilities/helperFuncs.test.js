import * as helpers from './helperFuncs';

describe('the function getRandomIndex...', () => {
  test('returns a number smaller than its input', () => {
    const maxNumber = 10;
    const result = helpers.getRandomIndex(maxNumber);
  
    expect(result).toBeLessThan(maxNumber);
  });
})

describe('the function getOrderedIndices...', () => {
  it('returns an array', () => {
    const result = helpers.getOrderedIndices();
    expect(Array.isArray(result)).toBe(true)
  })

  it('returns an array from 0 to 9 when given 10 as the max value', () => {
    const maxExclusiveIndex = 10;
    const result = helpers.getOrderedIndices(maxExclusiveIndex);
    expect(result).toStrictEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  })

  it('returns empty array when given a negative number', () => {
    const maxExclusiveIndex = -10;
    const result = helpers.getOrderedIndices(maxExclusiveIndex);
    expect(result).toStrictEqual([]);
  })

  it('returns empty array when given a non-numerical string', () => {
    const maxExclusiveIndex = 'hello';
    const result = helpers.getOrderedIndices(maxExclusiveIndex);
    expect(result).toStrictEqual([]);
  })

  it('returns an empty array when given a non-integer number', () => {
    const maxExclusiveIndex = '1.1';
    const result = helpers.getOrderedIndices(maxExclusiveIndex);
    expect(result).toStrictEqual([]);
  })

  it('returns an empty array when given 0', () => {
    const maxExclusiveIndex = 0;
    const result = helpers.getOrderedIndices(maxExclusiveIndex);
    expect(result).toStrictEqual([]);
  })
})


