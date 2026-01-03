import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class Prime extends Solution {
  constructor(params: SolutionParams, debug: boolean = false) {
    super(params, debug);
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
      this.debugLog(`Did not receive valid parameter for: numbers. Received: ${numbersParam}`);

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
    for (const currentValue of numbers) {
      // Non-numbers, negative numbers, 0, 1 and fractions are not prime numbers
      if (Number.isNaN(currentValue) || !Number.isInteger(currentValue) || currentValue <= 1) {
        results.push(`${currentValue}: false`);
      // 2 is a weird number here so handle specifically
      } else if (currentValue === 2) {
        results.push(`${currentValue}: true`);
      }
      // Handle positive integers greater than 2
      else {
        const divisor = 2;
        const halfwayNumber = Math.floor(currentValue / divisor);
        let isPrime: boolean = true;
        // Check all possible divisors
        for (let i = divisor; i <= halfwayNumber; i++) {
          if (currentValue % i === 0) {
            isPrime = false;

            break;
          }
        }
        results.push(`${currentValue}: ${isPrime.toString()}`);
      }
    }

    return results;
  }
}
