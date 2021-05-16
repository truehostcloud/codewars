export default function add(x: number): any {
  const innerFn = function (y: number) {
    return add(y + x);
  };

  innerFn.toString = () => {
    return x;
  };

  innerFn.valueOf = function () {
    return x;
  };

  return innerFn;
}
