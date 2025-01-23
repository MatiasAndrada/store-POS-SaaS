"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import db from "@/lib/db";
import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/user";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/actions/emails";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  generateVerificationToken,
  generateTwoFactorToken
} from "@/lib/tokens";
import {
  getTwoFactorConfirmationByUserId
} from "@/data/two-factor-confirmation";

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null,
) => {
  try {
    const validatedFields = LoginSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, code } = validatedFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) {
      return { error: "Email does not exist!" }
    }
    if (!existingUser.emailVerified) {
      console.log("Email not verified for user", existingUser.email);
      const verificationToken = await getVerificationTokenByEmail(existingUser.email);
      if (!verificationToken) {
        console.log("No verification token found for user", existingUser.email);
        const newToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(newToken.email, newToken.token);
      }
      return { error: "Confirm your email!" };
    }
    if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return { error: "Invalid code!" };
        }

        if (twoFactorToken.token !== code) {
          return { error: "Invalid code!" };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: "Code expired!" };
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id }
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id }
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          }
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
          twoFactorToken.email,
          twoFactorToken.token,
        );

        return { twoFactor: true };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
    

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }

    throw error;
  }
};

