import tw from 'twin.macro'
import styled from 'styled-components';
import Img from '../../../assets/home1/contact-image.svg';

const Container = styled.div`
    ${tw`flex items-start justify-between
    lg:(flex-col items-center)

    `}
`

const ImageContainer = styled.div`
    ${tw`self-center max-w-[50%] `}
`

const Image = styled.img`
    ${tw`w-full mt-[46px]`}
`

const ContentContainer = styled.div`
    ${tw`max-w-[45.7%] mt-[0.375rem]
    lg:(max-w-[80%])
    `}
`

const Subtitle = styled.h2`
    ${tw`text-3rd-color ml-[2px] font-semibold leading-[1.25rem] tracking-normal`}
`

const Title = styled.h1`
    ${tw`text-1st-color text-[2.25rem] mb-[1.2rem] mt-[0.75rem] pr-[9rem] font-semibold tracking-normal leading-[2.8125rem]
    lg:(pr-0)

    `}
`

const Text = styled.p`
    ${tw`text-2nd-color font-normal mt-0 mb-[2.95rem] leading-[1.5rem]
    `}
`

const InquiryContainer = styled.div`
    ${tw`flex flex-col gap-[2.395rem]`}
`

const ShortInputContainer = styled.div`
    ${tw`flex justify-between gap-[2.22375rem]`}
`
const Input = styled.input`
    ${tw`w-full max-w-full p-[1.1rem 1.5rem] max-h-[3.8475rem] border-[1px] border-[#ccc]
    rounded-[0.9375rem] text-black border-[rgba(217, 221, 254, 1)] font-normal leading-[1.5rem]
    placeholder:(text-[rgba(197, 197, 197, 1)])
    `}
`
const InputFirstName = styled.input`
    ${tw`w-full max-w-full p-[1.1rem 1.5rem] pr-[2.0625rem] max-h-[3.8475rem] border-[1px] border-[#ccc]
    rounded-[0.9375rem] text-black border-[rgba(217, 221, 254, 1)] font-normal leading-[1.5rem]
    placeholder:(text-[rgba(197, 197, 197, 1)])
    `}
`

const InputLastName = styled.input`
    ${tw`w-full max-w-full p-[1.1rem 1.5rem] pl-[1.6875rem] max-h-[3.8475rem] border-[1px] border-[#ccc]
    rounded-[0.9375rem] text-black border-[rgba(217, 221, 254, 1)] font-normal leading-[1.5rem]
    placeholder:(text-[rgba(197, 197, 197, 1)])
    `}
`

const TextArea = styled.textarea`
    ${tw`w-full max-w-full p-[1.1rem 1.5rem] pr-0 border-[1px] border-[#ccc]
    rounded-[0.9375rem] text-black border-[rgba(217, 221, 254, 1)] font-normal leading-[1.5rem]
    pt-[1.5825rem] max-h-[15.0625rem] h-[15.0625rem] resize-none
    placeholder:(text-[rgba(217, 221, 254, 1)])
    `}
`

const Button = styled.button`
    ${tw`rounded-[50px] p-[1.1rem 3.5rem] leading-[1.5rem] mt-[1rem] border-none bg-3rd-color
    text-white font-semibold cursor-pointer self-start
    lg:(self-center)
    `}
`

const ContactUs = () => {
  return (
    <Container>
        <ImageContainer>
            <Image src={Img} />
        </ImageContainer>
        <ContentContainer>
            <Subtitle>Contact Us</Subtitle>
            <Title>Send your inquiry to our expert team</Title>
            <Text>Lorem ipsum dolor sit amet nulla turapis tellus.</Text>
            <InquiryContainer>
                <ShortInputContainer>
                    <InputFirstName type='text' placeholder='First name' />
                    <InputLastName type='text' placeholder='Last name' />
                </ShortInputContainer>
                <Input type='text' placeholder='Email address' />
                <Input type='text' placeholder='Subject message' />
                <TextArea placeholder='Your inquiry here' />
                <Button>Send Message</Button>
            </InquiryContainer>
        </ContentContainer>
    </Container>
  )
}


export default ContactUs