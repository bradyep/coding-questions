import { ArgsToMap } from "./args-to-map.js";

describe('args-to-map', () => {
  describe('no type conversions', () => {
    it('sets an option value to true if it starts with -- and is the last parameter in the list', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-true")).toBe('true');
    });
    it('sets an option value to true if its an alias that starts with - and is the last parameter in the list', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '-t']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("t")).toBe('true');
    });
    it('sets an option value to true if it starts with -- and is followed by another argument that also starts with -- aka it is a toggle', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-abc', 'abc']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(2);
      expect(returnedMap.get("should-be-true")).toBe('true');
    });
    it('sets an option value to true as an alias (starts with -) and is followed by another argument that also starts with -- aka it is a toggle', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-abc', 'abc', '-t']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(3);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("t")).toBe('true');
    });
    it('sets an option value if the preceeding argument starts with -- and the next argument does not', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-abc', 'abc']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-abc")).toBe('abc');
    });
    it('sets an option value as an alias if the preceeding argument starts with - and the next argument does not', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-abc', 'abc', '-f', 'false']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(2);
      expect(returnedMap.get("should-be-abc")).toBe('abc');
      expect(returnedMap.get("f")).toBe('false');
    });
    it('returns an empty Map if it does not find any arguments marked as options', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(0);
    });
    it('ignores arguments that do not have an associated option name', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-abc', 'abc', 'def', 'ghi', '--final', 'jkl', 'mno', '-f', 'false']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(4);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-abc")).toBe('abc');
      expect(returnedMap.get("final")).toBe('jkl');
      expect(returnedMap.get("f")).toBe('false');
    });
    it('ignores arguments that do not have an associated option name and handles an alias at the beginning', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '-n', '9000', '--should-be-true', '--should-be-abc', 'abc', 'def', 'ghi', '--final', 'jkl', 'mno', '-f', 'false']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(5);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-abc")).toBe('abc');
      expect(returnedMap.get("final")).toBe('jkl');
      expect(returnedMap.get("f")).toBe('false');
      expect(returnedMap.get("n")).toBe('9000');
    });
    it('should return a map with all the option values as strings if the attemptTypeConversion parameter was omitted', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-123', '123', 'def', 'ghi', '--final', 'jkl', 'mno']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(3);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-123")).toBe('123');
      expect(returnedMap.get("final")).toBe('jkl');
    });
    it('should return a map with all the option values as strings if the attemptTypeConversion parameter was submitted as false', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-123', '123', 'def', 'ghi', '--final', 'jkl', 'mno', '-n', '987']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, {}, false);
      expect(returnedMap.size).toBe(4);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-123")).toBe('123');
      expect(returnedMap.get("final")).toBe('jkl');
      expect(returnedMap.get("n")).toBe('987');
    });
  });

  describe('handling alias mapping', () => {
    it('sets values for aliases using the option name specified in the AliasMappings', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '-t', '-n', '123']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, { 't': 'should-be-true', 'n': 'should-be-123' }, false);
      expect(returnedMap.size).toBe(2);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-123")).toBe('123');
    });
    it('uses just the first character of an alias when there is no alias mapping', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '-nnn', '123']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("n")).toBe('123');
    });
    it('uses the last supplied value for repeated options with no alias mapping', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-123', '999', '--should-be-123', '123']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, {  }, false);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-123")).toBe('123');
    });
    it('uses the last supplied value for repeated options WITH alias mapping', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-123', '999', '-n', '123']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, { 'n': 'should-be-123' });
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-123")).toBe('123');
    });
  })

  describe('type conversion requested', () => {
    it('should return a map with all the option values as specific types (string, boolean, number) if the attemptTypeConversion parameter was true', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-123', '123', 'def', 'ghi', '--final', 'jkl', 'mno', '-f', 'false']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, {}, true);
      expect(returnedMap.size).toBe(4);
      expect(returnedMap.get("should-be-true")).toBe(true);
      expect(returnedMap.get("f")).toBe(false);
      expect(returnedMap.get("should-be-123")).toBe(123);
      expect(returnedMap.get("final")).toBe('jkl');
    });
    it('sets values for aliases using the option name specified in the AliasMappings with converted types', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '-t', '-n', '123']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, { 't': 'should-be-true', 'n': 'should-be-123' }, true);
      expect(returnedMap.size).toBe(2);
      expect(returnedMap.get("should-be-true")).toBe(true);
      expect(returnedMap.get("should-be-123")).toBe(123);
    });
  });
});
