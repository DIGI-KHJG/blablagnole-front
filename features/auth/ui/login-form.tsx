import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function LoginForm() {
  return (
    <form className="p-6 md:p-8 my-auto">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Connexion</h1>
          <p className="text-muted-foreground text-balance">
            Connectez-vous à votre compte
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            className="border"
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </Field>
        <Field>
          <Button type="submit">Connexion</Button>
        </Field>

        <FieldDescription className="text-center">
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/inscription">Inscription</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
