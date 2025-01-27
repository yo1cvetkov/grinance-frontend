import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { AccountDetails } from "@/features/accounts/components/AccountDetails";
import { useUser } from "@/features/auth/services/login.service";
import { FullAccount } from "@/types/Account";

export function AccountSettings() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6">
      <Tabs className="w-full" defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">My details</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="budgets">Budgets</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <AccountDetails activeAccount={user?.activeAccount as FullAccount} />
        </TabsContent>
        <TabsContent value="transactions">These are transactions for the account</TabsContent>
        <TabsContent value="budgets">These are budgets for account</TabsContent>
        <TabsContent value="insights">These are insights for the account</TabsContent>
      </Tabs>
    </section>
  );
}
