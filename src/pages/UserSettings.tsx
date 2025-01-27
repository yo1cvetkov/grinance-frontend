import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { useUser } from "@/features/auth/services/login.service";
import { UserDetails } from "@/features/users/components/UserDetails";
import { User } from "@/types/User";

export function UserSettings() {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="px-6">
      <Tabs className="w-full" defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">My details</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <UserDetails user={user as User} />
        </TabsContent>
      </Tabs>
    </section>
  );
}
