import InputCalendar from "@/components/common/Calendar/InputCalendar";
import { X, Save } from "lucide-react";
import { useState } from "react";
import { formatDateToYMD } from "@/utils/date";

interface DatePickerProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onCancel: () => void;
}

export const DatePicker = ({ 
  selectedDate: initialDate, 
  onDateSelect, 
  onCancel 
}: DatePickerProps) => {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
    const [currentYear, setCurrentYear] = useState(initialDate.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

    return (
    <div className="w-[320px] p-3">
      <InputCalendar
        year={currentYear}
        month={currentMonth}
        items={[]}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        selectedDate={selectedDate}
        onDateClick={(year, month, day) => {
          const next = new Date(year, month, day);
          setSelectedDate(next);
          setCurrentYear(next.getFullYear());
          setCurrentMonth(next.getMonth());
        }}
      />
      <div className="flex w-full justify-end gap-2">

        <button 
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
          type="button"
          className="flex px-2 py-1.5 text-sm text-gray rounded-lg gap-1 items-center"
        >
          <X className='w-4 h-4'/>
          취소
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            onDateSelect(new Date(formatDateToYMD(selectedDate)));
          }}
          type="button" 
          className="flex px-2 py-1.5 text-sm bg-black text-white rounded-lg gap-1 items-center"
        >

          <Save className='w-4 h-4'/>
          저장
        </button>
      </div>
    </div>
  );
};