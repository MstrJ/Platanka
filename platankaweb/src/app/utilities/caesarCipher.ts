export default function caesarCipher(text: string, shift: number) {
  const encryptedText = text
    .split("")
    .map((char) => {
      if (/[a-zA-Z0-9]/.test(char)) {
        const isUpperCase = char === char.toUpperCase();
        const alphabet = isUpperCase
          ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
          : "abcdefghijklmnopqrstuvwxyz0123456789";
        const index = alphabet.indexOf(char);

        if (index !== -1) {
          const shiftedIndex = (index + shift) % alphabet.length;
          const shiftedChar = alphabet[shiftedIndex];
          return isUpperCase ? shiftedChar : shiftedChar.toLowerCase();
        }
      }
      return char;
    })
    .join("");

  return encryptedText;
}
