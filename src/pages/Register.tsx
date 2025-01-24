import { RegisterForm } from "@/features/auth/components/RegisterForm";

export function Register() {
  return (
    <section className="min-h-screen flex flex-col justify-center p-4">
      <div className="max-w-[360px] mx-auto w-full">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Sign up</h1>
          <p className="text-zinc-500 text-sm font-display">Take control of your finances—sign up today!</p>
        </div>
        <RegisterForm />
      </div>
    </section>
  );
}
