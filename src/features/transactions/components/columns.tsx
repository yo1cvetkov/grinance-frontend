import { cn } from "@/common/common.utils";
import { Checkbox } from "@/components/ui/Checkbox";
import { Category } from "@/types/Category";
import { OneTimeTransaction } from "@/types/Transaction";
import { TransactionType } from "@/types/TransactionType.enum";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<OneTimeTransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.original.account.currency,
      }).format(amount);

      return (
        <div className={cn(row.original.type === TransactionType.EXPENSE ? "text-red-500" : "text-primary")}>
          {row.original.type === TransactionType.EXPENSE ? "-" : "+"}
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "transactionDate",
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(new Date(row.getValue("transactionDate")));

      return <span className="text-zinc-500 text-sm">{formattedDate}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const categoryName = (row.getValue("category") as Category).name;

      return (
        <div className="items-center gap-x-1 border inline-flex px-1.5 py-[1px] text-xs rounded-md">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-300" />
          {categoryName}
        </div>
      );
    },
  },
];
