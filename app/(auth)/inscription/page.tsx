import { SignupForm } from "@/features/auth/ui/signup-form";
import Image from "next/image";

export default function InscriptionPage() {
  return (
    <>
      <SignupForm />
      <div className="bg-muted relative hidden md:block">
        <Image
          src="/auth/login-image-.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          width={2000}
          height={1000}
        />
      </div>
    </>
  );
}
