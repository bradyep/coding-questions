type ProcessedMap<T extends boolean> = T extends true ? Map<string, string | boolean | number> : Map<string, string>;

export class ArgsToMap {
  constructor() {

  }

  static getArgsAsMap<T extends boolean = false>(processArgs: string[], attemptTypeConversion: T = false as T): ProcessedMap<T> {
    // QUESTION: Do we need the two lines below? Probably not. 
    // const nodeParamsToOmit = 2;
    // const userArgs: string[] = process.argv.slice(nodeParamsToOmit); // remove node and script paths
    let lastArgWasOptionName = false;
    const argsMapStringValues = new Map<string, string>();
    let optionName = '';
    let optionValue: string;

    // Put together Map with string values first
    for (const userArg of processArgs) {
      if (userArg.indexOf('--') === 0) {
        optionName = userArg.substring(2);
        argsMapStringValues.set(optionName, 'true');  // we'll replace 'true' if next arg is an option value
        lastArgWasOptionName = true;
      } else {
        if (lastArgWasOptionName) {
          optionValue = userArg;
          argsMapStringValues.set(optionName, optionValue);
          lastArgWasOptionName = false;
        }
      }
    }

    // If asked to do so, attempt to convert arguments to their likely intended types
    if (attemptTypeConversion) {
      const argsMapTypedValues = new Map<string, string | boolean | number>();
      for (const [key, value] of argsMapStringValues) {
        const cleanedValue = value.trim().toLowerCase();

        if (cleanedValue === 'true') {
          argsMapTypedValues.set(key, true);
        } else if (cleanedValue === 'false') {
          argsMapTypedValues.set(key, false);
        } else if (/^\d+$/.test(cleanedValue)) {
          argsMapTypedValues.set(key, +cleanedValue);
        } else {
          argsMapTypedValues.set(key, value);
        }
      }

      return argsMapTypedValues as ProcessedMap<T>;
    } else {
      return argsMapStringValues as ProcessedMap<T>;
    }
  }
}
