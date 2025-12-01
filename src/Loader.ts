import { Fizzbuzz } from "./solutions/fizzbuzz.js";
import { ArgsToMap } from "args-to-map";

export class Loader {
  constructor(processArgs: string[]) {
    // console.log(processArgs); // debugging
    this.solutionNameArg = processArgs[2];  // First two items in process.argv are node and script paths
    this.solutionArgsMap = ArgsToMap.getArgsAsMap(processArgs.slice(3), { "c": "count-to" });  // remove node and script paths as well as solution name
  }

  private solutionNameArg: string | undefined;
  private solutionArgsMap: Map<string, string>;

  run() {
    if (!this.solutionNameArg) {
      console.log('Must supply a solution to run');
      process.exit(0);
    }

    switch (this.solutionNameArg) {
      case "fizzbuzz":
        console.log("loading fizzbuzz solution");
        const countToParamValue = this.solutionArgsMap.get('count-to'); 
        if (countToParamValue) {
          const fizzbuzz = new Fizzbuzz(+countToParamValue);
          fizzbuzz.initial();
        } else { console.log(`Couldn't get parameters needed for ${this.solutionNameArg}`) }
        break;
      case "fibonacci":
        console.log("loading fibonacci solution");
        break;
      case "anagram":
        console.log("loading anagram solution");
        break;
      default:
        console.log(`solution ${this.solutionNameArg} not found`);
    }
  }
}
