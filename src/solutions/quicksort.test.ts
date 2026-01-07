import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { QuickSort } from "./quicksort";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('quicksort implementation', () => {
  it('returns a sorted list of elements', () => {
    const params: SolutionParams = new Map([['numbers', '23,99,-7,1,-192,328,0,39,95']])
    const qs = new QuickSort(params);
    const initialResult = qs.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['-192', '-7', '0', '1', '23', '39', '95', '99', '328']);
  });
});
