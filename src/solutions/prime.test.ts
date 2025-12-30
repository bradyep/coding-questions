import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Prime } from "./prime";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('fibonacci implementations', () => {
  it('returns the value you would expect', () => {
    const params: SolutionParams = new Map([['numbers', '-7,-9.3,foo,0,1,2,3,4.25,10,19,20,29']])
    const prime = new Prime(params);
    const initialResult = prime.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['false', 'false', 'false', 'false', 'false', 'true', 'true', 'false', 'false', 'true', 'false', 'true' ]);
  });
});
