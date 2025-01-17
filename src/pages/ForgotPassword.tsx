import { Form, FormControl, FormError, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { forgotPasswordSchema, ForgotPasswordSchemaType } from "@/features/auth/schemas/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function ForgotPassword() {
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordSchemaType) => {
    console.log(data);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full">
        <div className="flex flex-col mx-auto gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Did you forgot your password?</h1>
          <p className="text-zinc-500 text-sm font-display">Don't worry, just fill out the forms.</p>
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Enter your email" />
                    </FormControl>
                    <FormMessage />
                    <FormError>If there is an error</FormError>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
