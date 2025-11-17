import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function UsersDataTableSkeleton() {
  return (
    <div className="rounded-md border mt-8">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20 mx-auto" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20 mx-auto" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-24 mx-auto" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-16 mx-auto" />
            </TableHead>
            <TableHead className="text-center">
              <Skeleton className="h-4 w-20 mx-auto" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell className="text-center">
                <Skeleton className="h-10 w-10 rounded-full mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-24 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-32 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </TableCell>
              <TableCell className="text-center">
                <div className="flex gap-2 justify-center">
                  <Skeleton className="h-9 w-16" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
