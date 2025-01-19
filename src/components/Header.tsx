import { useUser } from "@/features/auth/services/login.service";
import { Banner } from "./Banner";

export function Header() {
  const { data: user } = useUser();

  return (
    <header className="py-2 px-2">
      {user?.activeAccount?.balance === 0 && <Banner />}
      <div className="bg-background flex justify-start px-4 items-center h-14">
        <div className="flex items-center gap-x-4">
          <h1 className="text-2xl font-semibold">{user?.activeAccount?.name}</h1>
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </header>
  );
}
