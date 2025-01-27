import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { FullAccount } from "@/types/Account";
import { useForm } from "react-hook-form";
import { addTransactionSchema, AddTransactionSchemaType } from "../schema/add-transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { declareCurrency } from "@/common/common.utils";
import { Input } from "@/components/ui/Input";
import { TransactionType } from "@/types/TransactionType.enum";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";
import { Textarea } from "@/components/ui/Textarea";
import { useCategories } from "@/features/categories/services/get-categories.service";
import { Button } from "@/components/ui/Button";
import { useCreateTransactionMutation } from "../services/create-transaction.service";
import { enqueueSuccess } from "@/lib/snackbar";

export function AddTransactionForm({ activeAccount }: { activeAccount: FullAccount }) {
  const { data: categories, isLoading } = useCategories();

  const form = useForm<AddTransactionSchemaType>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      accountId: activeAccount.id,
      transactionDate: new Date(),
      amount: 0,
      categoryId: "",
      description: "",
      type: TransactionType.EXPENSE,
    },
  });

  const createTransactionMutation = useCreateTransactionMutation();

  const onSubmit = (data: AddTransactionSchemaType) => {
    createTransactionMutation.mutate(data, {
      onSuccess: () => {
        enqueueSuccess("Transaction created");
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="gap-y-6 mt-6 grid grid-cols-[500px_500px] gap-x-6">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="font-semibold">
                  Transaction type <span className="text-primary">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="max-w-[500px]">
                      <SelectValue placeholder="Select type of transaction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={TransactionType.EXPENSE}>
                      <div className="flex items-center gap-x-2">
                        <FiArrowUp className="text-red-500" />
                        Expense
                      </div>
                    </SelectItem>
                    <SelectItem value={TransactionType.INCOME}>
                      <div className="flex items-center gap-x-2">
                        <FiArrowDown className="text-primary" />
                        Income
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="font-semibold">
                  Transaction amount <span className="text-primary">*</span>
                </FormLabel>
                <div className="flex items-center font-medium gap-x-2 max-w-[500px]">
                  <span>{declareCurrency(activeAccount.currency)}</span>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2">
                <FormLabel className="font-semibold">
                  Transaction category <span className="text-primary">*</span>
                </FormLabel>
                <Select defaultValue={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="max-w-[500px]">
                      <SelectValue placeholder="Select transaction category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="transactionDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Select transaction date <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value.toISOString().split("T")[0]}
                    onChange={(event) => {
                      field.onChange(new Date(event.target.value));
                    }}
                    placeholder="Select transaction date"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-y-2 h-full">
                <FormLabel className="font-semibold">
                  Enter transaction description <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Provide a transaction description..." className="resize-none h-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-start-2 flex gap-x-4 justify-end items-center">
          <Button variant={"outline"} type="button">
            Cancel
          </Button>
          <Button type="submit">Submit transaction</Button>
        </div>
      </form>
    </Form>
  );
}
