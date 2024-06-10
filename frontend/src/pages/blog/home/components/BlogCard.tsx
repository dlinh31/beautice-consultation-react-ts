import React from 'react'
import tw from 'twin.macro';
import { useNavigate } from 'react-router-dom';

import cardImg from '../../../../assets/blog/sampleCardImage.jpg'
import mailIcon from '../../../../assets/blog/mail_icon.svg'
import triangleIcon from '../../../../assets/blog/triangle_icon.svg'
import Subtitle from '../../../../components/Subtitle';
import Title from '../../../../components/Title';
import Text from '../../../../components/Text';
import Button from '../../../../components/Button';

interface BlogCardProps {
    title: string;
    tag: string;
    content: string;
}

const BlogCard = ({title, tag, content, image_url, id}: {title: string, tag: string, content: string, image_url?: string, id: number}) => {
    const navigate = useNavigate()
    const navigateToBlog = () => {
        navigate(`/blog/${id}`)
    }
  return (
    <div tw='rounded-[50px] overflow-hidden shadow-[10px 13px 80px 14px rgba(242, 244, 255, 1)]'>  {/* Individual Card */}
        <div>
            <div tw='max-h-[455px] w-full overflow-hidden'> {/* image div */}
                <img src={image_url ? image_url : cardImg} tw='w-full h-full' />
            </div>                    
        </div>
        <div tw='mt-[58px] ml-[75px] mb-[6.125rem] mr-14 flex flex-col justify-items-start items-start gap-[20px]'>
            <div tw='flex gap-4 pr-10 '>
                <img src={mailIcon} />
                <Subtitle tw='capitalize'>{tag || "Misc"}</Subtitle>
            </div>
            <Title tw=' text-[2.25rem] leading-[2.8125rem]'>{title || "Untitled post"}</Title>
            <Text tw=''>
            {content.length > 100 ? `${content.substring(0, 100)}...` : content} 
            </Text>
            <Button onClick={navigateToBlog}
            tw='mt-[16px] mr-auto font-semibold p-[17px 54px] flex items-center gap-2'>
                Read More
                <img src={triangleIcon} />
            </Button>
            </div>
    </div>  
  )
}

export default BlogCard
