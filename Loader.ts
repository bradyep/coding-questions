import { Fizzbuzz } from "./solutions/fizzbuzz.js";

export class Loader {
  constructor(private processArgs: string[]) {
    const nodeParamsToOmit = 2;
    this.args = processArgs.slice(nodeParamsToOmit); // remove node and script paths
  }

  private args: string[];

  run() {
    if (this.args.length < 1) {
      console.log('Must supply a solution to run');
      process.exit(0);
    }

    this.args.forEach((arg, index) => {
      console.log(`Argument ${index + 1}: ${arg}`)
    });

    const solution: string = this.args[0] ?? '';

    switch (solution) {
      case "fizzbuzz":
        console.log("loading fizzbuzz solution");
        const countToParamValue = Loader.getParamValueForName('count-to', this.args);
        if (countToParamValue) {
          const fizzbuzz = new Fizzbuzz(+countToParamValue);
          fizzbuzz.initial();
        } else { console.log(`Couldn't get parameters needed for ${solution}`) }
        break;
      case "fibonacci":
        console.log("loading fibonacci solution");
        break;
      case "anagram":
        console.log("loading anagram solution");
        break;
      default:
        console.log(`solution ${solution} not found`);
    }
  }

  static getParamValueForName(paramName: string, parameters: string[]): string | undefined {
    const paramNameIndex = parameters.indexOf('--' + paramName)
    if (paramNameIndex < 0) {
      console.log(`Can't find parameter name: ${paramName}`);
    } else {
      console.log(`Found ${paramName} | args.length: ${parameters.length} | paramNameIndex: ${paramNameIndex}`);
      if (parameters.length - 1 <= paramNameIndex) {
        console.log(`Found param name at ${paramNameIndex} but size of array is ${parameters.length}, which is too small, so can't get value`);
      } else {
        const paramValue = parameters[paramNameIndex + 1];
        if (paramValue) {

          return paramValue;
        } else {
          console.log(`Param value at position ${paramNameIndex + 1} is undefined`)
        }
      }
    }

    return undefined;
  }

}
