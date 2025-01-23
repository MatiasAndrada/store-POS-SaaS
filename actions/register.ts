"use server";

import  db from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "@/schemas/auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/actions/emails";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  console.log("🦇  register  verificationToken:", verificationToken)
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );
  return { success: "Confirmation email sent!" };
};
