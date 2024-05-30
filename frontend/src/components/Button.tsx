import tw, { TwStyle, styled } from "twin.macro";


const Button = styled.button`
  ${tw`cursor-pointer rounded-[50px]  border-none
       bg-3rd-color text-white self-center`}
  &:hover {
    color: white;
    font-weight: 600;
  }
`;

export default Button;