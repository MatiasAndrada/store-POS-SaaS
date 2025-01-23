"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { NewPasswordSchema } from "@/schemas/auth";
import { newPassword } from "@/actions/new-password";
//ui
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Form } from "@nextui-org/form";
import { Alert } from "@nextui-org/react";

export const NewPasswordForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values)
        .then((response) => {
          if (response.error) {
            setError(response.error);
          } else {
            setSuccess("Password reset successfully");
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Card className="w-[400px] p-4" shadow="md">
      <CardHeader className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-semibold">Reset Password</h1>
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
              {...form.register("password")}
              disabled={isPending}
              label="New Password"
              type="password"
              className="w-full"
            />
            <Input
              {...form.register("confirmPassword")}
              disabled={isPending}
              label="Confirm Password"
              type="password"
              className="w-full"
            />
          </div>
          <Button disabled={isPending} type="submit" className="w-full">
            Reset Password
          </Button>
        </Form>
      </CardBody>
    </Card>
  );
};
