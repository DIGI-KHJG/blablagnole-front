import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlablagnoleLogoProps {
  className?: string;
}

export function BlablagnoleLogo({ className }: BlablagnoleLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/logo-blablagnole.png"
        width={150}
        height={150}
        className={cn("object-contain", className)}
        alt="Blablagnole Logo"
      />
    </Link>
  );
}
