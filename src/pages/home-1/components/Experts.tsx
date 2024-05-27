import tw from 'twin.macro';
import styled from 'styled-components';

const Container = styled.div`
    ${tw`flex flex-col justify-center items-center text-center max-w-full p-0 mb-[8.3125rem]
    md:(p-[2rem])
    sm:(p-[1rem])
    `}
`

const Subtitle = styled.h2`
    ${tw`leading-[1.25rem] text-3rd-color m-0 font-semibold max-w-full tracking-normal`}
`
const Title = styled.h1`
    ${tw`text-1st-color text-[2.25rem] py-0 px-[22rem] mb-[1.2rem] mt-[0.75rem] font-semibold tracking-normal leading-[2.8125rem]
    lg:(py-0 px-[2rem])
    md:(px-[1rem])
    sm:(text-[1.5rem] p-0)

    `}
`
const Text = styled.p`
    ${tw`text-2nd-color font-normal py-0 px-[8rem] m-0
    md:(p-0)
    sm:(text-[0.875rem])
    `}
`

const Experts = () => {
  return (
    <Container>
            <Subtitle>Professional Teams</Subtitle>
            <Title>The Professional expert</Title>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam.</Text>
    </Container>
  )
}

export default Experts
