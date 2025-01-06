import capitalize from "capitalize";

export const formatterCapitalize = (text: string) => {
  return capitalize.words(text.toLowerCase());
};
