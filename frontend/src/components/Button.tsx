import tw, { TwStyle } from "twin.macro";
import styled from "styled-components";


const Button = styled.button`
  ${tw`cursor-pointer rounded-[50px]  border-none 
       bg-3rd-color text-white self-center font-semibold`}
  &:hover {
    color: white;
    font-weight: 600;
  }
`;

export default Button;