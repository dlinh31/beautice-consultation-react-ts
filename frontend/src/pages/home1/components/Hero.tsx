import tw from 'twin.macro';
import styled from 'styled-components';

import HeroImage from '../../../assets/home1/hero-image.png';
import BackgroundImage from '../../../assets/home1/slide-background.png'

const Background = styled.img`
    ${tw`absolute -z-10 top-0 left-0 max-w-[100vw] right-0`}
`


const HeroContainer = styled.div`
    ${tw`mt-[9.25rem] pl-[2.4375rem] flex justify-between
    lg:(flex-col text-center p-0 items-center )
    md:(p-[2rem] mt-0)
    `}
`

const HeroContent = styled.div`
    ${tw`max-w-[44%] mt-[3.625rem]
    lg:(max-w-[100%] self-center)
    `}
`

const Title = styled.h1`
    ${tw`text-1st-color text-[3rem] leading-[3.75rem] my-0 font-semibold tracking-normal
    sm:(font-[2rem])
    `}
`

const Text = styled.p`
    ${tw`text-1st-color mt-[0.5rem] mb-[2rem] font-medium
    sm:text-[0.875rem]
    `}
`
const Button = styled.button`
  ${tw`cursor-pointer rounded-[50px] p-[1.0625rem 2.5rem] mt-[0.0625rem] border-none 
  bg-3rd-color text-white self-center font-semibold
   hover:text-white
   `}
`;
const ImageContainer = styled.div`
    ${tw `mr-[3px] lg:(mt-[2rem] ml-0)`}
`

const Image = styled.img`
    ${tw`max-w-full mr-auto h-auto
    `}
`


const Hero = () => {
  return (
    <div>
    <Background src={BackgroundImage} />
    <HeroContainer>
        <HeroContent>
        <Title>Clinic & beauty consultant</Title>
        <Text>It is a long established fact that a reader will be by the readable content of a page.</Text>
        <Button> More Details</Button>
        </HeroContent>
        <ImageContainer>
            <Image src={HeroImage} />
        </ImageContainer>
    </HeroContainer>

    </div>
      
  )
}

export default Hero