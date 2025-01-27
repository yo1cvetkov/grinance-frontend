import { AllTransactionsHistory } from "@/features/transactions/components/AllTransactionsHistory";
import { FullAccount } from "@/types/Account";
import { Budget } from "@/types/Budget";
import { BudgetTransactionsHistory } from "./BudgetTransactionsHistory";

interface BudgetTransactionsProps {
  budget: Budget | null;
  activeAccount: FullAccount;
}

export function BudgetTransactions({ budget, activeAccount }: BudgetTransactionsProps) {
  if (!budget) {
    return <AllTransactionsHistory activeAccount={activeAccount} />;
  }

  return <BudgetTransactionsHistory activeAccount={activeAccount} budget={budget} />;
}
