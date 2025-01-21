import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Currency } from "@/types/CurrencyEnum";
import { SetStateAction } from "react";

interface CurrencySelectProps {
  currency: Currency;
  setCurrency: React.Dispatch<SetStateAction<Currency>>;
}

export function CurrencySelect({ currency, setCurrency }: CurrencySelectProps) {
  return (
    <Select value={currency} onValueChange={(value) => setCurrency(value as Currency)}>
      <SelectTrigger className="w-[100px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent className="min-w-6">
        <SelectItem value="EUR">EUR</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
      </SelectContent>
    </Select>
  );
}
