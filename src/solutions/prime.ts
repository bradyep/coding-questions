import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class Prime extends Solution {
  constructor(params: SolutionParams) {
    super(params);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private numbersToCheck: number[] = [];

  verifyParams() {
    const numbersParam = this.params.get('numbers');
    if (numbersParam && typeof numbersParam === 'string') {
      const possiblePrimes = numbersParam.split(',');

      this.numbersToCheck = possiblePrimes.map(x => +x);

      return true;
    } else {
      console.log(`Did not receive valid parameter for: numbers. Received: ${numbersParam}`);

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    if (this.paramsAreValid) {
      switch (solutionType) {
        default:
          return this.initial(this.numbersToCheck);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initial(numbers: number[]): string[] {
    const results: string[] = [];
    for (const value of numbers) {
      // Non-numbers, negative numbers, 0, 1 and fractions are not prime numbers
      if (Number.isNaN(value) || !Number.isInteger(value) || value <= 1) { results.push('false'); }
      const divisor = 2;
      const halfwayNumber = value / divisor;
    }

    return results;
  }
}
