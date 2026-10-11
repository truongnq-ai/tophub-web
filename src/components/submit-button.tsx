import { useFormStatus } from "react-dom"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

type SubmitButtonProps = {
  label?: string
  statusText?: string
}

export function SubmitButton({
  label = "Send feedback",
  statusText = "Sending...",
}: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {statusText}
        </>
      ) : (
        label
      )}
    </Button>
  )
}
