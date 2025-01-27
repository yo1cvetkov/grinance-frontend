import { FullAccount } from "@/types/Account";
import { useAllOneTimeTransactions } from "../services/one-time-transaction.service";

export function AllTransactionsHistory({ activeAccount }: { activeAccount: FullAccount }) {
  const { data: transactions, isLoading } = useAllOneTimeTransactions(activeAccount.id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(transactions);

  return (
    <section className="py-8">
      <h2 className="text-lg font-semibold">Transaction history</h2>
      <p>All</p>
    </section>
  );
}
