import { cn } from "@nextui-org/react";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex items-center gap-x-2">
      <img src="/logo.svg" alt="Grinance logo" width={30} height={30} />
      <span className={cn("text-lg font-bold transition-all duration-300", isCollapsed && "w-0 opacity-0 overflow-hidden")}>Grinance</span>
    </div>
  );
}
