import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { QuickSort } from "./quicksort";
import type { SolutionParams } from "./SolutionParams"
import { SolutionType } from './SolutionType';

describe('quicksort initial implementation', () => {
  it('returns a sorted list of elements', () => {
    const params: SolutionParams = new Map([['numbers', '23,99,-7,1,-192,328,0,39,95']]);
    const qs = new QuickSort(params);
    const initialResult = qs.solve(SolutionType.initial);
    expect(initialResult).toStrictEqual(['-192', '-7', '0', '1', '23', '39', '95', '99', '328']);
  });
});

describe('quicksort optimized implementation', () => {
  it('returns a sorted list of elements', () => {
    const params: SolutionParams = new Map([['numbers', '23,23,23,99,99,-7,1,-192,328,0,39,95,95']]);
    const qs = new QuickSort(params);
    const initialResult = qs.solve(SolutionType.optimized);
    expect(initialResult).toStrictEqual(['-192', '-7', '0', '1', '23', '23', '23', '39', '95', '95', '99', '99', '328']);
  });
});

describe('median of three implementation', () => {
  it('returns expected values', () => {
    const params: SolutionParams = new Map([['numbers', '23,99,-7,1,-192,328,0,39,95']]);
    const qs = new QuickSort(params);
    expect(qs.getMedianOfThree([1, 3, 5])).toEqual(3);
    expect(qs.getMedianOfThree([13, 3, 9])).toEqual(9);
    expect(qs.getMedianOfThree([13, 2, 9, 3, 1])).toEqual(9);
    expect(qs.getMedianOfThree([9, 2, 1, 3, 13])).toEqual(9);
    expect(qs.getMedianOfThree([192, 7, 0, 1, -23, 39, 95, -99, 328])).toEqual(192);
  });
});
