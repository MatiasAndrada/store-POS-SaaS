"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { Button } from "@nextui-org/button";
import { GoogleIcon } from "../ui/icons/icons";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");

  function onClick(provider: "google") {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <Button
      startContent={<GoogleIcon />}
      variant="bordered"
      onPress={() => onClick("google")}
      className="w-full flex items-center"
    >
      Continuar con Google
    </Button>
  );
};
