import { Solution } from "./Solution";
import { SolutionType } from "./SolutionType";
import type { SolutionParams } from "./SolutionParams"

export class Fizzbuzz extends Solution {
  constructor(params: SolutionParams) {
    super(params);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private countTo: number = 0;

  verifyParams() {
    const countToParam = this.params.get('count-to');
    if (countToParam && typeof countToParam === 'number') {
      this.countTo = countToParam;

      return true;
    } else {
      console.log('Did not receive valid parameter for: countTo');

      return false;
    }
  }

  solve(solutionType: SolutionType) {
    if (this.paramsAreValid) {
      console.log(`SolutionType: ${SolutionType[solutionType]} | countTo: ${this.countTo}`);

      switch (solutionType) {
        case SolutionType.optimized:
          return [`optimized`];
        default:
          return this.initialImplementation(this.countTo);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initialImplementation(countTo: number) {
    const results = [];
    for (let i = 1; i <= countTo; i++) {
      let output: string = '';
      if (i % 3 === 0) { output += 'fizz'; }
      if (i % 5 === 0) { output += 'buzz'; }
      if (output.length > 0) { results.push(output); }
    }
    return results;
  }
}
