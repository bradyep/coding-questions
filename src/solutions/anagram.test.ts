import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Anagram } from "./anagram";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('anagram implementations', () => {
  it('returns 5 lines of output with all the expected anagrams being marked true', () => {
    const params: SolutionParams = new Map([['words', 'evil-vile_apple-paled_flow-wolf_grammer-mergers_slate-least']]);
    const ag = new Anagram(params);
    const initialResult = ag.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['evil vile true', 'apple paled false', 'flow wolf true', 'grammer mergers false', 'slate least true']);
    // const optimizedResult = ag.solve(SolutionType.optimized);
    // expect(optimizedResult).toStrictEqual(['racecar true', 'anhata false', 'boob true', 'mhlem false', 'madam true', 'yummy false', 'kayak true']);
  })
});
