import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useUser } from "@/features/auth/services/login.service";
import { useState } from "react";
import { SelectAccountDialog } from "@/features/accounts/components/SelectAccountDialog";
import { CreateAccountDialog } from "@/features/accounts/components/CreateAccountDialog";

export function DashboardLayout() {
  const { data: user, isLoading } = useUser();

  const [isCreateAccountActive, setIsCreateAccountActive] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user?.activeAccount === null && !isCreateAccountActive ? (
        <SelectAccountDialog accounts={user.accounts} isCreateAccountOpen={isCreateAccountActive} setIsCreateAccountOpen={setIsCreateAccountActive} />
      ) : user?.activeAccount === null && isCreateAccountActive ? (
        <CreateAccountDialog isCreateAccountOpen={isCreateAccountActive} setIsCreateAccountOpen={setIsCreateAccountActive} />
      ) : null}
      <div className="flex min-h-screen">
        <div className="p-1">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Header />
          <Outlet />
        </div>
      </div>
    </>
  );
}
