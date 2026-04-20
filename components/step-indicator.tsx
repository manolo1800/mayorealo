import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: string
  label: string
  title: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: string
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep)

  return (
    <div className="flex items-center justify-between">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors",
                index <= currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground border border-border",
              )}
            >
              {index < currentStepIndex ? <Check className="w-5 h-5" /> : index + 1}
            </div>
            <div className="text-xs font-medium text-foreground mt-2 text-center max-w-[100px]">{step.label}</div>
          </div>

          {index < steps.length - 1 && (
            <div
              className={cn("h-1 w-12 mx-2 transition-colors", index < currentStepIndex ? "bg-primary" : "bg-muted")}
            />
          )}
        </div>
      ))}
    </div>
  )
}
