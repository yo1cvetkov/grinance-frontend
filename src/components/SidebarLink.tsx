import { Link } from "react-router-dom";
import { cn } from "../common/common.utils";

interface SidebarLinkProps {
  label: string;
  href: string;
  isCollapsed: boolean;
  icon: React.ReactNode;
}

export function SidebarLink({ href, isCollapsed, label, icon }: SidebarLinkProps) {
  // const isActive = matchesPathname(usePathname(), href);

  const isActive = false;

  return (
    <Link
      to={href}
      className={cn(
        "flex p-2 items-center justify-start dark:hover:bg-zinc-800 hover:bg-zinc-100  dark:hover:text-zinc-300 transition-all duration-300 rounded-lg",
        !isCollapsed && "w-full justify-start",
        isActive && "bg-zinc-900 text-zinc-200 font-semibold rounded-lg hover:bg-zinc-900 hover:text-zinc-200"
      )}
    >
      <span className={"ml-[2px]"}>{icon}</span>
      <span className={cn("text-sm ml-3 transition-all duration-300", isCollapsed && "w-0 opacity-0 overflow-hidden")}>{label}</span>
    </Link>
  );
}
