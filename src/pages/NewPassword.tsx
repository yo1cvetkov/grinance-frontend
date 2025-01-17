import { cn } from "@/common/common.utils";
import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { newPasswordSchema, NewPasswordSchemaType } from "@/features/auth/schemas/new-password";
import { useResetPasswordMutation } from "@/features/auth/services/reset-password.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiArrowLeft } from "react-icons/fi";
import { Link, Navigate, useSearchParams } from "react-router-dom";

export function NewPassword() {
  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
  });

  const resetPasswordMutation = useResetPasswordMutation();

  const [searchParams] = useSearchParams();

  const email = searchParams.get("email");
  const otp = sessionStorage.getItem("OTP");

  if (!email || !otp) {
    return <Navigate to={"/forgot-password"} />;
  }

  const onSubmit = async (data: NewPasswordSchemaType) => {
    resetPasswordMutation.mutate({
      email,
      code: otp,
      password: data.password,
      confirmPassword: data.confirmPassword,
    });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full space-y-6">
        <div className="flex flex-col mx-auto gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Set new password</h1>
          <p className="text-zinc-500 text-sm font-display">Must be at least 8 characters.</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Create a password"
                        type="password"
                        {...field}
                        className={cn(form.formState.errors.password?.message ? "border-destructive" : "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Re-type a password"
                        type="password"
                        {...field}
                        className={cn(form.formState.errors.confirmPassword?.message ? "border-destructive" : "")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button className="w-full mt-6" type="submit">
              Reset password
            </Button>
          </form>
        </Form>
        <Link
          to={"/login"}
          viewTransition
          className={cn(
            (form.formState.isSubmitting || resetPasswordMutation.isLoading) && "hidden",
            "text-primary hover:underline hover:underline-offset-2 text-sm font-semibold flex items-center gap-x-2 justify-center"
          )}
        >
          <FiArrowLeft size={15} />
          Back to log in
        </Link>
      </div>
    </section>
  );
}
