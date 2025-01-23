import { Suspense } from "react";
import { Loader1 } from "@/components/loaders";
import { NewVerificationForm } from "@/components/auth/new-verification-form";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<Loader1 />}>
      <NewVerificationForm />
    </Suspense>
  );
}

export default NewVerificationPage;