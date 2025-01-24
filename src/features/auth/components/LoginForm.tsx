import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "../schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/Form";
import { Input } from "../../../components/ui/Input";
import { Button } from "../../../components/ui/Button";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { cn } from "../../../common/common.utils";
import { FiLoader } from "react-icons/fi";
import { useLoginMutation } from "../services/login.service";
import { AxiosError } from "axios";

export function LoginForm() {
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginSchemaType) => {
    loginMutation.mutate({ username: data.username, password: data.password });
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
                    disabled={form.formState.isSubmitting || loginMutation.isLoading}
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={form.formState.isSubmitting || loginMutation.isLoading}
                    placeholder="••••••••"
                    type="password"
                    className={cn(form.formState.errors.password?.message ? "border-destructive" : "")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {loginMutation.isError && (
          <FormError>
            {(loginMutation.error as AxiosError).isAxiosError ? ((loginMutation.error as AxiosError)?.response?.data as string) : "An error occured"}
          </FormError>
        )}
        <div className="my-6 flex justify-end">
          <Link
            to={"/forgot-password"}
            viewTransition
            className={cn(
              (form.formState.isSubmitting || loginMutation.isLoading) && "hidden",
              "text-primary hover:underline hover:underline-offset-2 text-sm font-semibold"
            )}
          >
            Forgot password
          </Link>
        </div>
        <div className="space-y-4">
          <Button disabled={form.formState.isSubmitting || loginMutation.isLoading} className="w-full">
            {form.formState.isSubmitting || loginMutation.isLoading ? <FiLoader className="animate-spin" /> : "Sign in"}
          </Button>
          <Button variant={"outline"} className="w-full" disabled>
            <FcGoogle />
            Sign in with Google
          </Button>
        </div>
        <div className="flex items-center justify-center gap-x-2 mt-8">
          <span className="text-sm text-zinc-500">Don't have an account?</span>
          <Link to={"/register"} viewTransition className="text-primary hover:underline hover:underline-offset-2 text-sm font-semibold">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
