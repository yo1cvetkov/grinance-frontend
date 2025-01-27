import { TransactionsTable } from "@/features/transactions/components/TransactionsTable";
import { useOneTimeTransactions } from "@/features/transactions/services/one-time-transaction.service";
import { FullAccount } from "@/types/Account";
import { Budget } from "@/types/Budget";
import { OneTimeTransaction } from "@/types/Transaction";

interface BudgetTransactionsHistoryProps {
  activeAccount: FullAccount;
  budget: Budget;
}

export function BudgetTransactionsHistory({ activeAccount, budget }: BudgetTransactionsHistoryProps) {
  const { data, isLoading } = useOneTimeTransactions({ accountId: activeAccount.id, budgetId: budget.id });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold mb-4">Transaction history</h2>
      <TransactionsTable transactions={data?.transactions as OneTimeTransaction[]} />
    </section>
  );
}
