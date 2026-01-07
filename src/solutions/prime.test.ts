import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Prime } from "./prime";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('fibonacci implementations', () => {
  it('returns the value you would expect', () => {
    const params: SolutionParams = new Map([['numbers', '-7,-9.3,foo,0,1,2,3,4.25,10,19,20,29,1041,1051']])
    const prime = new Prime(params);
    const initialResult = prime.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['-7: false', '-9.3: false', 'NaN: false', '0: false', '1: false', '2: true', '3: true', '4.25: false', '10: false', '19: true', '20: false', '29: true', '1041: false', '1051: true']);
  });
});
