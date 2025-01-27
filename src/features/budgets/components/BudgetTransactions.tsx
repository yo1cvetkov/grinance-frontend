import { AllTransactionsHistory } from "@/features/transactions/components/AllTransactionsHistory";
import { FullAccount } from "@/types/Account";
import { Budget } from "@/types/Budget";

interface BudgetTransactionsProps {
  budget: Budget | null;
  activeAccount: FullAccount;
}

export function BudgetTransactions({ budget, activeAccount }: BudgetTransactionsProps) {
  console.log(budget);

  if (!budget) {
    console.log("budget");

    return <AllTransactionsHistory activeAccount={activeAccount} />;
  }

  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold">Transaction history</h2>
      <p>{budget?.category.name}</p>
    </section>
  );
}
