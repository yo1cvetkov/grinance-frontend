import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import { SetStateAction } from "react";
import { useSelectAccountMutation } from "../services/select-account.service";
import { useQueryClient } from "react-query";
import { enqueueError, enqueueSuccess } from "@/lib/snackbar";

interface ConfirmSwitchAccountDialogProps {
  accountId: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function ConfirmSwitchAccountDialog({ accountId, isOpen, setIsOpen }: ConfirmSwitchAccountDialogProps) {
  const queryClient = useQueryClient();

  const selectAccountMutation = useSelectAccountMutation();

  const onConfirm = () => {
    selectAccountMutation.mutate(
      { id: accountId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["user"]);
          enqueueSuccess("Account switched.");
          setIsOpen(false);
        },
        onError: () => {
          enqueueError("Failed to switch account.");
        },
      }
    );
  };

  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>Are you sure that you want to switch your account.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"secondary"} size={"sm"} onClick={onCancel}>
            Cancel
          </Button>
          <Button size={"sm"} onClick={onConfirm}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
