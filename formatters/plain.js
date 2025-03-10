import _ from 'lodash';

const formatValue = (value) => {
		if (_.isPlainObject(value)) {
				return '[complex value]';
		}
		if (typeof value === 'string') {
				return `'${value}'`;
		}
		return String(value);
};

const iter = (tree, ancestry = []) => {
		const lines = tree.flatMap((node) => {
				const propertyPath = [...ancestry, node.key].join('.');
				switch (node.type) {
						case 'added':
								return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
						case 'removed':
								return `Property '${propertyPath}' was removed`;
						case 'changed':
								return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
						case 'nested':
								return iter(node.children, [...ancestry, node.key]);
						case 'unchanged':
								return [];
						default:
								throw new Error(`Unknown type: ${node.type}`);
				}
		});
		return lines.join('\n');
};

export default (diffTree) => iter(diffTree);
