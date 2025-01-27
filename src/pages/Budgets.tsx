import { Separator } from "@/components/ui/Separator";
import { useUser } from "@/features/auth/services/login.service";
import { BudgetTabs } from "@/features/budgets/components/BudgetTabs";
import { FullAccount } from "@/types/Account";

export function Budgets() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6">
      <Separator />
      <div className="pt-6">
        <h1 className="text-2xl text-zinc-900 font-semibold">Budgets overview</h1>
        <p className="text-sm text-muted-foreground">Select a budget that you want to see transaction history for...</p>
      </div>
      <div>
        <BudgetTabs activeAccount={user?.activeAccount as FullAccount} />
      </div>
    </section>
  );
}
