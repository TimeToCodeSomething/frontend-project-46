import _ from 'lodash';

export default function buildDiff(obj1, obj2) {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return {key, type: 'added', value: obj2[key]};
    }
    if (!_.has(obj2, key)) {
      return {key, type: 'removed', value: obj1[key]};
    }

    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {key, type: 'nested', children: buildDiff(value1, value2)};
    }

    if (_.isEqual(value1, value2)) {
      return {key, type: 'unchanged', value: value1};
    }

    return {key, type: 'changed', oldValue: value1, newValue: value2};
  });
};
