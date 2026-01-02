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
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-border bg-background text-foreground hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground text-foreground",
    link: "text-primary underline-offset-4 hover:underline",
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
