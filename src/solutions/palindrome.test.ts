import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Palindrome } from "./palindrome";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('palindrome implementations', () => {
  it('returns 7 lines of output with all the expected palindromes being marked true', () => {
    const params: SolutionParams = new Map([['words', 'racecar-anhata-boob-mhlem-madam-yummy-kayak']]);
    const pd = new Palindrome(params);
    const initialResult = pd.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['racecar true', 'anhata false', 'boob true', 'mhlem false', 'madam true', 'yummy false', 'kayak true']);
  })
});
