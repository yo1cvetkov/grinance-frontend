import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "./ui/Button";

export function Banner() {
  return (
    <div className="w-full p-3 flex items-center justify-between border shadow-lg bg-[#fdfdfd] gap-x-4 rounded-md">
      <div className="flex items-center gap-x-4">
        <div className="bg-white border rounded-md w-12 h-12 flex items-center justify-center">
          <FiAlertTriangle className="text-zinc-600" size={20} />
        </div>
        <p className="text-sm text-zinc-800 font-semibold">You have to define the budget for your account in order to use features.</p>
      </div>
      <Button variant={"default"} size={"sm"}>
        Add budget now
      </Button>
    </div>
  );
}
