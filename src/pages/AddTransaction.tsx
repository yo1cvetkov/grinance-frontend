import { Separator } from "@/components/ui/Separator";
import { useUser } from "@/features/auth/services/login.service";
import { AddTransactionForm } from "@/features/transactions/components/AddTransactionForm";
import { FullAccount } from "@/types/Account";

export function AddTransaction() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6">
      <Separator />
      <div className="pt-6">
        <h1 className="text-2xl text-zinc-900 font-semibold">Add new transaction</h1>
        <p className="text-sm text-muted-foreground">Fill out the form below in order to create a new transaction...</p>
      </div>
      <AddTransactionForm activeAccount={user?.activeAccount as FullAccount} />
    </section>
  );
}
