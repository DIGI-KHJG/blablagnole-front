"use client";

import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";
import { useId, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

interface InputPasswordStrengthProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "value" | "onChange" | "onBlur"
  > {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

export default function InputPasswordStrength({
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
}: InputPasswordStrengthProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const descriptionId = `${inputId}-description`;
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  const checkStrength = (pass: string) => {
    const requirements = [
      { regex: /.{8,}/, text: "Au moins 8 caractères" },
      { regex: /[0-9]/, text: "Au moins 1 chiffre" },
      { regex: /[a-z]/, text: "Au moins 1 lettre minuscule" },
      { regex: /[A-Z]/, text: "Au moins 1 lettre majuscule" },
    ];

    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);

  const strengthScore = useMemo(() => {
    return strength.filter((req) => req.met).length;
  }, [strength]);

  const getStrengthColor = (score: number) => {
    if (score === 0) return "bg-border";
    if (score <= 1) return "bg-red-500";
    if (score <= 2) return "bg-orange-500";
    if (score === 3) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getStrengthText = (score: number) => {
    if (score === 0) return "Entrez un mot de passe";
    if (score <= 2) return "Mot de passe faible";
    if (score === 3) return "Mot de passe moyen";
    return "Mot de passe fort";
  };

  return (
    <div>
      {/* Password input field with toggle visibility button */}
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
          aria-describedby={descriptionId}
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

      {/* Password strength indicator */}
      {value && (
        <>
          <div
            className="mt-3 mb-4 h-1 w-full overflow-hidden rounded-full bg-border"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Force du mot de passe"
          >
            <div
              className={`h-full ${getStrengthColor(
                strengthScore
              )} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            ></div>
          </div>

          {/* Password strength description */}
          <p
            id={descriptionId}
            className="mb-2 text-sm font-medium text-foreground"
          >
            {getStrengthText(strengthScore)}. Doit contenir :
          </p>

          {/* Password requirements list */}
          <ul className="space-y-1.5" aria-label="Exigences du mot de passe">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon
                    size={16}
                    className="text-emerald-500"
                    aria-hidden="true"
                  />
                ) : (
                  <XIcon
                    size={16}
                    className="text-muted-foreground/80"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`text-xs ${
                    req.met ? "text-emerald-600" : "text-muted-foreground"
                  }`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met
                      ? " - Exigence respectée"
                      : " - Exigence non respectée"}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
