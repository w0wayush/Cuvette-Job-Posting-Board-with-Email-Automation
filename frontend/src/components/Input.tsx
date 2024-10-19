import React from "react";

interface InputProps {
  icon: React.ReactNode;
  type: string;
  placeholder: string;
  name?: string; // Made name required since it's needed for form handling
  value: string | number; // Added number type for number inputs
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional class name for additional styling
}

export const Input = ({
  icon,
  type,
  placeholder,
  name,
  value,
  onChange,
  className = "",
}: InputProps) => (
  <div
    className={`relative flex items-center border rounded-md p-2 mb-4 text-gray-700  bg-[#F4F4F4] focus-within:border-blue-500 transition-colors ${className}`}
  >
    <span className="text-gray-500">{icon}</span>
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className="ml-2 w-full outline-none bg-transparent"
      autoComplete={type === "password" ? "new-password" : "off"}
    />
  </div>
);
