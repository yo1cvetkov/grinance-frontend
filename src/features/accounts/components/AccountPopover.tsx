import { cn } from "@/common/common.utils";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Separator } from "@/components/ui/Separator";
import { useUser } from "@/features/auth/services/login.service";
import { useLogoutMutation } from "@/features/auth/services/logout.service";
import { MAX_ACCOUNTS_PER_USER } from "@/lib/constants";
import { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { FiCircle, FiLogOut, FiPlus, FiSettings, FiUser } from "react-icons/fi";
import { HiOutlineChevronUpDown } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { ConfirmSwitchAccountDialog } from "./ConfirmSwitchAccountDialog";

interface AccountPopoverProps {
  isCollapsed: boolean;
}

export function AccountPopover({ isCollapsed }: AccountPopoverProps) {
  const [isSwitchAccountOpen, setIsSwitchAccountOpen] = useState(false);
  const [switchToAccountId, setSwitchToAccountId] = useState<string | null>(null);

  const { data: user, isLoading: isLoadingUser } = useUser();

  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  if (isLoadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div
        className={cn(
          "flex gap-x-2 items-center w-full border border-zinc-400/0 p-3 transition-all duration-300 rounded-lg",
          isCollapsed && "block w-auto",
          !isCollapsed && "border-opacity-100 border-zinc-200 "
        )}
      >
        <FaRegCircleUser size={24} className="text-zinc-800 shrink-0" />

        <div className={cn("w-full opacity-100 transition-all duration-300 flex justify-between", isCollapsed && "w-0 opacity-0 sr-only overflow-hidden")}>
          <div className="text-sm">
            <p>{user?.activeAccount?.name}</p>
          </div>
          <Popover>
            <PopoverTrigger>
              <HiOutlineChevronUpDown size={20} />
            </PopoverTrigger>
            <PopoverContent side="right" align="end" className={cn("p-0", !isCollapsed && "ml-10")}>
              <Button variant={"ghost"} className="w-full justify-start shadow-none">
                <FiUser size={20} />
                User settings
              </Button>
              <Button variant={"ghost"} className="w-full justify-start shadow-none">
                <FiSettings size={20} />
                Account settings
              </Button>
              <Separator />
              <span className="px-4 py-1 text-xs font-semibold text-zinc-700">Switch accounts</span>
              <RadioGroup
                defaultValue={user?.activeAccount?.id}
                className="px-4 my-[6px]"
                onValueChange={(value) => {
                  setIsSwitchAccountOpen(true);
                  setSwitchToAccountId(value);
                }}
              >
                {user?.accounts.map((account) => (
                  <div className="flex items-start justify-between space-x-2" key={account.id}>
                    <Label htmlFor={account.id} className="flex gap-x-2">
                      <div className="flex flex-col gap-y-1">
                        <div className="flex items-center gap-x-1">
                          {account.name}
                          {user.activeAccount?.id === account.id && <FiCircle size={8} className="fill-primary text-transparent" />}
                        </div>
                        <span className="text-xs text-muted-foreground">Balance: N/A</span>
                      </div>
                    </Label>

                    <RadioGroupItem value={account.id} />
                  </div>
                ))}
              </RadioGroup>
              {user?.accounts && user?.accounts?.length < MAX_ACCOUNTS_PER_USER && (
                <div className="px-2">
                  <Button className="w-full mb-2 text-sm shadow-md justify-center items-center" variant={"outline"} size={"sm"}>
                    <FiPlus />
                    Add account
                  </Button>
                </div>
              )}
              <Separator />
              <Button
                size={"sm"}
                variant={"ghost"}
                onClick={() => {
                  if (window.confirm("Are you sure that you want to log out?")) {
                    logoutMutation.mutate();
                    navigate("/login", { viewTransition: true });
                  } else {
                    return;
                  }
                }}
                className="w-full justify-between text-destructive hover:text-destructive bg-zinc-50 shadow-none"
              >
                Sign out
                <FiLogOut className="text-destructive" />
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {switchToAccountId ? <ConfirmSwitchAccountDialog accountId={switchToAccountId} isOpen={isSwitchAccountOpen} setIsOpen={setIsSwitchAccountOpen} /> : null}
    </>
  );
}
