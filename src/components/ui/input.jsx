import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

const InputWithIcon = React.forwardRef(({ className, leftIcon, rightIcon, ...props }, ref) => {
  return (
    <div className="relative">
      {leftIcon && <div className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">{leftIcon}</div>}
      <Input className={cn(leftIcon && "pl-9", rightIcon && "pr-9", className)} ref={ref} {...props} />
      {rightIcon && <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-green-500">{rightIcon}</div>}
    </div>
  )
})
InputWithIcon.displayName = "InputWithIcon"

export { Input, InputWithIcon }


