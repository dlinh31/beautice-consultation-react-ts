import React from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Subtitle from '../../../components/Subtitle';
import Title from '../../../components/Title';
import Text from '../../../components/Text';


const Services = () => {
  return (

    <div tw='flex flex-col justify-center items-center text-center max-w-full mt-[160px] ml-[3px]
    md:(p-[2rem])
    sm:(p-[1rem])'>
      <Subtitle>Main Services</Subtitle> 
      <Title tw='text-[2.25rem] pt-[4px]'>Our focus services</Title>
      <Text tw='mt-[12px]'>Lorem ipsum dolor sit amet.</Text>
    </div>
  )
}

export default Services
