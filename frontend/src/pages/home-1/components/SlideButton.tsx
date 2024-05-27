import tw from 'twin.macro';
import styled from 'styled-components';
import slide from '../../../assets/slide-button.svg';

const Slide = styled.div`
  ${tw`mt-[7.5625rem] mb-[8.1875rem] flex justify-center `}
`

const Image = styled.img`
    ${tw`pt-[15px]`}
`

const SlideButton = () => {
  return (
    <Slide>
        <Image className='' src={slide} alt="slide-button" />
    </Slide>
  )
}

export default SlideButton