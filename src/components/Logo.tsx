import { cn } from "../common/common.utils";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-x-2")}>
      <img src="/logo.svg" alt="Grinance logo" width={30} height={30} />
      <span className={cn("text-lg text-zinc-800 font-bold transition-all duration-300", isCollapsed && "w-0 sr-only opacity-0 overflow-hidden")}>
        Grinance
      </span>
    </div>
  );
}
