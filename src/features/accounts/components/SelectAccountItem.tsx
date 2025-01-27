import { Label } from "@/components/ui/Label";
import { Account } from "@/types/Account";
import { FiArrowRight } from "react-icons/fi";
import { useSelectAccountMutation } from "../services/select-account.service";
import { useQueryClient } from "@tanstack/react-query";

interface SelectAccountItem {
  account: Account;
}

export function SelectAccountItem({ account }: SelectAccountItem) {
  const selectAccountMutation = useSelectAccountMutation();

  const queryClient = useQueryClient();

  const onAccountSelect = () => {
    selectAccountMutation.mutate(
      { id: account.id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["user"] });
        },
      }
    );
  };

  return (
    <button
      onClick={onAccountSelect}
      className="flex flex-row w-full border hover:bg-emerald-50 justify-between items-center group hover:border-primary text-xs transition-all text-left space-x-3 space-y-0 rounded-md p-4"
    >
      <div className="space-y-1 leading-none">
        <Label className="font-semibold">{account.name}</Label>
        <p className="text-muted-foreground text-sm">Account balance: $39.99</p>
      </div>
      <FiArrowRight className="h-4 w-4 translate-x-0 transition-all group-hover:translate-x-1 group-hover:text-primary" />
    </button>
  );
}
