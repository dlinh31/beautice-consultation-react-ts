import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

import tw from "twin.macro";
import styled from "styled-components";

import Logo from '../../../assets/home2/logo.svg'
import Button from "../../../components/Button";
import BgImage from '../../../assets/home2/home2-bg1.jpg'
import hamburger from '../../../assets/home1/navbar-hamburger.png';
import cross from '../../../assets/home1/navbar-cross.png';
import Background from "../../../components/Background";
import { useAtom } from "jotai";
import { userAtom } from '../../../context/userAtom';
import { NavbarAtom } from "../../../context/NavbarAtom"; // Adjust the path as needed


const NavItem = styled.li`
  ${tw`cursor-pointer font-medium 
  lg:(flex-col top-0 left-0 right-0 bg-white z-10 p-[1rem])
  `}
`;

const Menu = styled.img.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})<{isActive: boolean}>`
  ${tw`hidden h-6 cursor-pointer z-40 lg:(flex)`}
`;

const NavbarList = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop)
})<{isActive: boolean}>`
  ${tw`mt-[0.25rem] mb-0 pl-0 flex gap-x-[3.0625rem] list-none self-start items-center
       ml-auto font-medium text-2nd-color hover:text-3rd-color`}
  ${({ isActive }) => !isActive ? tw`lg:hidden` : tw``}
  ${({ isActive }) => isActive ? tw`lg:(flex flex-col absolute top-0 left-0 right-0 bg-white z-10 p-[1rem] pt-[6rem])` : ''}
  ${tw`[&>*]:lg:text-2nd-color`}
`;
const BgContainer = styled.div`
    ${tw`mt-[-38rem]  h-full max-w-fit overflow-hidden w-full object-cover
    xl:(max-w-[1440px])
    lg:(mt-[-35rem] max-w-fit overflow-hidden w-full object-cover)
    md:(mt-[-42rem] )
    sm:(mt-[-50rem])
    `}
`

const UserInfo = () => {
  const [user] = useAtom(userAtom);
  return (
    <>{user.user_id !== -1 ? (<p className='text-white'> Welcome {user.first_name} {user.last_name}!</p>) : null}</>
  )
}
const Navbar = () => {
  const [active, setActive] = useAtom(NavbarAtom);
  const [user, setUser] = useAtom(userAtom)
  const navigate = useNavigate();

  const Logout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token')
    navigate('/login')
  }

  const handleClick = () => {
    console.log('active')
    setActive(!active)
  }

  return (
    <div tw="">
      <div tw="flex justify-between items-center mt-[2.5rem] mr-[0.125rem] pt-0  lg:(p-[1rem 4rem] mt-[1rem]) md:(p-[1rem 2rem]) sm:(p-[1rem])">
        <div tw="flex flex-row items-center justify-center">

        <img tw='my-0 w-[4.9375rem] self-center z-30' src={Logo} alt="logo" />
        <p tw='ml-[1.125rem] leading-[2.25rem] tracking-[2.5px] text-[1.5rem] text-[rgba(255, 255, 255, 1)]'>Beautice</p>
        </div>
        <NavbarList isActive={active}>
          <UserInfo />
          {user.user_id == -1 && <NavItem tw='font-semibold text-[rgba(255, 255, 255, 1)]'>Home +</NavItem>}
          <NavItem tw="text-[rgba(216, 220, 255, 1)]">About</NavItem>
          <NavItem tw="text-[rgba(216, 220, 255, 1)]">Service</NavItem>
          <NavItem tw="text-[rgba(216, 220, 255, 1)]">Gallery</NavItem>
          <NavItem tw="text-[rgba(216, 220, 255, 1)]"><a href="/blog">Blog</a></NavItem>
          <Button tw="text-[rgba(216, 220, 255, 1)] p-[14px 40px] mr-[-2px]" onClick={Logout}>Contact</Button>
        </NavbarList>
        <Menu src={active ? cross : hamburger} isActive={active} onClick={handleClick} />

      </div>
      <BgContainer>
        <Background src={BgImage} tw="top-0 left-0 
        xl:(max-w-[1500px])
        max:(w-full h-auto) " />
      </BgContainer>
    </div>
  )
}

export default Navbar
