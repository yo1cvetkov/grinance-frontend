import { Input } from "@nextui-org/input";
import { FiSearch } from "react-icons/fi";

export function SearchInput() {
  return (
    <Input
      classNames={{
        base: "w-[200px] focus-within:w-[400px] transition-all duration-300 h-9",
        mainWrapper: "h-full",
        input: "text-small",
        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-zinc-900",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<FiSearch size={18} />}
      type="search"
    />
  );
}