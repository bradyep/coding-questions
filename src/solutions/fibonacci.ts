import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class Fibonacci extends Solution {
  constructor(params: SolutionParams) {
    super(params);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private elementToFind: number = 0;

  verifyParams() {
    const nthelement = this.params.get('nthelement');
    if (nthelement && typeof nthelement === 'number') {
      this.elementToFind = nthelement;

      return true;
    } else {
      console.log(`Did not receive valid parameter for: nthelement. Received: ${nthelement}`);

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    if (this.paramsAreValid) {
      switch (solutionType) {
        default:
          return this.initial(this.elementToFind);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initial(nthElement: number): string[] {
    const fiboNumbers: number[] = [0, 1];
    for (let i = 0; i < nthElement; i++) {
      console.log(`fiboNumbers[i] = ${fiboNumbers[i]}`);
      if (fiboNumbers[i] === undefined) {
        console.log(`For element at array position ${i} Adding ${fiboNumbers[i - 2]!} and ${fiboNumbers[i - 1]}`);
        fiboNumbers[i] = fiboNumbers[i - 2]! + fiboNumbers[i - 1]!;
      }
    }

    const returnValue = fiboNumbers[nthElement - 1];
    if (returnValue) {
      return [returnValue.toLocaleString()];
    } else {
      console.log(`No element found in position: ${nthElement}`);

      return [];
    }
  }
}
