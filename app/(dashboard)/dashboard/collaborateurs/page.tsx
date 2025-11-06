import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FaUsers } from "react-icons/fa";

export default function Collaborateurs() {
  return (
    <div>
      <div className="flex justify-between items-center border-b pb-2">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <FaUsers className="size-5" />
            </span>{" "}
            Collaborateurs
          </h1>
          <p className="text-muted-foreground text-sm">
            Gérez les collaborateurs de l&apos;entreprise
          </p>
        </div>
        <Button>
          <PlusIcon className="w-4 h-4" />
          Ajouter un collaborateur
        </Button>
      </div>
    </div>
  );
}
