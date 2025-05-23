import React, { forwardRef, useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";

const SelectInput = forwardRef<
  HTMLInputElement,
  {
    className?: string;
    defaultValue?: string;
    advices?: {
      key: string;
      value: string;
      label: string;
    }[];
    onChange?: (value: string) => void;
  } & React.InputHTMLAttributes<HTMLInputElement>
>(({ className, defaultValue, advices, onChange, ...props }, ref) => {
  const [value, setValue] = useState<string>(defaultValue || "");
  const [open, setOpen] = useState(false);

  const dialogContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickOutside = (e: Event) => {
    setOpen(false);
  };

  useClickOutside(dialogContainerRef, handleClickOutside);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        className={cn(
          "flex items-center w-full h-9 rounded-md border px-3 py-1 focus-within:border-blue-500",
        )}
      >
        <input
          type="text"
          className={cn(
            "text-sm w-full border-0 focus-visible:outline-none bg-background placeholder:text-muted-foreground",
          )}
          autoComplete="off"
          value={value}
          onChange={(e) => {
            const value = e.currentTarget.value;
            setValue(value);
            onChange?.(value);
          }}
          {...props}
          ref={inputRef}
        />
        <button
          type="button"
          className="ml-1 p-1 rounded-sm hover:bg-muted"
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>

      {open ? (
        <div
          className="absolute left-0 top-[100%] w-full z-50 overflow-hidden min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 mt-1"
          ref={dialogContainerRef}
        >
          <ul className="max-h-[400px] overflow-y-auto p-1 scroll-my-1">
            {advices && advices.length > 0 ? (
              advices.map((item) => (
                <li
                  key={item.key}
                  aria-hidden="true"
                  className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  onClick={() => {
                    setOpen(false);
                    setValue(item.value);
                    onChange?.(item.value);
                  }}
                >
                  {item.label}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-muted-foreground">
                No suggestions available
              </li>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
});

SelectInput.displayName = "SelectInput";

export default SelectInput;
