import {useState, useEffect} from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import logo from '../../../assets/home1/footer-logo.svg';
import socialIcons from '../../../assets/home1/social-media-icons.png'
import BgImage from '../../../assets/home1/background-footer.png';

// Styled components for the footer
const FooterContainer = styled.footer`
  ${tw`flex justify-between items-start relative mt-[17.3rem] max-w-[1440px] overflow-visible
  lg:(items-center mx-[1rem])
  md:(flex-col before:relative)
  sm:(mx-0 w-full)
  `}
`;

const LeftContainer = styled.div`
  ${tw`mt-8
  md:(mt-0)
  
  `}
`;

const FooterNotesContainer = styled.div`
  ${tw`text-[rgba(215, 219, 255, 1)] mt-[2.25rem] mb-0 ml-[1.9375rem]
  sm:(ml-0)
  `}
`;

const Note = styled.p`
  ${tw`font-normal leading-[1.5rem] `}
`;

const Wordpress = styled(Note)`
    ${tw`mt-[1.8rem mb-0 font-normal ]`}
`

const Address = styled(Note)`
  ${tw`italic font-medium text-[0.875rem] leading-[1.3125rem] tracking-[0.09rem] mt-[1.3rem]`}
`;

const ContactInfo = styled.div`
  ${tw`text-[rgba(215, 219, 255, 1)] italic text-sm leading-5 tracking-[0.1rem] mt-1 flex items-start gap-7`}
`;

const Phone = styled(Note)`
    ${tw`mt-0`}
`

const Email = styled(Note)`
    ${tw`mt-0 ml-[0.8125rem]`}
`

const SocialIcons = styled.div`
  ${tw`mt-[9.625rem]
  md:(mt-[1rem] content-center justify-center items-center self-center justify-self-center text-center)
  `}
`;

const RightContainer = styled.div`
  ${tw`flex flex-row gap-44 mr-2 mt-[1.125rem]
  lg:(justify-between items-center gap-[2rem] mr-0)
  md:(items-start mt-[1rem])
  `}
`;

const Pages = styled.div`
  ${tw`mr-[1.8125rem]`}
`;
const Informations = styled.div`
  ${tw`mr-[0.25rem]
  lg:(self-start)
  `}
`;

const SectionTitle = styled.p`
  ${tw`pb-[1.75rem] text-[rgba(215, 219, 255, 1)] text-lg leading-7 font-bold tracking-[1.6px]`}
`;

const List = styled.ul`
  ${tw`cursor-pointer pl-0 font-normal text-base leading-[1.5rem] tracking-[0.12rem] text-[rgba(215, 219, 255, 1)] list-none
  before:(content-['▸'] text-[rgba(215, 219, 255, 1)] mr-[0.5625rem]) 
  `}
`;

const ListItem = styled.li`
  ${tw`mb-[0.6875rem] tracking-[1.6px] 
  
  
  `}
`;

const Copyright = styled.p`
  ${tw`mt-[8.0625rem] mr-[-0.1875rem] text-right text-[rgba(215, 219, 255, 1)] font-normal text-base leading-6 tracking-[0.1rem]
  md:(mt-0)
  `}
`;

const BgContainer = styled.div`
    ${tw`mt-[-38rem] h-full max-w-fit flex justify-center items-center overflow-visible
    xl:(max-w-[1440px])
    lg:(mt-[-35rem] max-w-fit overflow-hidden w-full object-cover)
    md:(mt-[-42rem] )
    sm:(mt-[-50rem])
    `}
`

const Bg = styled.img`
    ${tw`max-w-[100vw] h-[100vh]
    xl:(max-w-[1440px] h-[100vh])
    `}
`




const ScrollToTopBtn = styled.button.withConfig({
    shouldForwardProp: (prop) => !['isVisible'].includes(prop)
})<{isVisible: boolean}>`
    ${tw`fixed bottom-[100px] right-[70px] w-[30px] h-[30px] border-none bg-3rd-color text-white rounded-[5px] cursor-pointer z-50 shadow-[0 4px 8px rgba(0, 0, 0, 0.2)] transition-opacity duration-300 ease-in-out`}
    ${({ isVisible }) => isVisible ? tw`opacity-100` : tw`opacity-0 pointer-events-none`}
`;

// Footer component
const Footer = () => {
    const [scrollVisible, setScrollVisible] = useState(false);

    
    useEffect(() => {
        const handleScroll = () => {
            const shouldBeVisible = window.scrollY > 1000;
            if (shouldBeVisible !== scrollVisible) {
                setScrollVisible(shouldBeVisible);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrollVisible]);

  return (
    <div>

    <FooterContainer>
      <LeftContainer>
        <img src={logo} alt="Footer Logo" />
        <FooterNotesContainer>
          <Wordpress><strong>Beautice</strong> is a Beauty Clinic WordPress Theme.</Wordpress>
          <Address>Baker Steet 101, NY, United States.</Address>
          <ContactInfo>
            <Phone>+521 569 8966.</Phone>
            <Email><u>mail@company.com</u></Email>
          </ContactInfo>
        </FooterNotesContainer>
        <SocialIcons>
          <img src={socialIcons} alt="Social Media Icons" />
        </SocialIcons>
      </LeftContainer>
      <div>
      <RightContainer>
        <Pages>
          <SectionTitle>Pages</SectionTitle>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>About</ListItem>
            <ListItem>Services</ListItem>
            <ListItem>Gallery</ListItem>
            <ListItem>Team</ListItem>
          </List>
        </Pages>
        <Informations>
          <SectionTitle>Informations</SectionTitle>
          <List>
            <ListItem>Terms & conditions</ListItem>
            <ListItem>Privacy policy</ListItem>
            <ListItem>Blog</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Informations>
        
      </RightContainer>
      <Copyright>© Linh Ha 2024 - All right reserved.</Copyright>
      </div>
    </FooterContainer>

    <BgContainer>
        <Bg src={BgImage} />
    </BgContainer>
    <ScrollToTopBtn isVisible={scrollVisible} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                ↑
    </ScrollToTopBtn>
    </div>
  );
}

export default Footer;
