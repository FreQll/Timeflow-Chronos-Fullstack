export const cutString = (string, number, endChars) => {
  if (string.length <= number) return string;
  return string.substring(0, number) + endChars;
};

export const objToJson = (data) => {
  return JSON.stringify(data);
};

export const addBgOpacity = (hexColor, percent) => {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  return `rgba(${r}, ${g}, ${b}, ${percent / 100})`;
};
