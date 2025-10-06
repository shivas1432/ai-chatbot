import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface NeumorphicProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'raised' | 'inset' | 'flat';
  intensity?: 'low' | 'medium' | 'high';
}

export const Neumorphic = forwardRef<HTMLDivElement, NeumorphicProps>(
  ({ className, variant = 'raised', intensity = 'medium', ...props }, ref) => {
    const baseClasses = "rounded-xl transition-all duration-200";
    
    const variantClasses = {
      raised: {
        low: "shadow-neu-raised-low dark:shadow-neu-raised-dark-low",
        medium: "shadow-neu-raised dark:shadow-neu-raised-dark",
        high: "shadow-neu-raised-high dark:shadow-neu-raised-dark-high",
      },
      inset: {
        low: "shadow-neu-inset-low dark:shadow-neu-inset-dark-low",
        medium: "shadow-neu-inset dark:shadow-neu-inset-dark",
        high: "shadow-neu-inset-high dark:shadow-neu-inset-dark-high",
      },
      flat: {
        low: "shadow-neu-flat-low dark:shadow-neu-flat-dark-low",
        medium: "shadow-neu-flat dark:shadow-neu-flat-dark",
        high: "shadow-neu-flat-high dark:shadow-neu-flat-dark-high",
      },
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant][intensity],
          className
        )}
        {...props}
      />
    );
  }
);

Neumorphic.displayName = "Neumorphic";