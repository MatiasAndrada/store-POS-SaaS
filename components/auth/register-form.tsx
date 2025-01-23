"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas/auth";
import { register } from "@/actions/register";
//ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Form } from "@nextui-org/form";
import { Link } from "@nextui-org/link";
import { Alert } from "@nextui-org/alert";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Card className="w-[400px] p-4" shadow="md">
      <CardHeader className="flex flex-col items-center gap-4">
        <Image
          src="/assets/icons/store-icon-192x192.png"
          width={80}
          height={80}
          alt="Icon"
        />
        <h1 className="text-3xl font-semibold">Registro de cuenta</h1>
        {error && <Alert color="danger">{error}</Alert>}
        {success && <Alert color="success">{success}</Alert>}
      </CardHeader>
      <CardBody>
        <Form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
          <div className="space-y-4 w-full">
            <Input
              {...form.register("name")}
              onChange={(e) => {
                form.setValue("name", e.target.value as string);
              }}
              disabled={isPending}
              label="Nombre"
              type="text"
            />
            <Input
              {...form.register("email")}
              onChange={(e) => {
                form.setValue("email", e.target.value as string);
              }}
              disabled={isPending}
              label="Email"
              type="email"
            />
            <Input
              {...form.register("password")}
              onChange={(e) => {
                form.setValue("password", e.target.value as string);
              }}
              disabled={isPending}
              label="Contraseña"
              type="password"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Crear cuenta
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="flex flex-col items-center gap-4">
        <NextLink href="/auth/login" passHref legacyBehavior>
          <Link size="md" underline="hover">
            Ya tienes una cuenta? Inicia sesión
          </Link>
        </NextLink>
      </CardFooter>
    </Card>
  );
};
