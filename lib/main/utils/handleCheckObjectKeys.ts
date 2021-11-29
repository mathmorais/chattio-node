export const handleCheckObjectKeys = (keys: string[], target: object) => {
  const targetKeys = Object.keys(target).sort();

  return (
    keys.length === targetKeys.length &&
    keys.sort().every((value, index) => value === targetKeys[index])
  );
};
