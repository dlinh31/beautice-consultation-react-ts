import React from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Image1 from '../../../assets/feature-card-1.svg'
import Image2 from '../../../assets/feature-card-2.svg'
import Image3 from '../../../assets/feature-card-3.svg'
import BgImage from '../../../assets/slide-background-2.png'

const cardContent = [
    {
        image: Image1,
        title: 'Beauty consultation',
    },
    {
        image: Image2,
        title: 'Skin treatments',
    },
    {
        image: Image3,
        title: 'Beauty product',
    }
]

const Container = styled.div`
    ${tw`flex justify-between pt-0 gap-[3.5rem] mb-[8.6rem]
    lg:(flex-col items-center)
    md:(p-[2rem] gap-[1rem])
    sm:(p-[1rem 0])
    `}
`

const CardContainer = styled.div`
    ${tw`bg-white rounded-[42px] px-[2rem] pt-[3.6875rem] pb-[1.7rem] w-[21.4375rem] text-center
    shadow-[0px 25px 50px 25px rgba(246, 247, 255, 1)] 
    sm:(max-w-full m-0 p-0)
    `}
`

const Image = styled.img`
    ${tw`max-w-full h-auto m-[0 auto] mb-[3.5rem]`}
`

const Subtitle = styled.h3`
    ${tw`text-1st-color mt-[3rem] mb-[1.25rem] text-[1.125rem] font-semibold tracking-normal`}
`

const Text = styled.p`
    ${tw`text-2nd-color text-[0.875rem] tracking-[1.4px] font-normal mb-[2.5rem] leading-[1.3125rem]`}
`

const Bg = styled.img`
    ${tw`absolute -z-10 top-[1450px] max-w-[100vw] right-0`}
`

const Card = ({image, title}: {image: string; title: string}) => {
    return (
        <CardContainer>
            <Image src={image} alt={title} />
            <Subtitle>{title}</Subtitle>
            <Text>Non parturient amet, feugiat tellus sagittis, scelerisque eget nulla turpis.</Text>
        </CardContainer>
    )
}


const ServiceCards = () => {
  return (
    <div>

    <Container>
        {cardContent.map((card) => (
            <Card image={card.image} title={card.title} />
        ))}
    </Container>
    <Bg src={BgImage} />
        </div>
  )
}

export default ServiceCards
