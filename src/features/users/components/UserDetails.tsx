import { User } from "@/types/User";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateUserSchema, UpdateUserSchemaType } from "../schema/update-user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Separator } from "@/components/ui/Separator";
import { Input } from "@/components/ui/Input";
import { useUpdateUserMutation } from "../services/update-user.service";

interface UserDetailsProps {
  user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
  const [hasEditedFields, setHasEditedFields] = useState(false);

  const updateUserMutation = useUpdateUserMutation();

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user.id,
      name: user.name,
      birthDate: user.birthDate,
      username: user.username,
    },
  });

  const onSubmit = async (data: UpdateUserSchemaType) => {
    updateUserMutation.mutate(data);
    setHasEditedFields(false);
  };

  return (
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
        <div className="py-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="flex items-start gap-x-10">
                <FormLabel className="font-semibold w-[280px] text-zinc-700 flex gap-x-1">
                  Username <span className="text-primary">*</span>
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
        <div className="py-5">
          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormItem className="flex gap-x-10 items-start">
                <FormLabel className="font-semibold w-[280px] text-zinc-700 flex gap-x-1">
                  Birth date <span className="text-primary">*</span>
                </FormLabel>
                <div className="flex flex-col">
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
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
      </form>
    </Form>
  );
}
