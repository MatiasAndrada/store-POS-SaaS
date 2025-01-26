"use client";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@nextui-org/button";
import { ArrowRightIcon, PowerIcon } from "./ui/icons/icons";

export const LoginButton = () => {
  return (
    <Button
      onPress={() => signIn()}
      size={"lg"}
      color="primary"
      endContent={<ArrowRightIcon />}
    >
      <span className="mr-2">Iniciar sesión</span>{" "}
    </Button>
  );
};

export const RegisterButton = () => {
  return (
    <Link href="/register" style={{ marginRight: 10 }}>
      Register
    </Link>
  );
};

export const LogoutButton = () => {
  return (
    <Button
      className={`flex items-center gap-2`}
      onPress={() => signOut()}
      startContent={<PowerIcon />}
    >
      Cerrar sesión
    </Button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
