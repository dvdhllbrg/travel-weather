import { useEffect, useState } from "react";

type DateRangeInputProps = {
  minDate: string;
  maxDate: string;
  onChange: (dates: [string, string]) => void;
};
export const DateRangeInput = ({
  minDate,
  maxDate,
  onChange,
}: DateRangeInputProps) => {
  const [fromDate, setFromDate] = useState(minDate);
  const [toDate, setToDate] = useState(minDate);
  useEffect(() => {
    onChange([fromDate, toDate]);
  }, [onChange, toDate, fromDate]);

  useEffect(() => {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    if (to.getTime() < from.getTime()) {
      setToDate(fromDate);
    }
  }, [fromDate, toDate]);

  return (
    <div className="flex">
      <input
        type="date"
        className="w-1/2 py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 rounded-l-lg rounded-b-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        value={fromDate}
        min={minDate}
        max={maxDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
      <input
        type="date"
        className="w-1/2 py-2.5 px-4 text-sm font-medium text-gray-500 bg-gray-100 border border-gray-300 border-l-0 rounded-r-lg rounded-b-none hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        value={toDate}
        min={fromDate}
        max={maxDate}
        onChange={(e) => setToDate(e.target.value)}
      />
    </div>
  );
};
