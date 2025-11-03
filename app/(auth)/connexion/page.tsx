import { LoginForm } from "@/features/auth/ui/login-form";
import Image from "next/image";

export default function ConnexionPage() {
  return (
    <>
      <LoginForm />
      <div className="bg-muted relative hidden md:block">
        <Image
          src="/auth/login-image.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-none"
          width={500}
          height={500}
        />
      </div>
    </>
  );
}
