export const convertToNumber = (value: unknown, defaultValue = -1): number => {
  if (typeof value === "string") {
    const parsedValue = parseInt(value, defaultValue);
    if (isNaN(defaultValue)) {
      return defaultValue;
    }
    return parsedValue;
  }
  if (typeof value === "number") {
    return value;
  }
  return defaultValue;
};
