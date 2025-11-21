import { ArgsToMap } from "./args-to-map.js";

xdescribe('args-to-map', () => {
  // Test AND functionality should not be needed since we will never see the node and script path values start with '--'  
  /*
  it('removes the first two parameters (note and script paths) from arguments', () => {
    const testArgs = (['1', '2', '3']);
    expect(ArgsToMap.getArgsAsMap(testArgs)).toStrictEqual(['3']);
  });
  */
  it('sets an option value to true if it starts with -- and is the last parameter in the list', () => {

  });
  it('sets an option value to true if it starts with -- and is followed by another argument that also starts with -- aka it is a toggle', () => {

  });
  it('sets an option value if the preceeding argument starts with -- and the next argument does not', () => {

  });
  it('returns an empty Map if it does not find any arguments marked as options', () => {

  });
  it('should return a map with all the option values as strings if the attemptTypeConversion parameter was omitted', () => {

  });
  it('should return a map with all the option values as strings if the attemptTypeConversion parameter was set to false', () => {

  });
  it('should return a map with all the option values as specific types (string, boolean, number) if the attemptTypeConversion parameter was true', () => {

  });
});
