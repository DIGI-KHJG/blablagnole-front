import { LoginForm } from "@/features/auth/ui/login-form";
import Image from "next/image";

export default function ConnexionPage() {
  return (
    <>
      <LoginForm />
      <div className="bg-muted relative hidden md:block">
        <Image
          src="/auth/login-image-8.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full  object-contain dark:brightness-[0.2] dark:grayscale"
          width={2000}
          height={1000}
        />
      </div>
    </>
  );
}
