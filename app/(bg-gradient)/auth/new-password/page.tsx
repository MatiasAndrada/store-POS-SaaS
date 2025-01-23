import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { NewPasswordForm } from "@/components/auth/new-password-form";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<Loader1 />}>
      <NewPasswordForm />
    </Suspense>
  );
}

export default NewPasswordPage;