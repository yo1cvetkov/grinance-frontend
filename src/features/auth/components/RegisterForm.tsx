import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "../schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormError, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { cn } from "@/common/common.utils";
import { Button } from "@/components/ui/Button";
import { FiLoader } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { useRegisterMutation } from "../services/register.service";
import { AxiosError } from "axios";
import { useLoginMutation } from "../services/login.service";

export function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      username: "",
      confirmPassword: "",
      password: "",
    },
  });

  const registerMutation = useRegisterMutation();
  const loginMutation = useLoginMutation();

  const onSubmit = async (data: RegisterSchemaType) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        loginMutation.mutate({ username: data.username, password: data.password });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8">
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || registerMutation.isLoading}
                    placeholder="Enter your username"
                    className={cn(form.formState.errors.username?.message ? "border-destructive" : "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || registerMutation.isLoading}
                    placeholder="Enter your email"
                    type="email"
                    className={cn(form.formState.errors.email?.message ? "border-destructive" : "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || registerMutation.isLoading}
                    placeholder="Create a password"
                    type="password"
                    className={cn(form.formState.errors.password?.message ? "border-destructive" : "")}
                    {...field}
                  />
                </FormControl>
                {!form.formState.errors.password?.message && (
                  <FormDescription>Must be at least 8 characters, containing uppercase and lowercase letters, numbers and symbols.</FormDescription>
                )}
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
                    disabled={form.formState.isSubmitting || registerMutation.isLoading}
                    placeholder="Re-type password"
                    type="password"
                    className={cn(form.formState.errors.confirmPassword?.message ? "border-destructive" : "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {registerMutation.isError && (
          <FormError>
            {(registerMutation.error as AxiosError).isAxiosError ? ((registerMutation.error as AxiosError)?.response?.data as string) : "An error occured"}
          </FormError>
        )}
        <div className="space-y-4 mt-6">
          <Button disabled={form.formState.isSubmitting || registerMutation.isLoading} className="w-full">
            {form.formState.isSubmitting || registerMutation.isLoading ? <FiLoader className="animate-spin" /> : "Get started"}
          </Button>
          <Button variant={"outline"} className="w-full" disabled>
            <FcGoogle />
            Sign up with Google
          </Button>
        </div>
        <div className="flex items-center justify-center gap-x-2 mt-8">
          <span className="text-sm text-zinc-500">Already have an account?</span>
          <Link to={"/login"} viewTransition className="text-primary hover:underline hover:underline-offset-2 text-sm font-semibold">
            Log in
          </Link>
        </div>
      </form>
    </Form>
  );
}
