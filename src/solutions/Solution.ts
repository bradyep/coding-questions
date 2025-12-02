import { SolutionType } from "./SolutionType"

export interface Solution {
  solve: (st: SolutionType) => string[]
  verifyParams: (params: Map<string, string | boolean | number>) => boolean
}
