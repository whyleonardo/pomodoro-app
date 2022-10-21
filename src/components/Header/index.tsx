import { Button, Flex } from "@chakra-ui/react"
import { UserCircle } from "phosphor-react"

export const Header = () => {
  return (
    <Flex
      position='sticky'
      top='0'
      p='1.3rem'
      left='0'
      justifyContent='end'
      as='header'>
      <Button
        display='flex'
        gap='0.27rem'
        bg='brand.700'
        color='white'
        rounded='1.3rem'
        py='0.4rem'
        aria-label="Login Button"
      >
        Faça seu login
        <UserCircle size={24} weight="fill" />
      </Button>
    </Flex >
  )
}