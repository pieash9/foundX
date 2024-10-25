import { z } from "zod";

const loginValidation = z.object({
  email: z.string().trim().email({ message: "Please enter valid email!" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default loginValidation;
