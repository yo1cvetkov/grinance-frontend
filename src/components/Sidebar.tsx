import { Logo } from "./Logo";
import { useState } from "react";
import { FiHome, FiRepeat } from "react-icons/fi";
import { SidebarLink } from "./SidebarLink";
import { IoWalletOutline } from "react-icons/io5";
import { cn } from "../common/common.utils";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <aside
      onMouseOver={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={cn(
        "w-[70px] p-4 min-h-screen border-r flex flex-col items-center  border-gray-200 dark:border-zinc-800 transition-all scale-100 duration-300",
        !isCollapsed && "w-[180px] items-start"
      )}
    >
      <Logo isCollapsed={isCollapsed} />
      <div className="flex flex-col w-full gap-2 mt-4">
        <SidebarLink href="/dashboard" isCollapsed={isCollapsed} label="Home" icon={<FiHome />} />
        {/* <Divider className="w-full" /> */}
        <SidebarLink href="/dashboard/transactions" isCollapsed={isCollapsed} label="Transactions" icon={<FiRepeat />} />
        <SidebarLink href="/dashboard/budget" isCollapsed={isCollapsed} label="Budget" icon={<IoWalletOutline />} />
      </div>
    </aside>
  );
}
