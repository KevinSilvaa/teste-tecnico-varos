"use client";

import { Eye, EyeOff } from "lucide-react";
import {
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ReactNode,
  useState,
} from "react";

import { cn } from "@/utils/cn";
import { handleInputMaskFunction } from "@/utils/functions/input-mask-function";

type InputProps = ComponentPropsWithoutRef<"input"> & {
  startContent?: ReactNode;
  mask?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { startContent, className, id, mask, value, name, type = "text", ...props },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="flex flex-1 max-h-[38px] items-center rounded-md border text-gray-600 py-2 px-4 border-gray-800 bg-gray-900 focus-within:border-gray-800">
        {startContent && startContent}

        {mask ? (
          <input
            type={type === "password" && showPassword ? "text" : type}
            id={id}
            value={value}
            name={name}
            onChange={(e) => handleInputMaskFunction(e, mask)}
            className={cn(
              "flex-1 outline-none placeholder:text-gray-600",
              className
            )}
            ref={ref}
            {...props}
          />
        ) : (
          <input
            type={type === "password" && showPassword ? "text" : type}
            id={id}
            value={value}
            name={name}
            className={cn(
              "flex-1 outline-none placeholder:text-gray-600",
              className
            )}
            ref={ref}
            {...props}
          />
        )}

        {type === "password" &&
          (showPassword ? (
            <Eye
              onClick={() => setShowPassword(false)}
              className="size-4 text-gray-600"
            />
          ) : (
            <EyeOff
              onClick={() => setShowPassword(true)}
              className="size-4 text-gray-600"
            />
          ))}
      </div>
    );
  }
);

Input.displayName = "Input";
