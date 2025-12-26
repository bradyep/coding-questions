import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Fibonacci } from "./fibonacci";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('fibonacci implementations', () => {
  it('returns the value you would expect for the seventh element (8)', () => {
    const params: SolutionParams = new Map([['nthelement', 7]])
    const fns = new Fibonacci(params);
    const initialResult = fns.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['8']);
  });
});
