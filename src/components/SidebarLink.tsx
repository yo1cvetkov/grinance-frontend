"use client";

import { cn } from "@nextui-org/react";
import { matchesPathname } from "@/lib/matchesPathname";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarLinkProps {
  label: string;
  href: string;
  isCollapsed: boolean;
  icon: React.ReactNode;
}

export function SidebarLink({ href, isCollapsed, label, icon }: SidebarLinkProps) {
  const isActive = matchesPathname(usePathname(), href);

  return (
    <>
      <Link
        href={href}
        className={cn(
          "flex p-2 items-center justify-start",
          !isCollapsed && "w-full justify-start",
          isActive && "bg-zinc-900 text-zinc-200 font-semibold rounded-lg"
        )}
      >
        <span className={"ml-[2px]"}>{icon}</span>
        <span className={cn("text-sm ml-3 transition-all duration-300", isCollapsed && "w-0 opacity-0 overflow-hidden")}>{label}</span>
      </Link>
    </>
  );
}
