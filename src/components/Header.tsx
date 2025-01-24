import { useUser } from "@/features/auth/services/login.service";
import { Banner } from "./Banner";
import { AddBalanceDrawer } from "@/features/accounts/components/AddBudgetDrawer";
import { useState } from "react";

export function Header() {
  const [isAddBudgetActive, setIsAddBudgetActive] = useState(false);

  const { data: user } = useUser();

  if (user?.activeAccount?.balance === 0) {
    return (
      <>
        <header className="py-2 px-2">
          <Banner
            body="You have to set the balance for your account in order to use features"
            buttonLabel="Add balance"
            onClick={() => setIsAddBudgetActive(true)}
          />
          <div className="bg-background flex justify-start px-4 items-center h-14">
            <div className="flex items-center gap-x-4">
              <h1 className="text-2xl font-semibold">{user?.activeAccount?.name}</h1>
            </div>
          </div>
        </header>
        <AddBalanceDrawer activeAccount={user.activeAccount} isOpen={isAddBudgetActive} setIsOpen={setIsAddBudgetActive} />
      </>
    );
  }

  return (
    <header className="py-2 px-2">
      <div className="bg-background flex justify-start px-4 items-center h-14">
        <div className="flex items-center gap-x-4">
          <h1 className="text-2xl font-semibold">{user?.activeAccount?.name}</h1>
        </div>
      </div>
    </header>
  );
}
