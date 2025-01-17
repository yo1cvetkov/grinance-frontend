import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/InputOTP";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Button } from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import { otpSchema, OtpSchemaType } from "@/features/auth/schemas/otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/Form";
import { cn } from "@/common/common.utils";
import { FiArrowLeft, FiLoader } from "react-icons/fi";
import { useForgotPasswordMutation } from "@/features/auth/services/forgot-password.service";
import { enqueueSuccess } from "@/lib/snackbar";

export function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const forgotPasswordMutation = useForgotPasswordMutation();

  const email = searchParams.get("email");

  const onSubmit = async (data: OtpSchemaType) => {
    // FIXME: This is not good approach, verify OTP on the server and then send back the reset token
    sessionStorage.setItem("OTP", data.otp);
    navigate(`/new-password?email=${email}`, { viewTransition: true });
  };

  if (!email) {
    return <Navigate to={"/forgot-password"} />;
  }

  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full space-y-6">
        <div className="flex flex-col mx-auto gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Password reset</h1>
          <p className="text-zinc-500 text-sm font-display">
            We sent a code to <span className="font-semibold text-zinc-900">{email}</span>
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} {...field}>
                      <InputOTPGroup className="justify-between w-full">
                        <InputOTPSlot index={0} className="rounded-md border border-zinc-300" />
                        <InputOTPSlot index={1} className="rounded-md border border-zinc-300" />
                        <InputOTPSlot index={2} className="rounded-md border border-zinc-300" />
                        <InputOTPSlot index={3} className="rounded-md border border-zinc-300" />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage className="flex justify-center" />
                </FormItem>
              )}
            />
            <div className="mt-6">
              <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <FiLoader className="animate-spin" /> : "Continue"}
              </Button>
            </div>
          </form>
        </Form>
        <div className="space-y-6">
          <div className="flex items-center justify-center gap-x-2 mt-8">
            <span className="text-sm text-zinc-500">Didn't receive the email? </span>
            <Button
              variant={"link"}
              className="shadow-none p-0"
              onClick={() =>
                forgotPasswordMutation.mutate(
                  { email },
                  {
                    onSuccess: () => {
                      enqueueSuccess("Code sent.");
                    },
                  }
                )
              }
            >
              Click to resend
            </Button>
          </div>
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
      </div>
    </section>
  );
}
