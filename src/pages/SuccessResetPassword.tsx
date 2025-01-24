import { cn } from "@/common/common.utils";
import { buttonVariants } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export function SuccessResetPassword() {
  sessionStorage.removeItem("OTP"); // FIXME: This should not be there

  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full space-y-6">
        <div className="flex flex-col mx-auto gap-y-2">
          <h1 className="text-3xl font-display font-semibold">All done!</h1>
          <p className="text-zinc-500 text-sm font-display">Your password has been reset. You can sign in now!</p>
        </div>
        <Link to={"/login"} className={cn(buttonVariants({ variant: "default" }), "w-full")} viewTransition>
          Sign in now
        </Link>
      </div>
    </section>
  );
}
