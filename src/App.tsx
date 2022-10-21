import { Box, Container, Flex, Heading, Image, Text, VStack, InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { intervalToDuration } from 'date-fns'
import { ArrowCounterClockwise, Pause, Play } from 'phosphor-react'
import TomatoIcon from './assets/images/tomato-timer.png'

import sound from './assets/sounds/Timer-Bell.wav'

import { ControlButton } from './components/ControlButton'
import { Header } from './components/Header'
import { TomatoStep } from './components/TomatoStep/index'
import { stepInfos } from './components/utils/StepInfos'

let MY_INTERVAL_ID = 0
let MY_REST_TIME_ID = 0

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
    <>
      <Header />

      <Container
        display='flex'
        h='100%'
        bgImage='bgGradient'
        // justifyContent='center'
        flexDirection='column'
        alignItems='center'
      >
        <VStack
          mt='3.10rem'
          position='relative'
        >
          <Flex
            alignItems='center'
          >
            <Heading
              fontWeight='800'
              color='brand.400'
              fontSize='30'
              whiteSpace='nowrap'
              fontFamily='nunito'
              textTransform='uppercase'
            >
              Tomato Focus
            </Heading>

            <Image src={TomatoIcon} />
          </Flex>

          <Text
            color='white'
            whiteSpace='nowrap'
            fontSize='11'
            fontWeight='500'
            position='absolute'
            bottom='0'
          >
            Gerencie o seu Tempo de forma produtiva
          </Text>
        </VStack>

        <VStack mt='4.90rem'>
          <Text color='white'>
            Defina a sua tarefa:
          </Text>

          <InputGroup>
            <Input
              bg='white'
              fontFamily='heading'
              rounded='1rem'
              w='18.3rem'
              placeholder='Escrever um artigo sobre...'
            />
            < InputRightElement
              children={<Play size={16} weight='fill' color='rgba(99, 91, 91, 0.2)' />}
            />
          </InputGroup>
        </VStack>

        <Text
          mt='2.25rem'
          rounded='full'
          bg='brand.400'
          fontSize='96'
          px='6'
          py='2'
          color='white'
          fontFamily='heading'
          fontWeight='800'
          lineHeight='none'
        >
          {
            timesIsPaused
              ? countdownTimeFormated
              : restCountdownTimeFormated + 'p'
          }
        </Text>

        <Flex mt='3rem' color='white' gap='2rem'>
          <ControlButton
            icon={<ArrowCounterClockwise size={64} weight="bold" />}
            ariaLabel='Reset Timer'
            onClick={() => {
              stopCountdown()
              setCountdownTime(2)
              setRestTimeCountdown(300)
              setTimesIsPaused(true)
              setPercentualTime(0)
            }}
          />

          <ControlButton
            icon={<Play size={64} weight="fill" />}
            ariaLabel='Play Timer Countdown'
            disabled={timesIsRunning}
            onClick={() => {
              countdownTimer()
            }}
          />

          <ControlButton
            icon={<Pause size={64} weight="fill" />}
            ariaLabel='Pause Timer Countdown'
            disabled={!timesIsRunning}
            onClick={() => {
              stopCountdown()
            }}
          />
        </Flex>

        <Text
          mt='4.40rem'
          fontWeight='800'
          rounded='full'
          fontSize='0.9rem'
          textTransform='uppercase'
          bg='brand.400'
          px='6'
          py='4'
          color='white'
          fontFamily='heading'
          lineHeight='none'
        >
          Como funciona?
        </Text>

        {/* 
        <VStack
          px='6'
          w='90%'
          mt='1.5rem'
        >
          <Box
            alignSelf='center'
            position='relative'
          >
            <TomatoStep />

            <Box
              position='absolute'
              w='28'
              h='0.0625rem'
              bg='white'
              transform='auto'
              rotate='55'
              right='-30'
              zIndex='-1'
            />
          </Box>

          <Box
            alignSelf='end'
            position='relative'
          >
            <TomatoStep />

            <Box
              position='absolute'
              w='28'
              h='0.0625rem'
              bg='white'
              transform='auto'
              rotate='-55'
              left='-30'
              zIndex='-1'
            />
          </Box>

          <Box
            alignSelf='center'
            position='relative'
          >
            <TomatoStep />

            <Box
              position='absolute'
              w='28'
              h='0.0625rem'
              bg='white'
              transform='auto'
              rotate='55'
              right='-18'
              zIndex='-1'
            />
          </Box>

          <Box
            alignSelf='end'
            position='relative'
          >
            <TomatoStep />

            <Box
              position='absolute'
              w='28'
              h='0.0625rem'
              bg='white'
              transform='auto'
              rotate='-55'
              left='-18'
              zIndex='-1'
            />
          </Box>

          <Box
            alignSelf='center'
            position='relative'
          >
            <TomatoStep />
          </Box>

        </VStack> */}

        <VStack
          px='6'
          w='90%'
          mt='1.5rem'
        >
          {
            stepInfos && stepInfos.map(step => (
              <Box
                alignSelf={step.stepAlign}
                position='relative'
              >
                <TomatoStep stepId={step.stepId} description={step.description} />

                <Box
                  position='absolute'
                  display={step.displayLine}
                  w='28'
                  h='0.0625rem'
                  bg='green'
                  transform='auto'
                  rotate={step.rotate}
                  right={step.right}
                  left={step.left}
                  zIndex='-1'
                />
              </Box>
            ))
          }


        </VStack>



      </Container>
    </>
  )
}
