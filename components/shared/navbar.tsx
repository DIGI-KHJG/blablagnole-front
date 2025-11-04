import Link from "next/link";
import { LuMenu } from "react-icons/lu";

import { Button } from "@/components/ui/button";

import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MenuItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

interface NavbarProps {
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar = ({
  menu = [],
  auth = {
    login: { title: "Connexion", url: "/connexion" },
    signup: { title: "S'inscrire", url: "/inscription" },
  },
}: NavbarProps) => {
  return (
    <section className="bg-background py-4 fixed top-0 left-0 right-0 z-50 border-b">
      <div className="container mx-auto">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-between lg:flex">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <BlablagnoleLogo className="w-56" />
          </div>
          <div className="flex items-center gap-6">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.url}
                className="text-md font-medium hover:text-primary"
              >
                {item.title}
              </Link>
            ))}
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="lg">
              <Link className="text-md" href={auth.login.url}>
                {auth.login.title}
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link className="text-md" href={auth.signup.url}>
                {auth.signup.title}
              </Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BlablagnoleLogo className="w-40" />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <LuMenu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <BlablagnoleLogo className="w-48" />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  {menu.map((item) => (
                    <Link
                      className="text-md font-medium hover:text-primary"
                      key={item.title}
                      href={item.url}
                    >
                      {item.title}
                    </Link>
                  ))}

                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link
                        className="text-md font-medium hover:text-primary"
                        href={auth.login.url}
                      >
                        {auth.login.title}
                      </Link>
                    </Button>
                    <Button asChild>
                      <Link
                        className="text-md font-medium hover:text-primary"
                        href={auth.signup.url}
                      >
                        {auth.signup.title}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };
