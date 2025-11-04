"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { useId, useState } from "react";

import { Input } from "@/components/ui/input";

interface InputPasswordProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "value" | "onChange" | "onBlur"
  > {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export default function InputPassword({
  id,
  value = "",
  onChange,
  onBlur,
  className,
  placeholder,
  autoComplete,
  required,
  "aria-invalid": ariaInvalid,
  ...props
}: InputPasswordProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="relative">
      <Input
        {...props}
        id={inputId}
        className={`pe-9 ${className || ""}`}
        placeholder={placeholder}
        type={isVisible ? "text" : "password"}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={ariaInvalid}
      />
      <button
        className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        onClick={toggleVisibility}
        aria-label={
          isVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"
        }
        aria-pressed={isVisible}
        aria-controls={inputId}
      >
        {isVisible ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
