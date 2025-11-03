import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0 rounded-none border-none">
        <CardContent className="grid p-0 md:grid-cols-2 h-screen">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
