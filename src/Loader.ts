import { Fizzbuzz } from "./solutions/fizzbuzz";
import { ArgsToMap } from "args-to-map";

export class Loader {
  constructor(processArgs: string[]) {
    this.solutionNameArg = processArgs[2];  // First two items in process.argv are node and script paths
    this.solutionArgs = processArgs.slice(3); // remove node and script paths as well as solution name
  }

  private solutionNameArg: string | undefined;
  private solutionArgs: string[];

  run() {
    if (!this.solutionNameArg) {
      console.log('Must supply a solution to run');
      process.exit(0);
    }

    let consoleOutput: string[] = [];

    switch (this.solutionNameArg) {
      case "fizzbuzz":
        console.log("loading fizzbuzz solution");
        const solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "c": "count-to" }, true);
        const fizzbuzz = new Fizzbuzz(solutionArgsMap);
        consoleOutput = fizzbuzz.solve();
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

    if (consoleOutput.length > 0) {
      for (const line of consoleOutput) {
        console.log(line);
      }
    } else {
      console.log(`Did not receive anything to write to console`);
    }
  }
}
