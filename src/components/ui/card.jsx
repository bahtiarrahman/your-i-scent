import { cn } from "../../lib/utils"

const cardVariants = {
  default: "bg-white rounded-xl border border-gray-200 shadow-sm",
  gradient: "bg-gradient-to-br from-primary-500 to-yellow-400 rounded-xl shadow-lg",
}

function Card({ className, variant = "default", children, ...props }) {
  return (
    <div className={cn(cardVariants[variant], className)} {...props}>
      {children}
    </div>
  )
}

function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("p-6 border-b border-gray-100", className)} {...props}>
      {children}
    </div>
  )
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
}

function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  )
}

export { Card, CardHeader, CardContent, CardFooter }