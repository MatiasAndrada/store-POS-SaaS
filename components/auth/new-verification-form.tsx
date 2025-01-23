"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Loader1 } from "../loaders";
import { newVerification } from "@/actions/new-verification";
//ui
import { Card } from "@nextui-org/card";
import { Alert } from "@nextui-org/alert";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams?.get("token") || "";

  const onSubmit = useCallback(() => {
    if (!token) {
      setError("No se ha proporcionado un token de verificación.");
      return;
    }

    if (success || error) return;

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch((e) => {
        console.log("Error en la verificación", e);
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Card className="w-[400px] p-4" shadow="md">
      <div className="flex items-center w-full justify-center">
        <Suspense fallback={<Loader1 />}>
          {success && <Alert color="success">{success}</Alert>}
          {error && <Alert color="danger">{error}</Alert>}
        </Suspense>
      </div>
    </Card>
  );
};
