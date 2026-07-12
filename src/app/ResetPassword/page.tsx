import { Suspense } from "react";
import ResetPasswordForm from "@/app/ResetPassword/ResetPassowordForm";

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
