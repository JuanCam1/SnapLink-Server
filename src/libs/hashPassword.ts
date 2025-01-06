import bcryptjs from "bcryptjs";
const salt = 10;

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, salt);
};
