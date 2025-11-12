import * as z from "zod";

const nameValidator = z
  .string()
  .min(3, "Name must be at least 3 characters long");

const emailValidator = z.email("Invalid email");

const passwordValidator = z
  .string()
  .min(8, "Password must be at least 8 characters long");

const newPasswordPageSearchParametersValidator = z.union([
  z.object({ error: z.string() }),
  z.object({ token: z.string() }),
]);

export {
  newPasswordPageSearchParametersValidator,
  passwordValidator,
  emailValidator,
  nameValidator,
};
