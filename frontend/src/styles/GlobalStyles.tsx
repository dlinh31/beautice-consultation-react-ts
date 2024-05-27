import { createGlobalStyle } from 'styled-components'
// import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro'
import tw, { theme } from 'twin.macro'

const CustomStyles = createGlobalStyle({
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    fontFamily: 'Poppins, sans-serif',
    ...tw`antialiased`,
  },
})

const GlobalStyles = () => (
  <>
    {/* <BaseStyles /> */}
    <CustomStyles />
  </>
)

export default GlobalStyles