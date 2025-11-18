import { Solution } from "./solution.js";
import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('constructor', () => {
  it('removes the first two parameters (note and script paths) from arguments', () => {
    const solution = new Solution(['1', '2', '3']);

    expect((solution as any).args).toStrictEqual(['3']);
  });
});

describe('run', () => {
  let mockExit: jest.Mocked<typeof process.exit>;

  beforeEach(() => {
    mockExit = jest.spyOn(process, 'exit').mockImplementation((code?: string | number | null | undefined) => {
      throw new Error(`process.exit: ${code || 0}`);
    }) as any;
  });

  afterEach(() => {
    mockExit.mockRestore();
  });

  it(`gracefully exits out if there aren't any parameters`, () => {
    const solution = new Solution([]);
    (solution as any).args = [];
    expect(() => solution.run()).toThrow('process.exit: 0');
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(0);
  })

  it(`continues to run if there is at least one parameter`, () => {
    const solution = new Solution([]);
    (solution as any).args = ['fizzbuzz'];
    solution.run();
    expect(mockExit).toHaveBeenCalledTimes(0);
  })
})

describe('getParamValueForName', () => {
  it('returns undefined if it cannot find the parameter name', () => {
    expect(Solution.getParamValueForName('weird-param-name', ['fizzbuzz', '--count-to', '50'])).toBeUndefined();
  });

  it('returns undefined if it cannot find the parameter name because it is missing the double dash syntax', () => {
    expect(Solution.getParamValueForName('count-to', ['fizzbuzz', 'count-to', '50'])).toBeUndefined();
  });

  it('returns undefined the supplied parameter name is the last parameter (nothing after it)', () => {
    expect(Solution.getParamValueForName('count-to', ['fizzbuzz', '--count-to'])).toBeUndefined();
  });
  it('returns the value of the argument that comes after the supplied parameter name when that parameter name is found', () => {
    expect(Solution.getParamValueForName('count-to', ['fizzbuzz', '--count-to', '50'])).toBe('50');
  });
})
