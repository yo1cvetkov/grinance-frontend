import { Button, buttonVariants } from "@/components/ui/Button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/Drawer";
import { SetStateAction, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { CurrencySelect } from "./CurrencySelect";
import { cn, declareCurrency } from "@/common/common.utils";
import { Currency } from "@/types/CurrencyEnum";

interface AddBalanceDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  activeCurrency: Currency;
}

export function AddBalanceDrawer({ isOpen, setIsOpen, activeCurrency }: AddBalanceDrawerProps) {
  const [balance, setBalance] = useState(1000000.23);

  const [step, setStep] = useState(100);

  const [currency, setCurrency] = useState<Currency>(activeCurrency);

  const onBalanceDecrease = () => {
    if (step >= balance) {
      setBalance(0.0);
      return;
    }

    setBalance((prev) => prev - step);
  };

  const onBalanceIncrease = () => {
    setBalance((prev) => prev + step);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-lg">
          <div className="flex items-start justify-between">
            <DrawerHeader>
              <DrawerTitle>Define your account balance</DrawerTitle>
              <DrawerDescription>Define the balance for your account</DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-col p-4">
              <CurrencySelect currency={currency} setCurrency={setCurrency} />
            </div>
          </div>
          <div className="px-4">
            <div className="flex border w-full border-zinc-200 rounded-md">
              <div
                onClick={() => setStep(100)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  step === 100 && "bg-primary/30",
                  "rounded-none cursor-pointer rounded-l w-full"
                )}
              >
                100
              </div>
              <div
                onClick={() => setStep(1000)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), step === 1000 && "bg-primary/30", "rounded-none cursor-pointer w-full")}
              >
                1,000
              </div>
              <div
                onClick={() => setStep(10000)}
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }), step === 10000 && "bg-primary/30", "rounded-none cursor-pointer w-full")}
              >
                10,000
              </div>
              <div
                onClick={() => setStep(100000)}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  step === 100000 && "bg-primary/30",
                  "rounded-none cursor-pointer rounded-r w-full"
                )}
              >
                100,000
              </div>
            </div>
          </div>
          <div className="p-4 pb-0">
            <div className="flex items-center justify-center space-x-10">
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={onBalanceDecrease}>
                <FiMinus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-normal">
                  {declareCurrency(currency)}
                  {balance.toLocaleString()}
                </div>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 shrink-0 rounded-full" onClick={onBalanceIncrease}>
                <FiPlus />
                <span className="sr-only">Increase</span>
              </Button>
            </div>
          </div>
          {/* TODO: Enter manually feature */}
          {/* <div>Enter manually</div> */}
          <DrawerFooter>
            <Button>Submit</Button>
            <Button variant={"outline"}>Cancel</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
