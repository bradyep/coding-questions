import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Fizzbuzz } from "./fizzbuzz";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('initial implementation', () => {
  it('returns 7 lines of output with all the expected fizzes and buzzes in order when counting to 16', () => {
    const params: SolutionParams = new Map([['count-to', 16]]);
    const fb = new Fizzbuzz(params);
    const result = fb.solve(SolutionType.initial);
    expect(result).toStrictEqual(['fizz', 'buzz', 'fizz', 'fizz', 'buzz', 'fizz', 'fizzbuzz']);
  })

  it('returns the same results for 15 (no off by one errors)', () => {
    const params: SolutionParams = new Map([['count-to', 15]]);
    const fb = new Fizzbuzz(params);
    const result = fb.solve(SolutionType.initial);
    expect(result).toStrictEqual(['fizz', 'buzz', 'fizz', 'fizz', 'buzz', 'fizz', 'fizzbuzz']);
  })

  it('returns just fizz for 3 (no off by one errors)', () => {
    const params: SolutionParams = new Map([['count-to', 3]]);
    const fb = new Fizzbuzz(params);
    const result = fb.solve(SolutionType.initial);
    expect(result).toStrictEqual(['fizz']);
  })

  it('returns an empty array for 2 (no off by one errors)', () => {
    const params: SolutionParams = new Map([['count-to', 2]]);
    const fb = new Fizzbuzz(params);
    const result = fb.solve(SolutionType.initial);
    expect(result).toStrictEqual([]);
  })
});
