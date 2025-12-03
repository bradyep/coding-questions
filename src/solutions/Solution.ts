import { SolutionType } from "./SolutionType"

export abstract class Solution {
  constructor(protected params: Map<string, string | boolean | number>) {}

  abstract verifyParams(): boolean;
  abstract solve(st: SolutionType): string[];
}
