import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Separator } from "@/components/ui/Separator";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { editAccountSchema, EditAccountSchemaType } from "../schemas/edit-account";
import { zodResolver } from "@hookform/resolvers/zod";
import { FullAccount } from "@/types/Account";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { declareCurrency } from "@/common/common.utils";
import { useEditAccountMutation } from "../services/edit-account.service";
import { enqueueSuccess } from "@/lib/snackbar";
import { useQueryClient } from "@tanstack/react-query";
import { FiAlertTriangle } from "react-icons/fi";

// FIXME: Bug if user submits the nonedited default budget

export function AccountDetails({ activeAccount }: { activeAccount: FullAccount }) {
  const [hasEditedFields, setHasEditedFields] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<EditAccountSchemaType>({
    resolver: zodResolver(editAccountSchema),
    defaultValues: {
      id: activeAccount.id,
      name: activeAccount?.name,
      balance: activeAccount?.balance,
      currency: activeAccount?.currency,
    },
  });

  const editAccountMutation = useEditAccountMutation();

  const onSubmit = (data: EditAccountSchemaType) => {
    editAccountMutation.mutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });

        enqueueSuccess("Account information updated.");

        setHasEditedFields(false);
      },
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="py-8">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-lg font-semibold">Account information</h1>
                <p className="text-muted-foreground text-sm">Update your account details and information.</p>
              </div>
              <div className="flex gap-x-2 items-center">
                {hasEditedFields && (
                  <div className="text-xs flex items-center gap-x-2 font-semibold text-amber-500 bg-amber-50 px-4 py-2 border border-amber-500/30 rounded-md">
                    <FiAlertTriangle />
                    Some fields are edited and not saved
                  </div>
                )}
                <Button type="button" variant={"outline"} size={"sm"}>
                  Cancel
                </Button>
                <Button type="submit" size={"sm"} disabled={!hasEditedFields}>
                  Save
                </Button>
              </div>
            </div>
          </div>
          <Separator />
          <div className="pt-6 pb-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-start gap-x-10">
                  <FormLabel className="font-semibold w-[280px] text-zinc-700 flex gap-x-1">
                    Name <span className="text-primary">*</span>
                  </FormLabel>
                  <div className="flex flex-col">
                    <FormControl>
                      <Input
                        {...field}
                        className="w-[500px]"
                        onChange={(event) => {
                          setHasEditedFields(true);
                          field.onChange(event);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="py-5 flex items-start gap-x-2">
            <FormField
              control={form.control}
              name="balance"
              render={({ field }) => (
                <FormItem className="flex items-start gap-x-10">
                  <FormLabel className="font-semibold w-[280px] text-zinc-700 flex gap-x-1">
                    Balance <span className="text-primary">*</span>
                  </FormLabel>
                  <div className="flex items-center gap-x-2">
                    <span className="text-muted-foreground">{declareCurrency(form.watch("currency"))}</span>
                    <div className="flex flex-col">
                      <FormControl>
                        <Input
                          {...field}
                          value={String(field.value)}
                          className="w-[500px]"
                          type="number"
                          onChange={(event) => {
                            setHasEditedFields(true);

                            field.onChange(event);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="flex flex-col mt-1">
                  <Select
                    onValueChange={(value) => {
                      setHasEditedFields(true);
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="shadow-xs">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
        </form>
      </Form>
    </>
  );
}
