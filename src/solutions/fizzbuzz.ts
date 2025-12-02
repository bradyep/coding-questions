import { count } from "console";
import { Solution } from "./Solution";

export class Fizzbuzz extends Solution {
  constructor(params: Map<string, string | boolean | number>) {
    super(params);
    this.verifyParams();
  }

  private countTo: number = 0;

  verifyParams() {
    const countToParam = this.params.get('count-to');
    if (countToParam && typeof countToParam === 'number') {
      console.log(`countTo param is valid: ${countToParam}`);
      this.countTo = countToParam;
    } else { 
      console.log('Did not receive valid parameter for: countTo');
    }

    return true;
  }

  solve() {
    // console.log(`Solving while counting to ${this.countTo}`);
    return [`Solving while counting to ${this.countTo}`];
  }
}
