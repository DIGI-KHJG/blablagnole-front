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
import { Spinner } from "@/components/ui/spinner";
import { useLoginMutation } from "@/features/auth/hooks";
import { LoginSchema, loginSchema } from "@/features/auth/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const { mutate: login, isPending } = useLoginMutation();
  const router = useRouter();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginSchema) => {
    login(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
      onError: () => {
        toast.error("Connexion échouée");
      },
    });
  };
  return (
    <form
      className="p-6 md:p-8 my-auto"
      id="login-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <BlablagnoleLogo className="w-56 mx-auto mb-8" />
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-muted-foreground text-balance">
            Connectez-vous à votre compte
          </p>
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
              <FieldLabel htmlFor={field.name}>
                Confirmation du mot de passe
              </FieldLabel>
              <InputPassword
                {...field}
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="Entrez votre mot de passe"
                autoComplete="password"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Field>
          <Button type="submit" form="login-form">
            {isPending ? <Spinner className="w-4 h-4" /> : "Connexion"}
          </Button>
        </Field>

        <FieldDescription className="text-center">
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/inscription">Inscription</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
