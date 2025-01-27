import { Separator } from "@/components/ui/Separator";
import { useUser } from "@/features/auth/services/login.service";
import { AddBudgetForm } from "@/features/budgets/components/AddBudgetForm";
import { FullAccount } from "@/types/Account";

export function AddBudget() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6">
      <Separator />
      <div className="pt-6">
        <h1 className="text-2xl text-zinc-900 font-semibold">Add new budget</h1>
        <p className="text-sm text-muted-foreground">Fill out the form below in order to create a new budget...</p>
      </div>
      <AddBudgetForm activeAccount={user?.activeAccount as FullAccount} />
    </section>
  );
}
