import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type RoleTabValue = "all" | "admin" | "collaborator";

type DashboardRoleTabsProps = {
  value?: RoleTabValue;
  onValueChange?: (value: RoleTabValue) => void;
};

export default function DashboardRoleTabs({
  value,
  onValueChange,
}: DashboardRoleTabsProps) {
  return (
    <Tabs
      {...(value !== undefined
        ? { value, onValueChange: onValueChange as (v: string) => void }
        : { defaultValue: "all" })}
      className="w-[400px]"
    >
      <TabsList>
        <TabsTrigger value="all">Tout</TabsTrigger>
        <TabsTrigger value="admin">Administration</TabsTrigger>
        <TabsTrigger value="collaborator">Collaborateur</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
