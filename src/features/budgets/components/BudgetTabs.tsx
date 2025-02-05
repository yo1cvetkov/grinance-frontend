import { buttonVariants } from "@/components/ui/Button";
import { useAccountBudgets } from "../services/account-budgets.service";
import { FullAccount } from "@/types/Account";
import { FiPlus, FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import { cn } from "@/common/common.utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { BudgetTransactions } from "./BudgetTransactions";

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
    <Tabs defaultValue="all" onValueChange={(value) => console.log(value)} className="mt-4">
      <div className="flex items-center gap-x-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {budgets?.map((budget) => (
            <TabsTrigger key={budget.id} value={budget.id}>
              {budget.category.name}
            </TabsTrigger>
          ))}
        </TabsList>
        <Link to={"/dashboard/budgets/add"} viewTransition className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "text-primary shadow-none")}>
          <FiPlusCircle />
        </Link>
      </div>
      <TabsContent value="all">
        <BudgetTransactions budget={null} activeAccount={activeAccount} />
      </TabsContent>
      {budgets.map((budget) => (
        <TabsContent key={budget.id} value={budget.id}>
          <BudgetTransactions budget={budget} activeAccount={activeAccount} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
