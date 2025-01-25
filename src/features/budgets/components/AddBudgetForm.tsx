import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { FullAccount } from "@/types/Account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addBudgetSchema, AddBudgetSchemaType } from "../schema/add-budget";
import { Button, buttonVariants } from "@/components/ui/Button";
import { FiMinus, FiPlus } from "react-icons/fi";
import { cn, declareCurrency } from "@/common/common.utils";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { useCategories } from "@/features/categories/services/get-categories.service";
import { Textarea } from "@/components/ui/Textarea";
import { useCreateBudgetMutation } from "../services/create-budget.service";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";

export function AddBudgetForm({ activeAccount }: { activeAccount: FullAccount }) {
  const [step, setStep] = useState(1000);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const form = useForm<AddBudgetSchemaType>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      accountId: activeAccount.id,
      amount: 0.0,
      categoryId: "",
      description: "",
    },
  });

  const { data: categories, isLoading } = useCategories();

  const createBudgetMutation = useCreateBudgetMutation();

  const onSubmit = (data: AddBudgetSchemaType) => {
    const payload: AddBudgetSchemaType = {
      ...data,
      amount: Number(data.amount.toFixed(1)),
    };

    createBudgetMutation.mutate(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries(["budgets", data.accountId]);
        navigate(`/dashboard/budgets`, {
          viewTransition: true,
        });
      },
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="pt-8 grid grid-cols-2">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-y-2">
              <FormLabel className="font-semibold">
                Budget amount <span className="text-primary">*</span>
              </FormLabel>
              <div className="max-w-lg">
                <div className="flex border w-full border-zinc-200 rounded-md">
                  <div
                    onClick={() => setStep(100)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      step === 100 && "bg-primary/30",
                      "rounded-none cursor-pointer rounded-l w-full"
                    )}
                  >
                    100
                  </div>
                  <div
                    onClick={() => setStep(1000)}
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), step === 1000 && "bg-primary/30", "rounded-none cursor-pointer w-full")}
                  >
                    1,000
                  </div>
                  <div
                    onClick={() => setStep(10000)}
                    className={cn(buttonVariants({ variant: "ghost", size: "sm" }), step === 10000 && "bg-primary/30", "rounded-none cursor-pointer w-full")}
                  >
                    10,000
                  </div>
                  <div
                    onClick={() => setStep(100000)}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      step === 100000 && "bg-primary/30",
                      "rounded-none cursor-pointer rounded-r w-full"
                    )}
                  >
                    100,000
                  </div>
                </div>
              </div>
              <div className="p-4 pb-0 max-w-lg">
                <div className="flex items-center w-full justify-center space-x-10">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => {
                      if (step >= field.value) {
                        field.onChange(0);
                        return;
                      }

                      field.onChange(field.value - step);
                    }}
                  >
                    <FiMinus />
                    <span className="sr-only">Decrease</span>
                  </Button>
                  <div className="flex-1 text-center">
                    <div className="text-7xl flex items-center justify-center w-full font-bold tracking-normal">
                      {declareCurrency(activeAccount.currency)}
                      <FormControl>
                        <div>{field.value.toLocaleString()}</div>
                      </FormControl>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 shrink-0 rounded-full"
                    onClick={() => {
                      field.onChange(field.value.toPrecision(2) + step);
                    }}
                  >
                    <FiPlus />
                    <span className="sr-only">Increase</span>
                  </Button>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Choose budget category <span className="text-primary">*</span>
                </FormLabel>
                <Select onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="max-w-[500px]">
                      <SelectValue placeholder="Select budget category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories?.map((cat) => (
                      <SelectItem value={cat.id} key={cat.id}>
                        {cat.name}
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Enter budget description <span className="text-primary">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter budget description here..." className="resize-none max-w-[500px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-x-2 col-start-2 justify-end max-w-[500px] mt-8">
          <Button type="button" variant={"outline"}>
            Cancel
          </Button>
          <Button type="submit">Create budget</Button>
        </div>
      </form>
    </Form>
  );
}
