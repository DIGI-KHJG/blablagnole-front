import { BlablagnoleLogo } from "@/components/ui/blablagnole-logo";
import Link from "next/link";
interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer = ({
  menuItems = [],
  copyright = "© 2025 Blablagnole.fr - Tous droits réservés.",
}: FooterProps) => {
  return (
    <section className="py-16 border-t">
      <footer className="container mx-auto">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 lg:justify-start">
              <BlablagnoleLogo className="w-56" />
            </div>
          </div>
          {menuItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              <h3 className="mb-4 font-bold">{section.title}</h3>
              <ul className="text-muted-foreground space-y-4">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="hover:text-primary font-medium">
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="text-muted-foreground mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium md:flex-row md:items-center ">
        <p className="mx-10">{copyright}</p>
      </div>
    </section>
  );
};

export { Footer };
