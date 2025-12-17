import { Solution } from "./Solution";
import { SolutionType } from "./SolutionType";
import type { SolutionParams } from "./SolutionParams"

interface PossibleAnagram {
  firstWord: string
  secondWord: string
}

export class Anagram extends Solution {
  constructor(params: SolutionParams) {
    super(params);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = true;
  private possibleAnagrams: PossibleAnagram [] = [];

  verifyParams(): boolean {
    const wordsParam = this.params.get('words');
    if (wordsParam && typeof wordsParam === 'string') {
      const possibleAnagramsUnsplit = wordsParam.split('_');

      for (const wordPair of possibleAnagramsUnsplit) {
        const words = wordPair.split('-');
        if (words.length === 2 && words[0] && words[1]) {
          const anagramToCheck: PossibleAnagram = {
            firstWord: words[0],
            secondWord: words[1]
          };
          this.possibleAnagrams.push(anagramToCheck);
        } else {
          console.log(`possible anagrams consist of exactly two words or phrases. Received: ${words.length}`);

          return false;
        }
      }

      console.log(`Received this many word pairs to check: ${this.possibleAnagrams.length}`);
      
      return true;
    } else {
      console.log('did not get a string value for words param');

      return false;
    }
  }

  solve(solutionType: SolutionType): string[] {
    return [];
  }

}
