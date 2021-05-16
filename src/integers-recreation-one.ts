/**
 
Divisors of 42 are : 1, 2, 3, 6, 7, 14, 21, 42. These divisors squared are: 1, 4, 9, 36, 49, 196, 441, 1764. The sum of the squared divisors is 2500 which is 50 * 50, a square!

Given two integers m, n (1 <= m <= n) we want to find all integers between m and n whose sum of squared divisors is itself a square. 42 is such a number.

The result will be an array of arrays or of tuples (in C an array of Pair) or a string, each subarray having two elements, first the number whose squared divisors is a square and then the sum of the squared divisors.
Examples:

list_squared(1, 250) --> [[1, 1], [42, 2500], [246, 84100]]
list_squared(42, 250) --> [[42, 2500], [246, 84100]]

The form of the examples may change according to the language, see Example Tests: for more details.

Note

In Fortran - as in any other language - the returned string is not permitted to contain any redundant trailing whitespace: you can use dynamically allocated character strings.

 */

export class G964 {
  private static isDivisorLegal(square: number): boolean {
    return Math.sqrt(square) % 1 === 0;
  }

  private static sumSquareDivisors(list: number[]): number {
    return list.reduce((acc, curr) => acc + curr, 0);
  }

  private static squareDivisors(list: number[]): number[] {
    return list.map((divisors) => divisors * divisors);
  }

  private static getFactors(num: number): number[] {
    const factors: number[] = [];
    for (let j = 1; j < Math.sqrt(num); j++) {
      if (num % j === 0) {
        factors.push(j);
      }
    }

    return [
      ...factors,
      ...factors
        .map((factor) => num / factor)
        .sort((left, right) => left - right),
    ];
  }

  private static getDivisors(low: number, high: number): number[][] {
    const allDivisors: number[][] = [];
    for (let i = low; i <= high; i++) {
      if (i === 1) {
        allDivisors.push([1]);
      } else {
        const factors = G964.getFactors(i);
        if (factors.length > 0) allDivisors.push(factors);
      }
    }

    return allDivisors;
  }

  public static listSquared = (m: number, n: number) => {
    return G964.getDivisors(m, n)
      .map((divisors): [number, number[]] => [
        divisors[divisors.length - 1],
        G964.squareDivisors(divisors),
      ])
      .map((divisor) => [divisor[0], G964.sumSquareDivisors(divisor[1])])
      .filter((pair) => G964.isDivisorLegal(pair[1]));
  };
}
