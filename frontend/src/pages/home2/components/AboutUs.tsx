import React from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Title from '../../../components/Title'
import Subtitle from '../../../components/Subtitle'
import Text from '../../../components/Text'
import Img from '../../../assets/home2/home2-aboutUs.png'
import Button from '../../../components/Button';
const AboutUs = () => {
  return (
    <div tw='flex justify-between mt-[474px]
    lg:(flex-col mt-80)
    md:(p-[2rem] mt-52)'>
      <div tw='  overflow-hidden
      lg:(flex flex-col w-full self-center items-center justify-center justify-items-center)'>
        <img src={Img} alt="" tw='w-full lg:(w-[50%])' />
        
      </div>
      <div tw='max-w-[50%] pl-[89px]
       lg:(max-w-full items-center justify-center text-center px-7 pt-5)'>
        <Subtitle tw='mb-[11px]'>About Us</Subtitle>
        <Title tw='text-[36px] leading-[45px] mb-[12px]' >We are the best beauty clinic</Title>
        <Text tw='mb-[48px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit, quam suscipit purus donec amet. 
        Egestas volutpat facilisi eu libero. Nunc, ipsum ornare mauris sit quam quis enim. Varius tellus in suspendisse placerat.</Text>
        <Button tw='font-semibold  p-[16px 48px] shadow-[0px 17px 22px 0px rgba(255, 237, 246, 1)]'>Learn More</Button>



      </div>
    </div>
  )
}

export default AboutUs
