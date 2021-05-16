/**

The Fibonacci numbers are the numbers in the following integer sequence (Fn):

    0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, ...

such as

    F(n) = F(n-1) + F(n-2) with F(0) = 0 and F(1) = 1.

Given a number, say prod (for product), we search two Fibonacci numbers F(n) and F(n+1) verifying

    F(n) * F(n+1) = prod.

Your function productFib takes an integer (prod) and returns an array:

[F(n), F(n+1), true] or {F(n), F(n+1), 1} or (F(n), F(n+1), True)

depending on the language if F(n) * F(n+1) = prod.

If you don't find two consecutive F(m) verifying F(m) * F(m+1) = prodyou will return

[F(m), F(m+1), false] or {F(n), F(n+1), 0} or (F(n), F(n+1), False)

F(m) being the smallest one such as F(m) * F(m+1) > prod.
Some Examples of Return:

(depend on the language)

productFib(714) # should return (21, 34, true), 
                # since F(8) = 21, F(9) = 34 and 714 = 21 * 34

productFib(800) # should return (34, 55, false), 
                # since F(8) = 21, F(9) = 34, F(10) = 55 and 21 * 34 < 800 < 34 * 55
-----
productFib(714) # should return [21, 34, true], 
productFib(800) # should return [34, 55, false], 
-----
productFib(714) # should return {21, 34, 1}, 
productFib(800) # should return {34, 55, 0},        
-----
productFib(714) # should return {21, 34, true}, 
productFib(800) # should return {34, 55, false}, 

Note:

    You can see examples for your language in "Sample Tests".



 */

export class G964 {
  private static generateFibUpto(limit: number): number[] {
    const fibgen = (acc: number[] = [0, 1]): number[] => {
      const previous = acc[acc.length - 1];
      const next = acc[acc.length - 2] + previous;

      if (previous * next >= limit) {
        acc.push(next);
        return acc;
      }

      acc.push(next);
      fibgen(acc);

      return acc;
    };

    return fibgen();
  }

  public static productFib = (prod: number) => {
    const MAX_FACTOR = prod;

    const factors = G964.generateFibUpto(MAX_FACTOR);
    let result: [number, number, boolean] = [
      factors[factors.length - 2],
      factors[factors.length - 1],
      false,
    ];

    for (let index = 0; index < factors.length; index++) {
      const current = factors[index];
      const next = factors[index + 1];

      if (!next) break;

      if (prod === current * next) {
        result = [current, next, true];
        break;
      }
    }

    return result;
  };
}
