import React from 'react'
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import addPhotoIcon from '../../../../assets/blog/add-photo-icon.png';
import createPostIcon from '../../../../assets/blog/create-post-icon.png'
const CreatePostModal = () => {
    return (
      <div tw="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"> {/* darked background div */}
        <div tw="bg-white p-5 rounded-lg max-w-[70%] w-full flex flex-col">
            <Title tw='text-2xl self-center justify-self-center mt-3 '>Create post</Title>
            <hr tw="h-px my-8 bg-1st-color border-0" />

            
            <div tw="flex flex-col">
                <div tw='flex gap-5'>
                    <input type="text" placeholder="Title" tw="mb-4 border p-2 w-full rounded-[10px] pl-4 "/>
                    <input type="text" placeholder="Tag" tw="mb-4 border p-2 w-full rounded-[10px] pl-4 max-w-[30%] "/>
                </div>
                
                <textarea placeholder="Content" tw="mb-4 border p-2 w-full rounded-[10px] pl-4 " rows={3}/>
            </div>

            <div tw='mb-5 cursor-pointer hover:(bg-gray-200)'> {/* Add media div */}
                <button tw='w-full h-[150px] border-2 border-2nd-color rounded-[10px] cursor-pointer flex items-center justify-center gap-3'>
                    Add media
                    <img src={addPhotoIcon} tw='h-[25px] w-[25px]' />
                </button>
                
            </div>

            <div tw='flex gap-5 items-center justify-center'>
                <button tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                    <Subtitle tw='text-1st-color font-normal'>Create post</Subtitle>
                    <img src={createPostIcon} tw='h-[25px] w-[25px]' />
                </button>
            </div>
        </div>
      </div>
    );
  };
export default CreatePostModal
