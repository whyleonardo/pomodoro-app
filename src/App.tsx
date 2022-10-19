import { Button, Box, CircularProgress, CircularProgressLabel, Container, IconButton, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { Pause, Play, Repeat } from 'phosphor-react'

export const App = () => {

  const [countdownTime, setCountdownTime] = useState(1500)
  const [restTimeCountdown, setRestTimeCountdown] = useState(300)

  const [countdownTimeFormated, setCountdownTimeFormated] = useState('')
  const [restCountdownTimeFormated, setRestCountdownTimeFormated] = useState('')

  const [timesIsPaused, setTimesIsPaused] = useState(true)
  const [timesIsRunning, setTimesIsRunning] = useState(false)

  const [countdownIntervalID, setCountdownIntervalID] = useState(0)
  const [restTimeIntervalID, setRestTimeIntervalID] = useState(0)

  const [percentualTime, setPercentualTime] = useState(0)

  const countdownTimeDuration = intervalToDuration({
    start: 0,
    end: countdownTime * 1000
  })

  const restCountdownTimeDuration = intervalToDuration({
    start: 0,
    end: restTimeCountdown * 1000
  })

  let myIntervalID = 0
  let myRestTimeID = 0

  const countdownTimer = () => {
    setTimesIsRunning(true)
    myIntervalID = setInterval(() => {
      setCountdownTime(prevState => countdownTime === 0 ? 0 : prevState - 1)
      setPercentualTime(prevState => prevState + 0.066667)
    }, 1000)
    return setCountdownIntervalID(myIntervalID)
  }

  function stopCountdown() {
    setTimesIsRunning(false)
    clearInterval(countdownIntervalID)
  }


  const restTime = () => {
    myRestTimeID = setInterval(() => {
      setRestTimeCountdown(prevState => restTimeCountdown === 0 ? 0 : prevState - 1)
    }, 1000)
    return setRestTimeIntervalID(myRestTimeID)
  }

  function stopRestTimeCountdown() {
    clearInterval(restTimeIntervalID)
  }

  function formatTimeCountdown(seconds: number | undefined, minutes: number | undefined) {
    const formatSeconds = String(seconds == 0 ? '00' : seconds)
    const formatedSeconds = formatSeconds.length == 1 ? `0${formatSeconds}` : formatSeconds

    const formatMinutes = String(minutes == 0 ? '00' : minutes)
    const formatedMinutes = formatMinutes.length == 1 ? `0${formatMinutes}` : formatMinutes

    return setCountdownTimeFormated(`${formatedMinutes}:${formatedSeconds} `)
  }


  function formatRestTimeCountdown(seconds: number | undefined, minutes: number | undefined) {
    const formatSeconds = String(seconds == 0 ? '00' : seconds)
    const formatedSeconds = formatSeconds.length == 1 ? `0${formatSeconds}` : formatSeconds

    const formatMinutes = String(minutes == 0 ? '00' : minutes)
    const formatedMinutes = formatMinutes.length == 1 ? `0${formatMinutes}` : formatMinutes

    return setRestCountdownTimeFormated(`${formatedMinutes}:${formatedSeconds}`)
  }

  useEffect(() => {
    if (countdownTime === 0) {
      stopCountdown()
      setTimesIsPaused(false)
    }

    if (restTimeCountdown == 300 && countdownTime === 0) {
      restTime()
      setRestTimeCountdown(300)
    }

    if (restTimeCountdown === 0) {
      stopRestTimeCountdown()
      setTimesIsPaused(true)
    }

    formatTimeCountdown(countdownTimeDuration.seconds, countdownTimeDuration.minutes)
    formatRestTimeCountdown(restCountdownTimeDuration.seconds, restCountdownTimeDuration.minutes)

  }, [countdownTime, restTimeCountdown])

  return (
    <Container display='flex' h='85vh' justifyContent='center' flexDirection='column' alignItems='center'>

      <CircularProgress size='15.25rem' w='max-content' value={percentualTime} >
        <CircularProgressLabel>{percentualTime.toFixed(0)}%</CircularProgressLabel>
      </CircularProgress>

      <Box fontSize='7xl'>{timesIsPaused ? countdownTimeFormated : restCountdownTimeFormated + 'p'}</Box>

      <Flex gap='2rem '>
        <IconButton
          variant='unstyled'
          aria-label='Play Timer Countdown'
          icon={<Play size={64} />}
          disabled={timesIsRunning}
          onClick={() => {
            countdownTimer()
          }}
        />

        <IconButton
          variant='unstyled'
          aria-label='Pause Timer Countdown'
          icon={<Pause size={64} />}
          disabled={!timesIsRunning}
          onClick={() => {
            stopCountdown()
          }}
        />

        <IconButton
          variant='unstyled'
          aria-label='Reset Timer'
          icon={<Repeat size={64} />}
          onClick={() => {
            stopCountdown()
            setCountdownTime(1500)
            setRestTimeCountdown(300)
            setTimesIsPaused(true)
            setPercentualTime(0)
          }}
        />

      </Flex>
    </Container>
  )
}
