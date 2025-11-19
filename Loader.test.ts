import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Loader } from "./Loader.js";
import { Fizzbuzz } from "./solutions/fizzbuzz.js";

describe('constructor', () => {
  it('removes the first two parameters (note and script paths) from arguments', () => {
    const solution = new Loader(['1', '2', '3']);

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
    jest.restoreAllMocks();
  });

  it(`gracefully exits out if there aren't any parameters`, () => {
    const solution = new Loader([]);
    (solution as any).args = [];
    expect(() => solution.run()).toThrow('process.exit: 0');
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it(`continues to run if there is at least one parameter`, () => {
    const solution = new Loader([]);
    (solution as any).args = ['fizzbuzz'];
    solution.run();
    expect(mockExit).toHaveBeenCalledTimes(0);
  });

  it('instantiates a fizzbuzz object and calls initial() on it if it is specified in the parameters with a valid count-to', () => {
    const mockInitial = jest.fn();
    const fizzbuzzSpy = jest.spyOn(Fizzbuzz.prototype, 'initial').mockImplementation(mockInitial);
    
    const solution = new Loader([]);
    (solution as any).args = ['fizzbuzz', '--count-to', '50'];
    solution.run();
    
    expect(fizzbuzzSpy).toHaveBeenCalledTimes(1);
    expect(mockInitial).toHaveBeenCalledTimes(1);
    
    fizzbuzzSpy.mockRestore();
  })

  it('does not create a new instance of Fizzbuzz or call initial() if the parameters are not valid', () => {
    const mockInitial = jest.fn();
    const fizzbuzzSpy = jest.spyOn(Fizzbuzz.prototype, 'initial').mockImplementation(mockInitial);
    
    const solution = new Loader([]);
    (solution as any).args = ['fizzbuzz', '--random-param', '50'];
    solution.run();
    
    expect(fizzbuzzSpy).toHaveBeenCalledTimes(0);
    expect(mockInitial).toHaveBeenCalledTimes(0);
    
    fizzbuzzSpy.mockRestore();
  })
})

describe('getParamValueForName', () => {
  it('returns undefined if it cannot find the parameter name', () => {
    expect(Loader.getParamValueForName('weird-param-name', ['fizzbuzz', '--count-to', '50'])).toBeUndefined();
  });

  it('returns undefined if it cannot find the parameter name because it is missing the double dash syntax', () => {
    expect(Loader.getParamValueForName('count-to', ['fizzbuzz', 'count-to', '50'])).toBeUndefined();
  });

  it('returns undefined the supplied parameter name is the last parameter (nothing after it)', () => {
    expect(Loader.getParamValueForName('count-to', ['fizzbuzz', '--count-to'])).toBeUndefined();
  });
  it('returns the value of the argument that comes after the supplied parameter name when that parameter name is found', () => {
    expect(Loader.getParamValueForName('count-to', ['fizzbuzz', '--count-to', '50'])).toBe('50');
  });
})
