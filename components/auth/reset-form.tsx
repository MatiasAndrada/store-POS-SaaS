"use client";

import NextLink from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ResetSchema } from "@/schemas/auth";
import { resetPassword } from "@/actions/resetPassword";

//ui
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Form } from "@nextui-org/form";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Alert } from "@nextui-org/alert";

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      resetPassword(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Card className="w-[400px] p-4" shadow="md">
      <CardHeader className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold">Olvido su contraseña?</h1>
        {error && <Alert title={error} color="danger" />}
        {success && <Alert title={success} color="success" />}
      </CardHeader>
      <CardBody>
        <Form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <div className="space-y-4 w-full">
            <Input
              {...form.register("email")}
              disabled={isPending}
              label="Email"
              type="email"
              className="w-full"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Enviar correo de recuperación
          </Button>
        </Form>
      </CardBody>
      <CardFooter className="flex flex-col items-center gap-4">
        <NextLink href="/auth/login" passHref legacyBehavior>
          <Link size="md" underline="hover">
            Volver al inicio de sesión
          </Link>
        </NextLink>
      </CardFooter>
    </Card>
  );
};
