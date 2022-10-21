import { extendTheme } from "@chakra-ui/react"


const titleFont = 'Nunito, sans-serif'
const textFont = 'Montserrat, sans-serif'

const bgGradient = 'linear-gradient(180deg, #000000 0%, rgba(157, 25, 15, 0.91) 52.6%, rgba(254, 57, 42, 0.87) 100%)'

const colors = {
  brand: {
    400: '#E70505',
    700: 'rgba(231, 5, 5, 0.38)'
  }
}

export const theme = extendTheme({
  colors,
  styles: {
    global: {
      body: {
        backgroundImage: bgGradient
      }
    }
  },
  fonts: {
    heading: titleFont,
    body: textFont
  }
})

