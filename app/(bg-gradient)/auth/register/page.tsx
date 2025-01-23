import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { RegisterForm } from "@/components/auth/register-form";

const RegisterPage = () => {
  return (
    <Suspense fallback={<Loader1 />}>
      <RegisterForm />
    </Suspense>
  );
}

export default RegisterPage;