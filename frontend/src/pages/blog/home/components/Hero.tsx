import React from 'react'
import tw from 'twin.macro';
import Bg from '../../../../assets/blog/background.png'
import Background from '../../../../components/Background';
import Title from '../../../../components/Title';
import Text from '../../../../components/Text';

const Hero = () => {
  return (
    <div tw='mt-[1.8125rem] mb-[10rem]'>
      <div tw='overflow-hidden w-full object-cover max-w-[1440px]'>
        <Background src={Bg} tw='w-full h-auto left-0' />
      </div>
    
    <div tw='flex'>
      <div tw='mt-[7.125rem] flex justify-between w-full'>
        <Title tw='text-white text-[2.25rem]'>Blog</Title>
        <Text tw='text-white self-center'>Home	• Blog</Text>
      </div>
      


      
      

      
    </div>
    
    </div>
  )
}

export default Hero
