export const cutString = (string, number, endChars) => {
    if (string.length <= number) return string;
    return string.substring(0, number) + endChars;
}