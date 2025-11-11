import { Solution } from "./solution.js";

test('removes note and script paths from arguments', () => {
  const solution = new Solution(['1', '2', '3']);

  expect((solution as any).args).toStrictEqual(['3']);
});
