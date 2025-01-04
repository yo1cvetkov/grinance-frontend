import { Input } from "@nextui-org/input";
import { FiSearch } from "react-icons/fi";

const SearchInput = () => {
  return (
    <Input
      classNames={{
        base: "w-[200px] focus-within:w-[400px] focus:ring-emerald-500 transition-all duration-300 h-9",
        mainWrapper: "h-full ring-emerald-500",
        input: "text-sm",
        inputWrapper: "h-full font-normal text-default-500 focus:ring-emerald-500 bg-default-400/20 dark:bg-zinc-900",
      }}
      placeholder="Type to search..."
      size="sm"
      startContent={<FiSearch size={18} />}
      type="search"
    />
  );
};

export { SearchInput };
