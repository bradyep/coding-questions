import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class QuickSort extends Solution {
  constructor(params: SolutionParams, debug: boolean = false) {
    super(params, debug);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private numbersToSort: number[] = [];

  verifyParams(): boolean {
    const numbersParam = this.params.get('numbers');
    if (numbersParam && typeof numbersParam === 'string') {
      const splitNumbers = numbersParam.split(',');
      this.numbersToSort = splitNumbers.map(x => +x);

      return true;
    } else {
      this.debugLog(`Did not receive valid parameter for: numbers. Received: ${numbersParam}`);

      return false;
    }
  }

  solve(st: SolutionType): string[] {
    return [];
  }
}
