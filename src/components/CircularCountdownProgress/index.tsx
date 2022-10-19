import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react"

interface ProgressTimeProps {
  percentualTime: number
}


export const CircularCountdownProgress = ({ percentualTime }: ProgressTimeProps) => {

  return (
    <CircularProgress size='15.25rem' w='max-content' value={percentualTime} >
      <CircularProgressLabel>{percentualTime.toFixed(0)}%</CircularProgressLabel>
    </CircularProgress>
  )
}
