import React from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Icon1 from '../../../assets/home2/service-icon1.png'
import Icon2 from '../../../assets/home2/service-icon2.png'
import Icon3 from '../../../assets/home2/service-icon3.png'

const ServiceCards = () => {
  return (
    <div tw='flex justify-between pt-0 gap-[3.5rem] mt-20
    lg:(flex-col items-center)
    md:(p-[2rem] gap-[1rem])
    sm:(p-[1rem 0])'>
      
      <div tw='bg-white rounded-[42px] w-[21.4375rem] text-center
    sm:(max-w-full m-0 p-0)'>
      <img src={Icon1} alt="" />

      </div>
    </div>
  )
}

export default ServiceCards
