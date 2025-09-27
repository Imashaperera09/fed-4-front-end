import * as React from "react"

// Simple utility function to combine class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

function Button({
  className = "",
  variant = "default",
  size = "default",
  children,
  ...props
}) {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none"
  
  const variantClasses = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
    ghost: "hover:bg-gray-100 text-gray-700",
    link: "text-blue-500 underline-offset-4 hover:underline",
  }
  
  const sizeClasses = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1.5 text-sm",
    lg: "h-10 px-6 py-2.5",
    icon: "h-9 w-9",
  }

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button }
