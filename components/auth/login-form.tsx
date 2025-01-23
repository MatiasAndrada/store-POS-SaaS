"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas/auth";
/* import {
  NODE_ENV,
  NEXT_PUBLIC_TEST_USER_EMAIL,
  NEXT_PUBLIC_TEST_USER_PASSWORD,
} from "@/env.config"; */
//components
import { Social } from "./OAuth-buttons";
//ui
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { InputOtp } from "@nextui-org/input-otp";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Alert } from "@nextui-org/react";
import { login } from "@/actions/login";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");
  const urlError =
    searchParams?.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";

  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          /*           if (data?.success) {
            form.reset();
            setSuccess(data.success);
          } */

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };
  /* 
  const onSubmitTestUser = () => {
    setError("");
    setSuccess("");
    const values = {
      email: process.env.NEXT_PUBLIC_TEST_USER_EMAIL || "test@projectAdmin.com",
      password: process.env.NEXT_PUBLIC_TEST_USER_PASSWORD || "password",
    };
    form.setValue("email", values.email);
    form.setValue("password", values.password);
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

             if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  }; */

  return (
    <Card className="w-[400px] p-4" shadow="md">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src="/assets/icons/store-icon-192x192.png"
          width={80}
          height={80}
          alt="Icon"
        />
        <h1 className="text-3xl font-semibold">Iniciar sesión</h1>
        {error || urlError ? (
          <Alert title={error || urlError} color="danger" />
        ) : null}
        {success ? <Alert title={success} color="success" /> : null}
      </CardHeader>
      <CardBody>
        <Form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  flex flex-col gap-4 items-center"
        >
          <div className="space-y-4 w-full">
            {showTwoFactor ? (
              <>
                <h3>Ingrese el código doble factor</h3>
                <InputOtp
                  name="twoFactor"
                  length={6}
                  /*                 onChange={(value) => form.setValue("twoFactor", value)} */
                />
              </>
            ) : (
              <>
                <Input
                  {...form.register("email")}
                  disabled={isPending}
                  type="email"
                  onChange={(e) =>
                    form.setValue("email", e.target.value as string)
                  }
                  label="Email"
                />
                <Input
                  {...form.register("password")}
                  disabled={isPending}
                  type="password"
                  onChange={(e) =>
                    form.setValue("password", e.target.value as string)
                  }
                  label="Password"
                />
                <NextLink href="/auth/reset" passHref legacyBehavior>
                  <Link size="md" underline="hover">
                    Olvidaste tu contraseña?
                  </Link>
                </NextLink>
              </>
            )}
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            {showTwoFactor ? "Confirm" : "Login"}
          </Button>
          {!showTwoFactor && (
            <>
              <div className="flex items-center gap-4 py-2">
                <Divider className="flex-1" />
                <p className="shrink-0 text-tiny text-default-500">
                  O también podes
                </p>
                <Divider className="flex-1" />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Social />
              </div>
            </>
          )}
        </Form>
      </CardBody>
      <CardFooter className="flex flex-col items-center">
        <NextLink href="/auth/register" passHref legacyBehavior>
          <Link size="md" underline="hover">
            No tienes una cuenta? Regístrate
          </Link>
        </NextLink>
      </CardFooter>

      {/*       {NODE_ENV === "development" && (
        <Button
          disabled={isPending}
          onPress={() =>
            onSubmit({
              email: NEXT_PUBLIC_TEST_USER_EMAIL,
              password: NEXT_PUBLIC_TEST_USER_PASSWORD,
            })
          }
          className="w-full"
        >
          Login with test user
        </Button>
      )} */}
    </Card>
  );
};
