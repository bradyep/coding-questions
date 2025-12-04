import { jest, describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { Loader } from "./Loader";
import { Fizzbuzz } from "./solutions/fizzbuzz";

describe('constructor', () => {
  it('sets the third parameter to the solution name', () => {
    const solution = new Loader(['1', '2', '3']);

    expect((solution as any).solutionNameArg).toStrictEqual('3');
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

  it(`gracefully exits out if a solution name is not supplied`, () => {
    const solution = new Loader([]);
    (solution as any).args = [];
    expect(() => solution.run()).toThrow('process.exit: 0');
    expect(mockExit).toHaveBeenCalledTimes(1);
    expect(mockExit).toHaveBeenCalledWith(0);
  });

  it(`continues to run if there is at least one parameter`, () => {
    const solution = new Loader(['blah', 'stuff', 'fizzbuzz']);
    solution.run();
    expect(mockExit).toHaveBeenCalledTimes(0);
  });

  xit('instantiates a fizzbuzz object and calls solve() on it if it is specified in the parameters with a valid count-to', () => {
    const mockInitial = jest.fn(() => []);
    const fizzbuzzSpy = jest.spyOn(Fizzbuzz.prototype, 'solve').mockImplementation(mockInitial);
    
    const solution = new Loader([]);
    (solution as any).args = ['fizzbuzz', '--count-to', '50'];
    solution.run();
    
    expect(fizzbuzzSpy).toHaveBeenCalledTimes(1);
    expect(mockInitial).toHaveBeenCalledTimes(1);
    
    fizzbuzzSpy.mockRestore();
  })

  xit('does not create a new instance of Fizzbuzz or call initial() if the parameters are not valid', () => {
    const mockInitial = jest.fn(() => []);
    const fizzbuzzSpy = jest.spyOn(Fizzbuzz.prototype, 'solve').mockImplementation(mockInitial);
    
    const solution = new Loader([]);
    (solution as any).args = ['fizzbuzz', '--random-param', '50'];
    solution.run();
    
    expect(fizzbuzzSpy).toHaveBeenCalledTimes(0);
    expect(mockInitial).toHaveBeenCalledTimes(0);
    
    fizzbuzzSpy.mockRestore();
  })
})
