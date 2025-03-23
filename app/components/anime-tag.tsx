import type React from "react"
import { cn } from "@/lib/utils"

interface AnimeTagProps {
  children: React.ReactNode
  className?: string
  variant?: "default" | "status"
}

export function AnimeTag({ children, className, variant = "default" }: AnimeTagProps) {
  return (
    <span
      className={cn(
        "inline-block px-2 py-1 text-xs rounded-md border",
        variant === "status" ? "bg-green-500 text-white border-green-600" : "bg-white text-black border-gray-300",
        className,
      )}
    >
      {children}
    </span>
  )
}

