export const breadCrumb = ({layout, data, level}) => {
  const stack = [];
  const recurse = (n, l) => {
    if (n && n.label) {
      stack.push(n.label);
    }
    if (n) {
      recurse(n.next, l + 1);
    }
  };
  const cl = 0;
  recurse(data, cl);
  if (stack.length === 1) {
    return stack;
  }
  return stack.reverse();
};
