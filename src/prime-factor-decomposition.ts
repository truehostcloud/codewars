class Node {
  public leftChild?: Node;
  public rightChild?: Node;

  constructor(public num: number) {}

  setLeftChild(node: Node) {
    if (!this.leftChild) {
      this.leftChild = node;
    } else {
      this.leftChild.setLeftChild(node);
    }
  }

  setRightChild(node: Node) {
    if (!this.rightChild) {
      this.rightChild = node;
    } else {
      this.rightChild.setRightChild(node);
    }
  }

  geRightMostNode(): Node {
    if (this.rightChild) {
      return this.rightChild.geRightMostNode();
    } else {
      return this;
    }
  }

  divide(divisor: number) {
    return this.num / divisor;
  }
}

export class G964 {
  private static PRIMES: number[] = [];

  // https://stackoverflow.com/a/11967564
  private static isPrime(n: number): boolean {
    if (n < 2) return false;

    /**
     * An integer is prime if it is not divisible by
     * any prime less than or equal to its square root.
     *
     * A number, n, is a prime if it isn't divisible by any other
     * number other than by 1 and itself. Also, it's sufficient
     * to check the numbers [2, sqrt(n)].
     **/

    const q = Math.floor(Math.sqrt(n));

    // start from where previous ended
    const num: number = G964.PRIMES[G964.PRIMES.length]
      ? G964.PRIMES[G964.PRIMES.length]
      : 2;

    for (let i = num; i <= q; i++) {
      if (n % i == 0) {
        return false;
      }
    }

    return true;
  }

  private static generatePrimeNumbers(max: number): number[] {
    //  a soft maximum. Assumption is that a factor will never be greater than
    // half the square root of max
    const softMax = Math.floor(Math.sqrt(max));
    const PRIMES: number[] = [];
    for (let num = 2; num < softMax; num++) {
      if (G964.isPrime(num)) {
        PRIMES.push(num);
      }
    }

    return PRIMES;
  }

  private static buildTree(parent: Node, divisorIndex: number): Node {
    if (divisorIndex >= G964.PRIMES.length) return parent;

    const _node = parent.geRightMostNode();
    const divisor = G964.PRIMES[divisorIndex];
    const modulus = _node.num % divisor;
    const quotient = _node.divide(divisor);
    const isPrimeNumber = G964.isPrime(quotient);

    if (modulus === 0 && isPrimeNumber) {
      const leftChild = new Node(divisor);
      parent.setLeftChild(leftChild);

      const rightChild = new Node(quotient);
      parent.setRightChild(rightChild);

      return parent;
    } else {
      if (modulus === 0) {
        const leftChild = new Node(divisor);
        parent.setLeftChild(leftChild);

        const rightChild = new Node(quotient);
        parent.setRightChild(rightChild);

        const node = G964.buildTree(parent, divisorIndex);
        return node;
      } else {
        const node = G964.buildTree(parent, divisorIndex + 1);
        return node;
      }
    }
  }

  private static generateFactors(tree: Node): number[] {
    const factors: number[] = [];
    let _node = tree;
    while (true) {
      if (_node && _node.leftChild) {
        factors.push(_node.leftChild.num);
        _node = _node.leftChild;
      } else {
        break;
      }
    }
    factors.push(tree.geRightMostNode().num);
    return factors;
  }

  private static groupFactors(factors: number[]): number[][] {
    const groups: number[][] = [];
    const factorSet = new Set(factors);
    const _factors = [...factors];

    for (const factorUnique of factorSet) {
      const group: number[] = [];

      for (let index = 0; index < _factors.length; index++) {
        const factor = _factors[index];

        if (factorUnique === factor) {
          group.push(factor);
        }
      }

      groups.push(group);
    }

    return groups;
  }

  private static printDecomposition(tree: Node): string {
    const factors = G964.generateFactors(tree);
    const groupedFactors = G964.groupFactors(factors);
    return groupedFactors
      .map((group) => {
        return group.length === 1
          ? `(${group[0]})`
          : `(${group[0]}**${group.length})`;
      })
      .join("");
  }

  public static primeFactors = (n: number): string => {
    G964.PRIMES = G964.generatePrimeNumbers(n);
    const parent: Node = new Node(n);
    const tree: Node = G964.buildTree(parent, 0);
    return G964.printDecomposition(tree);
  };
}
