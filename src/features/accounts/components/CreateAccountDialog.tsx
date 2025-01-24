import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/Dialog";
import React, { SetStateAction } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { CreateAccountForm } from "./CreateAccountForm";

interface CreateAccountDialogProps {
  isCreateAccountOpen: boolean;
  setIsCreateAccountOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function CreateAccountDialog({ isCreateAccountOpen, setIsCreateAccountOpen }: CreateAccountDialogProps) {
  return (
    <Dialog open={isCreateAccountOpen}>
      <DialogContent hasClose={false}>
        <DialogHeader>
          <Button variant={"link"} onClick={() => setIsCreateAccountOpen(false)} className="shadow-none inline-flex w-min p-0">
            <FiArrowLeft size={8} />
            Back
          </Button>
          <div className="space-y-5">
            <Logo isCollapsed />
            <DialogTitle>Create new account</DialogTitle>
          </div>
          <DialogDescription>Fill out the required fields and continue.</DialogDescription>
        </DialogHeader>
        <CreateAccountForm setIsCreateAccountOpen={setIsCreateAccountOpen} />
      </DialogContent>
    </Dialog>
  );
}
