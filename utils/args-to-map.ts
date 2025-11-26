type SingleCharacter<T extends string> = T extends `${infer C}` ? (
  C extends `${infer _}${infer _}` ? never : C
) : never;

type ProcessedMap<T extends boolean> = T extends true ? Map<string, string | boolean | number> : Map<string, string>;

type AliasMapping = Record<SingleCharacter<string>, string>;

export class ArgsToMap {
  static getArgsAsMap<T extends boolean = false>(processArgs: string[], aliases: AliasMapping = {}, attemptTypeConversion: T = false as T): ProcessedMap<T> {
    let lastArgWasOptionName = false;
    const argsMapStringValues = new Map<string, string>();
    let optionName = '';
    let optionValue: string;

    // Put together Map with string values first
    for (const userArg of processArgs) {
      // Option names begin with --
      if (userArg.indexOf('--') === 0) {
        optionName = userArg.substring(2);
        argsMapStringValues.set(optionName, 'true');  // we'll replace 'true' if next arg is an option value
        lastArgWasOptionName = true;
      // Option name aliases begin with -
      } else if (userArg.indexOf('-') === 0) {
        optionName = userArg.substring(1, 2); // option name is just the first letter for an alias
        // Check if we have an alias mapping and use that if we do
        if (aliases[optionName as SingleCharacter<string>]) {
          optionName = aliases[optionName as SingleCharacter<string>];
        }
        argsMapStringValues.set(optionName, 'true');  // we'll replace 'true' if next arg is an option value
        lastArgWasOptionName = true;
      }
       else {
        if (lastArgWasOptionName) {
          optionValue = userArg;
          argsMapStringValues.set(optionName, optionValue);
          lastArgWasOptionName = false;
        }
      }
    }

    // If asked to do so, attempt to convert arguments to their intended types
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
