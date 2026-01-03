import { SolutionType } from "./SolutionType"
import type { SolutionParams } from "./SolutionParams"

export abstract class Solution {
  constructor(protected params: SolutionParams, protected debug: boolean = false) {}

  abstract verifyParams(): boolean;
  abstract solve(st: SolutionType): string[];

  debugLog(text: string): void {
    if (this.debug) { console.log(text); }
  }
}
