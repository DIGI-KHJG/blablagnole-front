import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import { LoginForm } from "@/features/auth/ui/login-form";
import Image from "next/image";

export default function ConnexionPage() {
  return (
    <>
      <LoginForm />
      <div className="bg-muted relative hidden md:block">
        <div className="relative h-full w-full">
          <Image
            src="/auth/login-image.webp"
            alt="Image"
            className="absolute inset-0 h-full w-full  object-cover object-right dark:brightness-[0.2] dark:grayscale"
            fill
            priority
            loading="eager"
          />
          <h2 className="absolute top-4 left-6 text-5xl text-white font-bold">
            Faites route commune, <br /> gagnez du temps !
          </h2>
          <BlablagnoleLogo className="absolute bottom-0 right-6 w-56" />
        </div>
      </div>
    </>
  );
}
