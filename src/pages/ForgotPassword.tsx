import { cn } from "@/common/common.utils";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/features/auth/schemas/forgot-password";
import { useForgotPasswordMutation } from "@/features/auth/services/forgot-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import { Link } from "react-router-dom";

export function ForgotPassword() {
  const forgotPasswordMutation = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    forgotPasswordMutation.mutate(data);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full">
        <div className="flex flex-col mx-auto gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Forgot your password?</h1>
          <p className="text-zinc-500 text-sm font-display">No worries, we'll send you reset instructions.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} placeholder="Enter your email" disabled={form.formState.isSubmitting || forgotPasswordMutation.isLoading} />
                  </FormControl>
                  <FormMessage />
                  {forgotPasswordMutation.isError && !form.formState.errors.email?.message && (
                    <p className="mt-10 text-xs text-red-500 font-medium">
                      {(forgotPasswordMutation.error as AxiosError).isAxiosError
                        ? ((forgotPasswordMutation.error as AxiosError)?.response?.data as string)
                        : "An error occured"}
                    </p>
                  )}
                </FormItem>
              )}
            />
            <div className="mt-6 space-y-5">
              <Button type="submit" className="w-full">
                {form.formState.isSubmitting || forgotPasswordMutation.isLoading ? <FiLoader className="animate-spin" /> : "Reset password"}
              </Button>
              <Link
                to={"/login"}
                viewTransition
                className={cn(
                  (form.formState.isSubmitting || forgotPasswordMutation.isLoading) && "hidden",
                  "text-primary hover:underline hover:underline-offset-2 text-sm font-semibold flex items-center gap-x-2 justify-center"
                )}
              >
                <FiArrowLeft size={15} />
                Back to log in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
