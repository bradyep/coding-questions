import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class Palindrome extends Solution {
  constructor(params: SolutionParams, debug: boolean = false) {
    super(params, debug);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = false;
  private words: string[] = [];

  verifyParams() {
    const wordsParam = this.params.get('words');
    if (wordsParam && typeof wordsParam === 'string') {
      this.words = wordsParam.split('-');

      return true;
    } else {
      this.debugLog('Did not receive valid parameter for: countTo');

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    if (this.paramsAreValid) {
      this.debugLog(`SolutionType: ${SolutionType[solutionType]} | words: ${this.words.join('-')}`);

      switch (solutionType) {
        case SolutionType.optimized:
          return this.optimized(this.words);
        default:
          return this.initial(this.words);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initial(words: string[]): string[] {
    const reverse = (word: string) => {
      let reversedWord = '';
      for (let i = words.length; i >= 0; i--) {
        reversedWord += word.substring(i, i + 1);
      }
      return reversedWord;
    }

    let results: string[] = [];

    for (const word of words) {
      const backwardsWord = reverse(word);
      const isPalindrome = word === backwardsWord;
      // this.debugLog(`(INFO) ${word} ${backwardsWord} ${isPalindrome}`);
      results.push(`${word} ${isPalindrome}`)
    }

    return results;
  }

  private optimized(words: string[]): string[] {
    let results: string[] = [];

    for (const word of words) {
      let isPalindrome = true;
      const lastIndexToEval = Math.round(word.length / 2) - 1;
      for (let i = 0; i <= lastIndexToEval; i++) {
        const frontLetter = word.substring(i, i + 1);
        const backLetter = word.substring(word.length - i - 1, word.length - i);
        this.debugLog(`(INFO) word: ${word} | lastIndexToEval: ${lastIndexToEval} | frontLetter: ${frontLetter} | backLetter: ${backLetter}`);
        if (frontLetter !== backLetter) {
          isPalindrome = false;
          break;
        }
      }

      results.push(`${word} ${isPalindrome}`);
    }

    return results;
  }
}
