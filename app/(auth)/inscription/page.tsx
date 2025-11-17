import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import { SignupForm } from "@/features/auth/ui/signup-form";
import Image from "next/image";

export default function InscriptionPage() {
  return (
    <>
      <SignupForm />
      <div className="bg-muted relative hidden md:block">
        <div className="relative h-full w-full">
          <Image
            src="/auth/signup-image.jpg"
            alt="Image"
            className="absolute inset-0 h-full w-full  object-cover object-right dark:brightness-[0.2] dark:grayscale"
            fill
          />
          <h2 className="absolute top-4 left-6 text-5xl text-white font-bold">
            Covoiturez entre collègues, simplement !
          </h2>
          <BlablagnoleLogo className="absolute bottom-0 right-6 w-56" />
        </div>
      </div>
    </>
  );
}
