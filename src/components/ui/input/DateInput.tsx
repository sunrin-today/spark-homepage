"use client";

import { useState, useRef, useEffect } from "react";
import { useFloating, offset, shift, flip, useClick, useDismiss, useInteractions } from "@floating-ui/react";
import { CalendarDaysIcon } from "lucide-react";
import BaseInput from "./Input";
import { formatKoreanDate } from "@/utils/date";
import { DatePicker } from "./DatePicker";

interface DateInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  name?: string;
}

export const DateInput = ({
  value,
  onChange,
  placeholder = "날짜를 선택해주세요",
  className = "",
  name,
}: DateInputProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "bottom-start",
    middleware: [offset(8), shift(), flip()],
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ]);

  const handleDateSelect = (date: Date) => {
    const data = date.toISOString().split("T")[0];
    onChange(data);
    setIsOpen(false);
  };


  return (
    <div className="relative w-full">
      <div ref={refs.setReference} {...getReferenceProps()}>
        <BaseInput
          name={name}
          leftIcon={<CalendarDaysIcon size={20} />}
          value={value ? formatKoreanDate(value) : ""}
          onChange={onChange} // Read-only
          placeholder={placeholder}
          required={true} 
          ref={inputRef}
          noChange={true}
        />
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="z-50 bg-[#FFFFFF] rounded-lg border border-[#C3C3C3]"
        >
          <DatePicker 
            selectedDate={value ? new Date(value) : new Date()}
            onDateSelect={handleDateSelect}
            onCancel={() => setIsOpen(false)}
          />
        </div>
      )}
    </div>
  );
};