import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<Loader1 />}>
      <LoginForm />
    </Suspense>
  );
}

export default LoginPage;