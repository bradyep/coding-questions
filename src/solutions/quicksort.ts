import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

class QuickSortBlock {
  constructor(private elements: number[], debugLogFn?: (text: string) => void) {
    if (debugLogFn) { QuickSortBlock.debugLog = debugLogFn; }
  }

  public left = new QuickSortBlock([]);
  public right = new QuickSortBlock([]);
  static debugLog: (text: string) => void;

  pivotOn(elementIndex: number) {
    const pivotValue = this.elements[elementIndex];
    if (!pivotValue) { 
      QuickSortBlock.debugLog(`Error: Cannot pivot on: ${pivotValue}`);

      return;
     } else {
      for (const elementValue of this.elements) {
        if (elementValue <= pivotValue) { this.left.elements.push(elementValue); } else {
          this.right.elements.push(elementValue);
        }
      }
    }
  }
}

export class QuickSort extends Solution {
  constructor(params: SolutionParams, debug: boolean = false) {
    super(params, debug);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private numbersToSort: number[] = [];

  verifyParams(): boolean {
    const numbersParam = this.params.get('numbers');
    if (numbersParam && typeof numbersParam === 'string') {
      const splitNumbers = numbersParam.split(',');
      this.numbersToSort = splitNumbers.map(x => +x);

      return true;
    } else {
      this.debugLog(`Did not receive valid parameter for: numbers. Received: ${numbersParam}`);

      return false;
    }
  }

  solve(st: SolutionType): string[] {
    return [];
  }
}
