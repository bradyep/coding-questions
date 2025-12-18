import { Solution } from "./Solution";
import { SolutionType } from "./SolutionType";
import type { SolutionParams } from "./SolutionParams"

interface PossibleAnagram {
  firstWord: string
  secondWord: string
}

const WORD_PAIR_SEPARATOR = '-';
const ANAGRAM_SET_SEPARATOR = '_';

export class Anagram extends Solution {
  constructor(params: SolutionParams) {
    super(params);
    this.paramsAreValid = this.verifyParams();
  }

  public paramsAreValid = true;
  private possibleAnagrams: PossibleAnagram[] = [];

  verifyParams(): boolean {
    const wordsParam = this.params.get('words');
    if (wordsParam && typeof wordsParam === 'string') {
      const possibleAnagramsUnsplit = wordsParam.split(ANAGRAM_SET_SEPARATOR);

      for (const wordPair of possibleAnagramsUnsplit) {
        const words = wordPair.split(WORD_PAIR_SEPARATOR);
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
    if (this.paramsAreValid) {
      console.log(`SolutionType: ${SolutionType[solutionType]} | possible anagrams: ${this.possibleAnagrams.length}`);

      switch (solutionType) {
        default:
          return this.initial(this.possibleAnagrams);
      }
    } else {
      return [`Invalid parameters`];
    }
  }

  private initial(possibleAnagrams: PossibleAnagram[]): string[] {
    const generateCharacterBreakdown = (word: string): Map<string, number> => {
      const breakdown: Map<string, number> = new Map();
      for (let i = 0; i < word.length; i++) {
        const character = word.substring(i, i + 1);
        const currentCount = breakdown.get(character) || 0;
        breakdown.set(character, currentCount + 1);
      }

      return breakdown;
    }

    const breakdownsAreEqual = (breakdown1: Map<string, number>, breakdown2: Map<string, number>): boolean => {
      if (breakdown1.size !== breakdown2.size) { 
        return false;
       } else {
        for (const [key, val] of breakdown1) {
          if (!breakdown2.has(key)) {
            return false;
          }

          const testVal = breakdown2.get(key);
          if (testVal !== val) {
            return false;
          }
        }

        return true;
       }
    }

    const output: string[] = [];

    for (const possibleAnagram of possibleAnagrams) {
      const firstBreakdown = generateCharacterBreakdown(possibleAnagram.firstWord);
      const secondBreakdown = generateCharacterBreakdown(possibleAnagram.secondWord);
      const isAnagram = breakdownsAreEqual(firstBreakdown, secondBreakdown);
      output.push(`${possibleAnagram.firstWord} ${possibleAnagram.secondWord} ${isAnagram}`);
    }

    return output;
  }

}
