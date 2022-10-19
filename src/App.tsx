import { Box, Container, Flex, useColorMode } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { Pause, Play, Repeat } from 'phosphor-react'

import sound from './assets/sounds/Timer-Bell.wav'

import { CircularCountdownProgress } from './components/CircularCountdownProgress'
import { ControlButton } from './components/ControlButton'

let MY_INTERVAL_ID = 0
let MY_REST_TIME_ID = 0

export const App = () => {
  const { colorMode, toggleColorMode } = useColorMode()

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

  const audio = new Audio(sound)

  const playSound = () => audio.play()


  const countdownTimer = () => {
    setTimesIsRunning(true)
    MY_INTERVAL_ID = setInterval(() => {
      setCountdownTime(prevState => countdownTime === 0 ? 0 : prevState - 1)
      setPercentualTime(prevState => prevState + 0.066667)
    }, 1000)
    return setCountdownIntervalID(MY_INTERVAL_ID)
  }

  function stopCountdown() {
    setTimesIsRunning(false)
    clearInterval(countdownIntervalID)
  }

  const restTime = () => {
    MY_REST_TIME_ID = setInterval(() => {
      setRestTimeCountdown(prevState => restTimeCountdown === 0 ? 0 : prevState - 1)
    }, 1000)
    return setRestTimeIntervalID(MY_REST_TIME_ID)
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
      playSound()
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

      <CircularCountdownProgress percentualTime={percentualTime} />

      <Box fontSize='8xl'>
        {timesIsPaused ? countdownTimeFormated : restCountdownTimeFormated + 'p'}
      </Box>

      <Flex gap='2rem'>

        <ControlButton
          icon={<Play size={64} />}
          ariaLabel='Play Timer Countdown'
          disabled={timesIsRunning}
          onClick={() => {
            countdownTimer()
          }}
        />

        <ControlButton
          icon={<Pause size={64} />}
          ariaLabel='Pause Timer Countdown'
          disabled={!timesIsRunning}
          onClick={() => {
            stopCountdown()
          }}
        />

        <ControlButton
          icon={<Repeat size={64} />}
          ariaLabel='Reset Timer'
          onClick={() => {
            stopCountdown()
            setCountdownTime(2)
            setRestTimeCountdown(300)
            setTimesIsPaused(true)
            setPercentualTime(0)
          }}
        />
      </Flex>
    </Container>
  )
}
