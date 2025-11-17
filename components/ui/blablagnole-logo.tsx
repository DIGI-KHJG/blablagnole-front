import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface BlablagnoleLogoProps {
  className?: string;
  type?: "full" | "icon";
}

export function BlablagnoleLogo({
  className,
  type = "full",
}: BlablagnoleLogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={type === "full" ? "/bbgl-logo.svg" : "/bbgl-icon.svg"}
        width={type === "full" ? 250 : 32}
        height={type === "full" ? 250 : 32}
        className={cn("object-contain", className)}
        alt="Blablagnole Logo"
        loading="eager"
      />
    </Link>
  );
}
