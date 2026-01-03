import { Solution } from "./Solution";
import { SolutionType } from "./SolutionType";
import type { SolutionParams } from "./SolutionParams"

export class Fizzbuzz extends Solution {
  constructor(params: SolutionParams, debug: boolean = false) {
    super(params, debug);
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
      this.debugLog('Did not receive valid parameter for: countTo');

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    if (this.paramsAreValid) {
      this.debugLog(`SolutionType: ${SolutionType[solutionType]} | countTo: ${this.countTo}`);

      switch (solutionType) {
        case SolutionType.functional:
          return this.functional(this.countTo);
        default:
          return this.initialImplementation(this.countTo);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initialImplementation(countTo: number): string[] {
    const results = [];
    for (let i = 1; i <= countTo; i++) {
      let output: string = '';
      if (i % 3 === 0) { output += 'fizz'; }
      if (i % 5 === 0) { output += 'buzz'; }
      if (output.length > 0) { results.push(output); }
    }
    return results;
  }

  private functional(countTo: number): string[] {
    const fizzCheck = (x: number) => { return x % 3 === 0 ? 'fizz' : '' }
    const buzzCheck = (x: number) => { return x % 5 === 0 ? 'buzz' : '' }
    const numbers: number[] = Array(countTo).fill(0).map((_, i) => i + 1);
    
    return numbers
      .map(x => fizzCheck(x) + buzzCheck(x))
      .filter(x => x !== '');
  }
}
