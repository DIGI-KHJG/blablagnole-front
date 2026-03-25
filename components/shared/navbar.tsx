"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuChevronsUpDown, LuLogOut, LuMenu } from "react-icons/lu";
import { MdAccountCircle } from "react-icons/md";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Spinner } from "@/components/ui/spinner";
import { useGetCurrentUser, useLogout } from "@/features/auth/hooks";
import { SITE_SECTION_LINKS } from "@/lib/site-sections";
import { getInitials } from "@/lib/user";

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

const defaultMenu: MenuItem[] = SITE_SECTION_LINKS.map(({ label, href }) => ({
  title: label,
  url: href,
}));

const Navbar = ({
  menu = defaultMenu,
  auth = {
    login: { title: "Connexion", url: "/connexion" },
    signup: { title: "S'inscrire", url: "/inscription" },
  },
}: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  const { mutate: logout, isPending } = useLogout();
  const router = useRouter();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push("/connexion");
      },
      onError: () => {
        toast.error("Erreur lors de la déconnexion");
      },
    });
  };

  return (
    <motion.div
      className="fixed top-5 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.section
        className="mx-auto max-w-7xl rounded-full border border-border bg-background px-4 py-2.5 shadow-sm sm:px-6"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.35,
          delay: 0.05,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {/* Menu desktop */}
        <nav className="hidden grid-cols-3 items-center lg:grid">
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <BlablagnoleLogo className="w-40" />
          </motion.div>
          <motion.div
            className="relative z-10 flex items-center justify-center gap-x-6 xl:gap-x-8"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.05, delayChildren: 0.15 },
              },
              hidden: {},
            }}
          >
            {menu.map((item) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, y: 6 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  href={item.url}
                  className="whitespace-nowrap text-sm font-medium hover:text-primary transition-colors inline-block"
                >
                  <motion.span
                    className="block"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.title}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="flex justify-end items-center gap-2"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {currentUser ? (
              <>
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button asChild size="lg" className="rounded-full">
                      <Link
                        className="text-md"
                        href="/dashboard/covoiturages/mes-annonces"
                      >
                        Mon Espace
                      </Link>
                    </Button>
                  </motion.div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-9 w-9 p-0 shrink-0"
                      >
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={currentUser.profilePicture}
                            alt={currentUser.fullName}
                          />
                          <AvatarFallback className=" text-xs">
                            {getInitials(currentUser, "CN")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Ouvrir le menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="min-w-56 rounded-lg"
                      align="end"
                      sideOffset={4}
                    >
                      <DropdownMenuLabel className="p-0 font-normal">
                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                          <Avatar className="h-8 w-8 rounded-lg shrink-0">
                            <AvatarImage
                              src={currentUser.profilePicture}
                              alt={currentUser.fullName}
                            />
                            <AvatarFallback className="rounded-lg text-xs">
                              {getInitials(currentUser, "CN")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="grid flex-1 text-left text-sm leading-tight min-w-0">
                            <span className="truncate font-medium">
                              {currentUser.fullName}
                            </span>
                            <span className="truncate text-xs text-muted-foreground">
                              {currentUser.email}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                          <Link
                            href="/dashboard/profile"
                            className="cursor-pointer flex items-center gap-2"
                          >
                            <MdAccountCircle className="size-5 text-secondary" />
                            Mon profil
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout}>
                        <LuLogOut className="size-4 text-secondary" />
                        {isPending ? (
                          <Spinner className="size-4" />
                        ) : (
                          "Déconnexion"
                        )}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild variant="outline" size="lg">
                    <Link className="text-md" href={auth.login.url}>
                      {auth.login.title}
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button asChild size="lg">
                    <Link className="text-md" href={auth.signup.url}>
                      {auth.signup.title}
                    </Link>
                  </Button>
                </motion.div>
              </>
            )}
          </motion.div>
        </nav>

        {/* Menu mobile */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <BlablagnoleLogo className="w-40" />
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
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
                <div className="flex flex-col text-center gap-5 p-4">
                  {menu.map((item) => (
                    <Link
                      className="text-md font-medium text-primary bg-white border-2 border-primary rounded-lg p-2"
                      key={item.title}
                      href={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}

                  <div className="flex flex-col gap-3">
                    {currentUser ? (
                      <>
                        <Link
                          className="text-md font-medium text-white bg-primary border-2 border-primary rounded-full p-2"
                          href="/dashboard/covoiturages/mes-annonces"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Mon Espace
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start gap-3 rounded-full py-2 h-auto border border-border"
                            >
                              <Avatar className="h-10 w-10 rounded-lg shrink-0">
                                <AvatarImage
                                  src={currentUser.profilePicture}
                                  alt={currentUser.fullName}
                                />
                                <AvatarFallback className="rounded-lg">
                                  {getInitials(currentUser, "CN")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex flex-1 flex-col items-start text-left">
                                <span className="font-medium truncate w-full">
                                  {currentUser.fullName}
                                </span>
                                <span className="text-xs text-muted-foreground truncate w-full">
                                  {currentUser.email}
                                </span>
                              </div>
                              <LuChevronsUpDown className="size-4 shrink-0 ml-auto" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            className="min-w-56 rounded-lg w-(--radix-dropdown-menu-trigger-width)"
                            align="end"
                            side="bottom"
                            sideOffset={4}
                          >
                            <DropdownMenuGroup>
                              <DropdownMenuItem asChild>
                                <Link
                                  href="/dashboard/profile"
                                  className="cursor-pointer flex items-center gap-2"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <MdAccountCircle className="size-5" />
                                  Mon profil
                                </Link>
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setMobileMenuOpen(false);
                                handleLogout();
                              }}
                            >
                              <LuLogOut className="size-4" />
                              {isPending ? (
                                <Spinner className="size-4" />
                              ) : (
                                "Déconnexion"
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </>
                    ) : (
                      <>
                        <Button asChild variant="outline">
                          <Link
                            className="text-md font-medium hover:text-primary"
                            href={auth.login.url}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {auth.login.title}
                          </Link>
                        </Button>
                        <Button asChild>
                          <Link
                            className="text-md font-medium hover:text-primary"
                            href={auth.signup.url}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {auth.signup.title}
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export { Navbar };
