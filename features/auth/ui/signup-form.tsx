"use client";

import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import InputPassword from "@/components/ui/input-password";
import InputPasswordStrength from "@/components/ui/input-password-strength";
import { Spinner } from "@/components/ui/spinner";
import { useRegisterMutation } from "@/features/auth/hooks";
import { RegisterSchema, registerSchema } from "@/features/auth/schemas";
import { generateAvatarUrl } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function SignupForm() {
  const { mutate: register, isPending } = useRegisterMutation();
  const router = useRouter();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      role: "ADMIN",
      profile_picture: "https://ui-avatars.com/api/?name=John+Doe",
    },
  });

  const onSubmit = (data: RegisterSchema) => {
    const formData = {
      ...data,
      profile_picture: generateAvatarUrl(data.firstName),
    };

    console.log(formData);

    register(formData, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: () => {
        toast.error("Inscription échouée");
      },
    });
  };

  return (
    <form
      id="signup-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="p-6 md:p-8 my-auto"
    >
      <BlablagnoleLogo className="w-56 mx-auto mb-8" />
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-muted-foreground text-balance">
            Créez un compte pour accéder à votre espace collaborateur
          </p>
        </div>
        <div className="flex gap-2">
          <Controller
            control={form.control}
            name="lastName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nom</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Dupont"
                  autoComplete="family-name"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Prénom</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  type="text"
                  placeholder="Jean"
                  autoComplete="given-name"
                  required
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Email</FieldLabel>
              <Input
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                type="email"
                placeholder="m@example.com"
                autoComplete="email"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Mot de passe</FieldLabel>
              <InputPasswordStrength
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Entrez votre mot de passe"
                autoComplete="new-password"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="passwordConfirmation"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Confirmation du mot de passe
              </FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Entrez votre mot de passe"
                autoComplete="new-password"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" form="signup-form">
            {isPending ? <Spinner className="w-4 h-4" /> : "S'inscrire"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Vous avez déjà un compte ?{" "}
          <Link className="text-primary" href="/connexion">
            Connexion
          </Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
