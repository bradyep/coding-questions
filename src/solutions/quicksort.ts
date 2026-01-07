import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

class QuickSortBlock {
  constructor(private elements: number[], debugLogFn?: (text: string) => void) {
    if (debugLogFn) {
      QuickSortBlock.debugLog = debugLogFn;
      QuickSortBlock.debugLog(`QuickSortBlock initialized`);
    }
  }

  public pivotValue: number | undefined;
  public left: QuickSortBlock | undefined;
  public right: QuickSortBlock | undefined;
  static debugLog: (text: string) => void;

  pivotOn(elementIndex: number) {
    const pivotValue = this.elements[elementIndex];
    if (pivotValue === undefined) {
      QuickSortBlock.debugLog(`Error: Cannot pivot on: ${pivotValue}`);

      return;
    } else {
      QuickSortBlock.debugLog(`pivot on: ${pivotValue}`);
      this.pivotValue = pivotValue;
      const elementsWithoutPivot = this.elements.toSpliced(elementIndex, 1);
      for (const elementValue of elementsWithoutPivot) {
        if (elementValue <= pivotValue) {
          QuickSortBlock.debugLog(`Adding ${elementValue} to left`);
          if (!this.left) { this.left = new QuickSortBlock([]); }
          this.left.elements.push(elementValue);
        } else {
          QuickSortBlock.debugLog(`Adding ${elementValue} to right`);
          if (!this.right) { this.right = new QuickSortBlock([]); }
          this.right.elements.push(elementValue);
        }
      }

      if (this.left && this.left.elements.length > 1) {
        this.left.pivotOn(this.left.elements.length - 1);
      } else {
        QuickSortBlock.debugLog(`0 or 1 elements in left, we are done here`);
      }

      if (this.right && this.right.elements.length > 1) {
        this.right.pivotOn(this.right.elements.length - 1);
      } else {
        QuickSortBlock.debugLog(`0 or 1 elements in right, we are done here`);
      }
    }
  }

  getSortedElements(): number[] {
    if (this.pivotValue !== undefined) {
      QuickSortBlock.debugLog(`pivotValue: ${this.pivotValue} | making recursive calls`);
      const leftElements = this.left?.getSortedElements() || [];
      const rightElements = this.right?.getSortedElements() || [];

      return [...leftElements, this.pivotValue, ...rightElements];
    } else {
      QuickSortBlock.debugLog(`no pivotValue. Returning elements.`);

      return this.elements;
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
      this.debugLog(`numbersParam: ${numbersParam}`);
      const splitNumbers = numbersParam.split(',');
      this.debugLog(`splitNumbers: ${splitNumbers}`);
      this.numbersToSort = splitNumbers.map(x => +x.replace('_', '-'));
      this.debugLog(`this.numbersToSort: ${this.numbersToSort}`);

      return true;
    } else {
      this.debugLog(`Did not receive valid parameter for: numbers. Received: ${numbersParam}`);

      return false;
    }
  }

  solve(st: SolutionType): string[] {
    const qsb = new QuickSortBlock(this.numbersToSort, (text) => this.debugLog(text));
    qsb.pivotOn(this.numbersToSort.length - 1);

    return qsb.getSortedElements().map(x => x.toString());
  }
}
