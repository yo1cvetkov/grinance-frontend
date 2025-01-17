import { useNavigate } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { Button } from "./ui/Button";
import { useLogoutMutation } from "@/features/auth/services/logout.service";

export function Header() {
  const navigate = useNavigate();
  const logoutMutation = useLogoutMutation();

  return (
    <header className="bg-background border-b flex py-2 justify-center items-center border-zinc-200 dark:border-zinc-800 h-14">
      <SearchInput />
      <Button
        size={"sm"}
        variant={"outline"}
        onClick={() => {
          logoutMutation.mutate();
          navigate("/login", { viewTransition: true });
        }}
      >
        Logout
      </Button>
    </header>
  );
}
