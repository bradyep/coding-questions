type ProcessedMap<T extends boolean> = T extends true ? Map<string, string | boolean | number> : Map<string, string>;

export class ArgsToMap {
  constructor() {

  }

  static getArgsAsMap<T extends boolean = false>(processArgs: string[], attemptTypeConversion: T = false as T): ProcessedMap<T> {
    const nodeParamsToOmit = 2;
    const userArgs: string[] = process.argv.slice(nodeParamsToOmit); // remove node and script paths

    for (const userArg of userArgs) {
      if (userArg.indexOf('--') === 0) {
        const optionName = userArg.substring(2);
        const optionValue = 'true';
      }
    }

    if (attemptTypeConversion) {
      const argsMap = new Map<string, string | boolean | number>();

      return argsMap as ProcessedMap<T>;
    } else {
      const argsMap = new Map<string, string>();

      return argsMap as ProcessedMap<T>;
    }
  }
}
