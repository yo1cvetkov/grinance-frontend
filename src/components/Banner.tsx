import { FiAlertTriangle } from "react-icons/fi";
import { Button } from "./ui/Button";

export function Banner({ body, buttonLabel, onClick }: { body: string; buttonLabel: string; onClick: () => void }) {
  return (
    <div className="w-full p-3 flex items-center justify-between border shadow-lg bg-primary gap-x-4 rounded-md">
      <div className="flex items-center">
        <div className="bg-primary rounded-md w-12 h-12 flex items-center justify-center">
          <FiAlertTriangle className="text-zinc-100" size={20} />
        </div>
        <p className="text-sm text-zinc-50 font-semibold">{body}</p>
      </div>
      <Button variant={"secondary"} size={"sm"} onClick={onClick}>
        {buttonLabel}
      </Button>
    </div>
  );
}
