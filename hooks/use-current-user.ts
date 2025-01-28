import { auth } from "@/auth";

export const currentUser = async () => {
  try {
    const session = await auth();
    return session?.user;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};

export const current_user_id = async () => {
  try {
    const session = await auth();
    const user_id = session?.user.id;
    if (!user_id) throw new Error("User not found");
    return user_id;
  } catch (error) {
    console.error("Error fetching current user ID:", error);
    throw error;
  }
};