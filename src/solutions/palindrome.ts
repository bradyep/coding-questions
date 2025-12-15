import { Solution } from "./Solution";
import type { SolutionParams } from "./SolutionParams";
import { SolutionType } from "./SolutionType";

export class Palindrome extends Solution {
  constructor(params: SolutionParams) {
    super(params);
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
      console.log('Did not receive valid parameter for: countTo');

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    if (this.paramsAreValid) {
      console.log(`SolutionType: ${SolutionType[solutionType]} | words: ${this.words.join('-')}`);

      switch (solutionType) {
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
      // console.log(`(INFO) ${word} ${backwardsWord} ${isPalindrome}`);
      results.push(`${word} ${isPalindrome}`)
    }

    return results;
  }
}
