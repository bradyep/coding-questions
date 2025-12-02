import { Solution } from "./Solution";

export class Fizzbuzz extends Solution {
  constructor(params: Map<string, string | boolean | number>) {
    super(params);
    this.verifyParams();
  }

  private countTo: number = 0;

  verifyParams() {
    // First param should be a number

    return true;
  }

  public solve() {
    // console.log(`Solving while counting to ${this.countTo}`);
    return [`Solving while counting to ${this.countTo}`];
  }
}
