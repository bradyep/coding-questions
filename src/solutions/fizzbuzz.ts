import type { Solution } from "./Solution";

export class Fizzbuzz implements Solution {
  constructor(private countTo: number) {

  }

  verifyParams(params: Map<string, string | boolean | number>) {
    // First param should be a number
    
    return true;
  }

  solve() {
    // console.log(`Solving while counting to ${this.countTo}`);
    return [`Solving while counting to ${this.countTo}`];
  }
}
