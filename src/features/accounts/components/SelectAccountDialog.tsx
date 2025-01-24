import { Logo } from "@/components/Logo";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { SelectAccountItem } from "./SelectAccountItem";
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/ui/Button";
import { FiPlusCircle } from "react-icons/fi";
import { Account } from "@/types/Account";
import React, { SetStateAction } from "react";
import { MAX_ACCOUNTS_PER_USER } from "@/lib/constants";

interface SelectAccountDialogProps {
  isCreateAccountOpen: boolean;
  setIsCreateAccountOpen: React.Dispatch<SetStateAction<boolean>>;
  accounts: Account[];
}

export function SelectAccountDialog({ accounts, isCreateAccountOpen, setIsCreateAccountOpen }: SelectAccountDialogProps) {
  return (
    <Dialog open={!isCreateAccountOpen}>
      <DialogContent hasClose={false}>
        <DialogHeader>
          <div className="space-y-5">
            <Logo isCollapsed />
            <DialogTitle className="flex items-center justify-between">
              Select account
              <span className="text-xs text-muted-foreground font-normal">{accounts.length} / 5</span>
            </DialogTitle>
          </div>
          <DialogDescription>You must select one of the accounts below. If you don't have one, please create.</DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          {accounts.map((acc) => (
            <SelectAccountItem account={acc} key={acc.id} />
          ))}
        </div>
        {accounts.length < MAX_ACCOUNTS_PER_USER && (
          <>
            <Separator />
            <Button variant={"outline"} className="w-full" onClick={() => setIsCreateAccountOpen(true)}>
              <FiPlusCircle size={10} />
              Add new account
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
