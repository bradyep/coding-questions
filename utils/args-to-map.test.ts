import { ArgsToMap } from "./args-to-map.js";

describe('args-to-map', () => {
  describe('no type conversions', () => {
    it('sets an option value to true if it starts with -- and is the last parameter in the list', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-true")).toBe('true');
    });
    it('sets an option value to true if it starts with -- and is followed by another argument that also starts with -- aka it is a toggle', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-abc', 'abc']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(2);
      expect(returnedMap.get("should-be-true")).toBe('true');
    });
    it('sets an option value if the preceeding argument starts with -- and the next argument does not', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-abc', 'abc']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(1);
      expect(returnedMap.get("should-be-abc")).toBe('abc');
    });
    it('returns an empty Map if it does not find any arguments marked as options', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(0);
    });
    it('ignores arguments that do not have an associated option name', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-abc', 'abc', 'def', 'ghi', '--final', 'jkl', 'mno']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(3);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-abc")).toBe('abc');
      expect(returnedMap.get("final")).toBe('jkl');
    });
    it('should return a map with all the option values as strings if the attemptTypeConversion parameter was omitted', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-123', '123', 'def', 'ghi', '--final', 'jkl', 'mno']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs);
      expect(returnedMap.size).toBe(3);
      expect(returnedMap.get("should-be-true")).toBe('true');
      expect(returnedMap.get("should-be-123")).toBe('123');
      expect(returnedMap.get("final")).toBe('jkl');
    });
  });

  describe('type conversion requested', () => {
    it('should return a map with all the option values as specific types (string, boolean, number) if the attemptTypeConversion parameter was true', () => {
      const testArgs = (['C:\Program Files\nodejs\node.exe', 'D:\Dev\whatever', '--should-be-true', '--should-be-123', '123', 'def', 'ghi', '--final', 'jkl', 'mno']);
      const returnedMap = ArgsToMap.getArgsAsMap(testArgs, true);
      expect(returnedMap.size).toBe(3);
      expect(returnedMap.get("should-be-true")).toBe(true);
      expect(returnedMap.get("should-be-123")).toBe(123);
      expect(returnedMap.get("final")).toBe('jkl');
    });
  });
});
