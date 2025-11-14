import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { type IconType } from "react-icons";

interface DashboardPageTitleProps {
  title: string;
  description: string;
  icon: IconType;
  buttonText?: string;
  onButtonClick?: () => void;
  children?: React.ReactNode;
}

export default function DashboardPageTitle({
  title,
  description,
  icon: Icon,
  buttonText,
  onButtonClick,
  children,
}: DashboardPageTitleProps) {
  return (
    <div className="border-b pb-2 space-y-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-primary bg-primary/10 rounded-full p-1">
              <Icon className="size-5" />
            </span>{" "}
            {title}
          </h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
        {buttonText && (
          <Button onClick={onButtonClick}>
            <PlusIcon className="w-4 h-4" />
            {buttonText}
          </Button>
        )}
      </div>
      {children}
    </div>
  );
}
