import stringify from './stringify.js';

export default function formatDiff(diffTree, depth = 1) {
		const indent = '    '.repeat(depth);
		const bracketIndent = '    '.repeat(depth - 1);

		const lines = diffTree.flatMap(item => {
				const { key, type } = item;
				switch (type) {
						case 'added':
								return `${bracketIndent}  + ${key}: ${stringify(item.value, depth + 1)}`;
						case 'removed':
								return `${bracketIndent}  - ${key}: ${stringify(item.value, depth + 1)}`;
						case 'unchanged':
								return `${bracketIndent}    ${key}: ${stringify(item.value, depth + 1)}`;
						case 'changed':
								return [
										`${bracketIndent}  - ${key}: ${stringify(item.oldValue, depth + 1)}`,
										`${bracketIndent}  + ${key}: ${stringify(item.newValue, depth + 1)}`,
								];
						case 'nested':
								return `${bracketIndent}    ${key}: ${formatDiff(item.children, depth + 1)}`;
						default:
								throw new Error(`Unknown type: ${type}`);
				}
		});

		return `{\n${lines.join('\n')}\n${bracketIndent}}`;
};
