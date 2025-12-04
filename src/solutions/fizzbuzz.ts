import { Solution } from "./Solution";
import { SolutionType } from "./SolutionType";

export class Fizzbuzz extends Solution {
  constructor(params: Map<string, string | boolean | number>) {
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
          return [`initial`];
      }
    } else {
      return [`Invalid parameters`];
    }
  }
}
