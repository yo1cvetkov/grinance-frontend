import { Form, FormControl, FormDescription, FormError, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createAccountSchema, CreateAccountSchemaType } from "../schemas/create-account";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useCreateAccountMutation } from "../services/create-account.service";
import { SetStateAction } from "react";
import { AxiosError } from "axios";

interface CreateAccountFormProps {
  setIsCreateAccountOpen: React.Dispatch<SetStateAction<boolean>>;
}

export function CreateAccountForm({ setIsCreateAccountOpen }: CreateAccountFormProps) {
  const form = useForm<CreateAccountSchemaType>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      name: "",
    },
  });

  const createAccountMutation = useCreateAccountMutation();

  const onSubmit = async (data: CreateAccountSchemaType) => {
    createAccountMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateAccountOpen(false);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-end gap-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Account name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter account name" />
              </FormControl>
              {!form.formState.errors.name?.message && !createAccountMutation.isError && (
                <FormDescription>Account name could describe specific account purpose or single person.</FormDescription>
              )}
              <FormMessage />
              {createAccountMutation.isError && (
                <FormError>
                  {(createAccountMutation.error as AxiosError).isAxiosError
                    ? ((createAccountMutation.error as AxiosError)?.response?.data as string)
                    : "An error occured"}
                </FormError>
              )}
            </FormItem>
          )}
        />

        <Button size={"sm"} type="submit">
          Create account
        </Button>
      </form>
    </Form>
  );
}
