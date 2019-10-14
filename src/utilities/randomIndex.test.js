import { getRandomIndex } from './randomIndex';

test('max 10', () => {
  const maxNumber = 10;
  const result = getRandomIndex(maxNumber);

  expect(result).toBeLessThan(maxNumber);
});