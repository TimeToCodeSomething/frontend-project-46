import plain from './plain.js';
import formatDiff from '../formatDiff.js'; // если требуется другой формат, например, "stylish"
import json from './json.js';

const formatters = {
  plain,
  stylish: formatDiff, // уже реализованный форматер
  json,
};

export default (diffTree, formatName = 'stylish') => {
  const formatter = formatters[formatName];
  if (!formatter) {
    throw new Error(`Unknown format: '${formatName}'`);
  }
  return formatter(diffTree);
};
