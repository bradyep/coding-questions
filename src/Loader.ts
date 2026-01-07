import { Fizzbuzz } from "./solutions/fizzbuzz";
import { Palindrome } from "./solutions/palindrome";
import { Anagram } from "./solutions/anagram";
import { ArgsToMap } from "args-to-map";
import { SolutionType } from "./solutions/SolutionType";
import type { SolutionParams } from "./solutions/SolutionParams";
import { Fibonacci } from "./solutions/fibonacci";
import { Prime } from "./solutions/prime";
import { QuickSort } from "./solutions/quicksort";

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
    if (this.solutionArgs.includes('--debug')) { this.debug = true; }
  }

  private solutionNameArg: string | undefined;
  private solutionType: SolutionType;
  private solutionArgs: string[];
  private debug: boolean = false;

  run() {
    if (!this.solutionNameArg) {
      console.log('Must supply a solution to run');
      process.exit(0);
    }

    let consoleOutput: string[] = [];
    let solutionArgsMap: SolutionParams | undefined = undefined;

    switch (this.solutionNameArg) {
      case "fizzbuzz":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "c": "count-to" }, true);
        const fizzbuzz = new Fizzbuzz(solutionArgsMap, this.debug);
        consoleOutput = fizzbuzz.solve(this.solutionType);
        break;
      case "palindrome":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "w": "words" }, true);
        const palindrome = new Palindrome(solutionArgsMap, this.debug);
        consoleOutput = palindrome.solve(this.solutionType);
        break;
      case "anagram":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "w": "words" }, true);
        const anagram = new Anagram(solutionArgsMap, this.debug);
        consoleOutput = anagram.solve(this.solutionType);
        break;
      case "fibonacci":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "n": "nthelement" }, true);
        const fibonacci = new Fibonacci(solutionArgsMap, this.debug);
        consoleOutput = fibonacci.solve(this.solutionType);
        break;
      case "prime":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "n": "numbers" }, false);
        const prime = new Prime(solutionArgsMap, this.debug);
        consoleOutput = prime.solve(this.solutionType);
        break;
      case "quicksort":
        solutionArgsMap = ArgsToMap.getArgsAsMap(this.solutionArgs, { "n": "numbers" }, false);
        const quicksort = new QuickSort(solutionArgsMap, this.debug);
        consoleOutput = quicksort.solve(this.solutionType);
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
