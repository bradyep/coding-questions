import { Fizzbuzz } from "./solutions/fizzbuzz";
import { ArgsToMap } from "args-to-map";
import { SolutionType } from "./solutions/SolutionType";

export class Loader {
  constructor(processArgs: string[]) {
    const NODE_SCRIPT_PATH_PARAMS = 2;  // First two items in process.argv are node and script paths
    this.solutionNameArg = processArgs[NODE_SCRIPT_PATH_PARAMS];

    const typeArg = processArgs[NODE_SCRIPT_PATH_PARAMS + 1]?.toLowerCase();
    // Look up the enum value by string key. If invalid, it returns undefined.
    const lookup = SolutionType[typeArg as keyof typeof SolutionType];    
    // Ensure we got a number (valid enum value), otherwise default to initial
    this.solutionType = (typeof lookup === 'number') ? lookup : SolutionType.initial;

    this.solutionArgs = processArgs.slice(NODE_SCRIPT_PATH_PARAMS + 2);
  }

  private solutionNameArg: string | undefined;
  private solutionType: SolutionType;
  private solutionArgs: string[];

  run() {
    if (!this.solutionNameArg) {
      console.log('Must supply a solution to run');
      process.exit(0);
    }

    let consoleOutput: string[] = [];

    switch (this.solutionNameArg) {
      case "fizzbuzz":
        const solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "c": "count-to" }, true);
        const fizzbuzz = new Fizzbuzz(solutionArgsMap);
        consoleOutput = fizzbuzz.solve(this.solutionType);
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
