import { buttonVariants } from "@/components/ui/Button";
import { useAccountBudgets } from "../services/account-budgets.service";
import { FullAccount } from "@/types/Account";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { cn } from "@/common/common.utils";

export function BudgetTabs({ activeAccount }: { activeAccount: FullAccount }) {
  const { data: budgets, isLoading } = useAccountBudgets(activeAccount?.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!budgets?.length) {
    return (
      <div className="flex flex-col mx-auto w-full max-w-sm pt-52">
        <p className="text-zinc-800 font-semibold">No budgets defined</p>
        <p className="text-sm text-muted-foreground">There are no budgets defined for this account.</p>
        <Link to={"/dashboard/budgets/add"} viewTransition className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-min mt-2")}>
          <FiPlus />
          Add budget
        </Link>
      </div>
    );
  }

  return (
    <div>
      {budgets?.map((budget) => (
        <div>{budget.category.name}</div>
      ))}
    </div>
  );
}
