/**
 * Removes key-value pairs from json where value is undefined.
 * @param values
 * @returns
 */
export function removeUndefined(values: { [x: string]: any }) {
  let v: { [x: string]: any } = {};
  for (const property in values) {
    if (values[property] !== undefined) v[property] = values[property];
  }
  return v;
}
