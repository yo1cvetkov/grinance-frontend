import { cn } from "@nextui-org/react";

export function Separator({ className }: { className?: string }) {
  return <div className={cn("w-full h-[1px] bg-zinc-200 dark:bg-zinc-800/80", className)} />;
}
