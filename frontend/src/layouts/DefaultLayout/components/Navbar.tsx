import {useState} from 'react';

import tw from 'twin.macro';
import styled from 'styled-components';
import logo from '../../../assets/main-logo.svg'; 
import hamburger from '../../../assets/navbar-hamburger.png';
import cross from '../../../assets/navbar-cross.png';



const NavbarContainer = styled.div`
  ${tw`flex justify-between items-center mt-[2.5rem] pt-0 
  lg:(p-[1rem 4rem] mt-[1rem])
  md:(p-[1rem 2rem])
  sm:(p-[1rem])
  `}
`;

const Logo = styled.img`
  ${tw`my-0 ml-[-0.1875rem] w-[16.375rem] self-center z-30`}
`;

const NavbarList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})<{isActive: boolean}>`
  ${tw`mt-[0.25rem] mb-0 pl-0 flex gap-x-[3.0625rem] list-none self-start items-center
       ml-auto font-medium text-2nd-color hover:text-3rd-color`}
  ${({ isActive }) => !isActive ? tw`lg:hidden` : tw``}
  ${({ isActive }) => isActive ? tw`lg:(flex flex-col absolute top-0 left-0 right-0 bg-white z-10 p-[1rem] pt-[6rem])` : ''}
`;


const NavItem = styled.li`
  ${tw`cursor-pointer font-medium
  lg:(flex-col top-0 left-0 right-0 bg-white z-10 p-[1rem])
  `}
`;

const ContactButton = styled.button`
  ${tw`cursor-pointer rounded-[50px] px-[2.5625rem] py-[0.875rem] mr-[-2px] border-none
       bg-3rd-color text-white self-center`}
  &:hover {
    color: white;
    font-weight: 600;
  }
`;


const Menu = styled.img.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})<{isActive: boolean}>`
  ${tw`hidden h-6 cursor-pointer z-40 lg:(flex)`}
`;



const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    console.log('active')
    setActive(!active)
  }

  return (
    <div>
    <NavbarContainer>
        <Logo src={logo} alt="Main Logo" />
        <NavbarList isActive={active}>
            <NavItem>Home +</NavItem>
            <NavItem>About</NavItem>
            <NavItem>Service</NavItem>
            <NavItem>Gallery</NavItem>
            <NavItem>Blog</NavItem>
            <ContactButton>Contact</ContactButton>
        </NavbarList>
        <Menu src={active ? cross : hamburger} isActive={active} onClick={handleClick} />
    </NavbarContainer>


    </div>
    
  )
}

export default Navbar;