
import tw from 'twin.macro';
import styled from 'styled-components';
import PlayBtn from '../../../assets/home1/play_btn.svg'
import Img from '../../../assets/home1/video-photo.jpeg'


const Container = styled.div`
    ${tw`flex justify-between p-0 mb-[8.9375rem]
    lg:(flex-col)
    md:(p-[2rem])
    `}
`
const Content = styled.div`
    ${tw`max-w-[50%]
    lg:(max-w-full items-center justify-center text-center)
    `}
`

const Title = styled.h1`
    ${tw` text-1st-color text-[2.25rem] mt-[0.75rem] mb-[1.2rem] font-semibold leading-[45px] tracking-normal

    `}
`
const Subtitle = styled.h2`
    ${tw`text-3rd-color m-0 font-semibold leading-[1.25rem] tracking-normal`}
`

const Text = styled.p`
    ${tw`text-2nd-color mt-0 mb-[3.2rem] pr-[6rem] tracking-[0.1rem] leading-[1.5rem]
    lg:(p-0)
    `}
`

const ImageContainer = styled.div`
    ${tw`mt-[2.6875rem] max-w-[29.75rem] h-[21.875rem] overflow-hidden rounded-[12.6%]
    shadow-[0px 0px 50px 25px rgba(255, 255, 255, 1)]
    lg:(w-full self-center)
    `}
`
const Image = styled.img`
    ${tw`w-[100%] mt-[-182px]`}    
`
const ImageBtn = styled.img`
    ${tw`max-w-[12.5rem] tracking-[1.7px] font-semibold leading-[1.5rem]`}    
`

const WatchVideoText = styled.p`
    ${tw`ml-[0.875rem] font-semibold text-2nd-color`}
`

const Footer = styled.div`
    ${tw`flex
    lg:(justify-center)
    `}
`
const Button = styled.button`
  ${tw`cursor-pointer rounded-[50px] p-[1.0625rem 2.9375rem] mt-[0.0625rem] border-none 
  bg-3rd-color text-white self-center font-semibold leading-[1.5rem] shadow-[0px 17px 22px 0px rgba(255, 237, 246, 1)]
   hover:text-white
   `}
`;
const VideoBtnContainer = styled.div`
    ${tw`flex items-center ml-[2.75rem]`}
`


const AboutUs = () => {
  return (
    <Container>
        <Content>
            <Subtitle>About Us</Subtitle>
            <Title>We are the best beauty clinic</Title>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, quam suscipit purus donec amet. Egestas volutpat facilisi eu libero. Nunc, ipsum ornare mauris sit quam quis enim. Varius tellus in suspendisse placerat.
                <br />
                <br />
                Id dui erat sed quam tellus in purus. Pellentesque congue fringilla cras tellus enim.</Text>
            <Footer>
                <Button>Learn More</Button>
                <VideoBtnContainer>
                    <ImageBtn src={PlayBtn} />
                    <WatchVideoText>Watch Video</WatchVideoText>
                </VideoBtnContainer>
            </Footer>
        </Content>
        
        <ImageContainer>
            <Image src={Img} />
        </ImageContainer>
    </Container>
  )
}

export default AboutUs
