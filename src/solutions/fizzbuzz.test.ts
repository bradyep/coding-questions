import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Fizzbuzz } from "./fizzbuzz";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('initial implementation', () => {
  it('when counting to 16 it gives us 7 lines of output with all the expected fizzes and buzzes in order', () => {
    const params: SolutionParams = new Map([['count-to', 16]]);
    const fb = new Fizzbuzz(params);
    const result = fb.solve(SolutionType.initial);
    expect(result).toStrictEqual(['fizz', 'buzz', 'fizz', 'fizz', 'buzz', 'fizz', 'fizzbuzz']);
  })
});
