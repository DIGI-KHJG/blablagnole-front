import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm() {
  return (
    <form className="p-6 md:p-8 my-auto">
      <FieldGroup>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-muted-foreground text-balance">
            Créez un compte pour accéder à votre espace
          </p>
        </div>
        <div className="flex gap-2">
          <Field>
            <FieldLabel htmlFor="lastname">Nom</FieldLabel>
            <Input id="lastname" type="text" placeholder="Dupont" required />
          </Field>
          <Field>
            <FieldLabel htmlFor="firstname">Prénom</FieldLabel>
            <Input id="firstname" type="text" placeholder="Jean" required />
          </Field>
        </div>

        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Link
              href="#"
              className="ml-auto text-sm underline-offset-2 hover:underline"
            >
              Email oublié ?
            </Link>
          </div>
          <Input id="email" type="email" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </Field>
        <Field>
          <Button type="submit">Inscription</Button>
        </Field>

        <FieldDescription className="text-center">
          Vous avez déjà un compte ? <Link href="/connexion">Connexion</Link>
        </FieldDescription>
      </FieldGroup>
    </form>
  );
}
