import { FullAccount } from "@/types/Account";
import { useOneTimeTransactions } from "../services/one-time-transaction.service";
import { TransactionsTable } from "./TransactionsTable";
import { OneTimeTransaction } from "@/types/Transaction";

export function AllTransactionsHistory({ activeAccount }: { activeAccount: FullAccount }) {
  const { data, isLoading } = useOneTimeTransactions({ accountId: activeAccount.id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold mb-4">Transaction history (all)</h2>
      <TransactionsTable transactions={data?.transactions as OneTimeTransaction[]} />
    </section>
  );
}
