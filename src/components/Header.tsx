import { SearchInput } from "./SearchInput";

export function Header() {
  return (
    <header className="bg-background border-b flex py-2 justify-center items-center border-zinc-200 dark:border-zinc-800 h-14">
      <SearchInput />
    </header>
  );
}
