import { SolutionType } from "./SolutionType"
import type { SolutionParams } from "./SolutionParams"

export abstract class Solution {
  constructor(protected params: SolutionParams) {}

  abstract verifyParams(): boolean;
  abstract solve(st: SolutionType): string[];
}
