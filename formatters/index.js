import plain from './plain.js';
import formatDiff from '../formatDiff.js'; // если требуется другой формат, например, "stylish"

const formatters = {
		plain,
		stylish: formatDiff, // уже реализованный форматер
};

export default (diffTree, formatName = 'stylish') => {
		const formatter = formatters[formatName];
		if (!formatter) {
				throw new Error(`Unknown format: '${formatName}'`);
		}
		return formatter(diffTree);
};
