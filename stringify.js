import _ from 'lodash';

export default function stringify(value, depth = 1) {
  if (!_.isPlainObject(value)) {
    return String(value);
  }
  const indent = '    '.repeat(depth);
  const bracketIndent = '    '.repeat(depth - 1);
  const lines = Object.entries(value).map(
    ([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`
  );
  return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};
