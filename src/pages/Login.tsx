import { LoginForm } from "../features/auth/components/LoginForm";

export function Login() {
  return (
    <section className="h-screen flex flex-col justify-center">
      <div className="max-w-[360px] mx-auto w-full">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-display font-semibold">Welcome back</h1>
          <p className="text-zinc-500 text-sm font-display">Welcome back! Please enter your details.</p>
        </div>
        <LoginForm />
      </div>
    </section>
  );
}
