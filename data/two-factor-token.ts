import db from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token }
    });

    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by token:", error);
    throw new Error("Failed to fetch two-factor token by token");
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email }
    });

    return twoFactorToken;
  } catch (error) {
    console.error("Error fetching two-factor token by email:", error);
    throw new Error("Failed to fetch two-factor token by email");
  }
};
