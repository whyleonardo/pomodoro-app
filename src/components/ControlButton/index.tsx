import { IconButton } from "@chakra-ui/react"
import { ReactElement } from "react"




interface ControlButtonProps {
  icon: ReactElement
  ariaLabel: string
  disabled?: boolean
  onClick: () => void
}

export const ControlButton = ({ icon, ariaLabel, disabled, onClick }: ControlButtonProps) => {
  return (
    <IconButton
      variant='unstyled'
      aria-label={ariaLabel}
      icon={icon}
      disabled={disabled}
      onClick={onClick}
    />
  )
}