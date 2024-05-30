import React from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';

import Title from '../../../components/Title';
import Text from '../../../components/Text';
import Btn from '../../../assets/home2/hero-playbtn.png'

const Hero = () => {
  return (
    <div tw='mt-48 flex justify-between lg:(flex-col text-center p-0 items-center mt-[4rem] ) md:(p-[2rem] mt-[2rem])'>

      <div tw='max-w-[44%] mt-[4.6875rem]
      lg:(max-w-[100%] self-center)'>

        <Title tw='text-white'>Your beauty center place</Title>
        <Text tw='text-[rgba(216, 220, 255, 1)] tracking-[1.7px] mt-[0.8125rem]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo, massa pellentesque arcu fusce et magna consequat neque vitae lobortis.</Text>
        <button tw='text-white font-semibold border border-[1px solid rgba(255, 255, 255, 1)] rounded-[15px] mt-[41px] p-[12px 29px]'>More Details</button>
        </div>
        <div tw='flex flex-row items-center mr-[143px] mt-[76px]
        lg:(mt-[3rem] mr-0)
        '>
          <img tw='w-[166px] h-auto mr-[26px]' src={Btn} alt="" />
          <p tw='text-white font-semibold '>Tour Video</p>
          
        </div>
    </div>
  )
}

export default Hero
