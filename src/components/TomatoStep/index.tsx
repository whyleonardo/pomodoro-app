import { Flex, Box, Image, Heading, Text, VStack } from '@chakra-ui/react'
import Tomato from '../../assets/images/tomato.png'

interface TomatoStepProps {
  description: string
  stepId: string
}


export const TomatoStep = ({ description, stepId }: TomatoStepProps) => {
  return (
    <Flex
      color='white'
      position='relative'
      fontFamily='body'
    >
      <Image src={Tomato} />

      <VStack
        textAlign='center'
        position='absolute'
        top='10'
        right='0'
        left='0'
      >
        <Heading
          fontSize='1.25rem'
        >
          {`Passo ${stepId}`}
        </Heading>

        <Text
          display='block'
          whiteSpace='break-spaces'
          mt='0 !important'
          w='100px'
          fontSize='0.5rem'
        >
          {description}
        </Text>
      </VStack>

    </Flex>
  )
}