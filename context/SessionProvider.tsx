import { SessionProvider as NextSessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = {
  children?: React.ReactNode;
};

export async function SessionProvider({ children }: Props) {
  const session = await auth();
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
