import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type StatusTabValue = "all" | "current" | "past";

type DashboardStatusTabsProps = {
  value?: StatusTabValue;
  onValueChange?: (value: StatusTabValue) => void;
};

export default function DashboardStatusTabs({
  value,
  onValueChange,
}: DashboardStatusTabsProps) {
  return (
    <Tabs
      {...(value !== undefined
        ? { value, onValueChange: onValueChange as (v: string) => void }
        : { defaultValue: "all" })}
      className="w-fit"
    >
      <TabsList>
        <TabsTrigger value="all">Tout</TabsTrigger>
        <TabsTrigger value="current">En cours</TabsTrigger>
        <TabsTrigger value="past">Passés</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
