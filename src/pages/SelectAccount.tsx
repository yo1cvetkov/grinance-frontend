import { useUser } from "@/features/auth/services/login.service";
import { FiPlus } from "react-icons/fi";

export function SelectAccount() {
  const { data: user } = useUser();

  return (
    <div className="h-screen bg-gradient-to-bl from-white to-emerald-100 backdrop-blur-md flex flex-col justify-center items-center">
      <h1 className="text-5xl font-semibold">Select Account</h1>
      <div>
        <button className="rounded-full flex items-center justify-center w-20 h-20 bg-zinc-50 border-zinc-800/10 border">
          <FiPlus size={35} className="text-zinc-500" />
        </button>
        {user?.accounts.map((account) => (
          <button key={account.id} className="rounded-full flex items-center justify-center w-20 h-20 bg-zinc-50 border-zinc-800/10 border">
            <FiPlus size={35} className="text-zinc-500" />
          </button>
        ))}
      </div>
    </div>
  );
}
