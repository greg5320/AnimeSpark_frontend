import { cn } from "@/lib/utils"

interface RatingBadgeProps {
  rating: number
  source?: string
  className?: string
}

export function RatingBadge({ rating, source, className }: RatingBadgeProps) {
  const getBgColor = () => {
    switch (source) {
      case "shikimori":
        return "bg-gray-500"
      case "world-art":
        return "bg-red-800"
      case "kino":
        return "bg-orange-500"
      case "mal":
        return "bg-blue-700"
      default:
        return "bg-yellow-500" 
    }
  }

  return <div className={cn("rating-badge", getBgColor(), className)}>{rating.toFixed(2)}</div>
}

