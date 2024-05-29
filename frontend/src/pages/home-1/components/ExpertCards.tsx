import tw from 'twin.macro';
import styled from 'styled-components';

import Expert1 from '../../../assets/expert-1.png';
import Expert2 from '../../../assets/expert-2.png';
import Expert3 from '../../../assets/expert-3.png';
import Twitter from '../../../assets/Twitter.svg';
import Facebook from '../../../assets/Facebook.svg';
import Instagram from '../../../assets/Instagram.svg';
import BgImage from '../../../assets/slide-background-3.png'
const cardContent = [
    {
        image: Expert1,
        title: 'Surgeon',
        name:'Briyan Nevalli'
    },
    {
        image: Expert2,
        title: 'Dermatologist',
        name: 'Bella sebastian'
    },
    {
        image: Expert3,
        title: 'Stylist expert',
        name: 'Lilly Adams'
    }
]

const Container = styled.div`
    ${tw`flex justify-around items-stretch pt-0 mb-[8.875rem]
    [&>*]:hover:(shadow-[0px 25px 50px 25px rgba(246, 247, 255, 1)] ease-in-out z-0)
    lg:(flex-col items-center gap-[2rem])
    `}
`

const CardContainer = styled.div`
    ${tw`bg-white rounded-[42px] p-[2rem] text-center flex-1 max-w-[500px]
    
    `}
`

const Image = styled.img`
    ${tw`max-w-full h-auto mt-[2.5rem] mb-0 m-[0 auto]`}
`

const Title = styled.h2`
    ${tw`mt-[3.3125rem] leading-[1.25rem] text-3rd-color m-0 font-semibold tracking-normal`}
`

const Subtitle = styled.h3`
    ${tw`text-1st-color mt-[0.8125rem] mb-[1.3rem] text-[1.125rem] font-semibold tracking-normal`}
`

const Text = styled.p`
    ${tw`text-2nd-color text-[0.875rem] tracking-[1.4px] font-normal mb-[2.5rem] leading-[1.3125rem]`}
`

const IconsContainer = styled.div`
    ${tw`m-0 mb-[2.5rem] flex flex-row items-center gap-[1px] px-[2.25rem]`}
`

const Icon = styled.img`
    ${tw`mt-0 cursor-pointer m-[0 auto]`}
`

const Bg = styled.img`
    ${tw`absolute -z-10 left-0 top-[3140px] max-w-[100vw]`}
`

const Card = ({image, title, name}: {image: string; title: string; name: string}) => {
    return (
        <CardContainer>
            <Image src={image}/>
            <Title>{title}</Title>
            <Subtitle>{name}</Subtitle>
            <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit</Text>
            <IconsContainer>
                <Icon src={Twitter} />
                <Icon src={Facebook} />
                <Icon src={Instagram} />
            </IconsContainer>
        </CardContainer>
        
    )
}

const ExpertCards = () => {
    return (
        <div>
            <Container>
                {cardContent.map((card, index) => (
                    <Card key={index} image={card.image} title={card.title} name={card.name} />
                ))}
            </Container>
            <Bg src={BgImage} />
        </div>
    );
};



export default ExpertCards
