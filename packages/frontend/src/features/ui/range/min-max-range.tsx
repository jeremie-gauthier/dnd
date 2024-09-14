import { ReactNode } from "react";

type Props = {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: ReactNode;
};

export const MinMaxRange = ({ min, max, value, onChange, label }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber;
    onChange(newValue);
  };

  return (
    <>
      <label
        htmlFor="minmax-range"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id="minmax-range"
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-800"
      />
    </>
  );
};
