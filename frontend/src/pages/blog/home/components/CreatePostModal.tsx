import React, { useRef, useState } from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import addPhotoIcon from '../../../../assets/blog/add-photo-icon.png';
import createPostIcon from '../../../../assets/blog/create-post-icon.png'
import { postObject, uploadPostPhoto, createPost } from '../../api/BlogRequests';
import { useAtom } from "jotai";
import { userAtom } from '../../../../context/userAtom';



const CreatePostModal = () => {
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const [imageUrl, setImageUrl] = useState("")
    const [downloadUrl, setDownloadUrl] = useState("");
    const [user] = useAtom(userAtom);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleFileChange = (event:any) => {
        setFile(event.target.files[0]); // Update the state to hold the selected file
        setImageUrl(URL.createObjectURL(event.target.files[0]))
    };

    const handleUploadFile = async () => {
        if (file){
        const formData = new FormData();
        formData.append('filename', file); // Must match the name expected by the backend, i.e., 'filename'
        const res = await uploadPostPhoto(formData)
        setDownloadUrl(res?.data?.downloadURL)
        }
    }
    
    const handleCreatePost = async () => {
        await handleUploadFile();
        const title = titleRef.current?.value || "";
        const tag = tagRef.current?.value || "";
        const content = contentRef.current?.value || "";
        const postData: postObject = {
            user_id: user.user_id,
            title: title,
            tag:tag,
            text_content: content,
            post_date: new Date(),
            image_url: downloadUrl,
            like_count: 0
        }
        const res = await createPost(postData);
        console.log(res)


        
    };
    return (
      <div tw="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"> {/* darked background div */}
        <div tw="bg-white p-5 rounded-[30px] max-w-[70%] w-full flex flex-col">
            <Title tw='text-2xl self-center justify-self-center mt-3 '>Create post</Title>
            <hr tw="h-px my-8 bg-1st-color border-0" />
            
            <div tw="flex flex-col">
                <div tw='flex gap-5'>
                    <input type="text" placeholder="Title" ref={titleRef} tw="mb-4 border p-2 w-full rounded-[10px] pl-4 "/>
                    <input type="text" placeholder="Tag" ref={tagRef} tw="mb-4 border p-2 w-full rounded-[10px] pl-4 max-w-[30%] "/>
                </div>
                
                <textarea placeholder="Content" ref={contentRef} tw="mb-4 border p-2 w-full rounded-[10px] pl-4 " rows={3}/>
            </div>
            <div tw='mb-5 cursor-pointer hover:(bg-gray-200)'> {/* Add media div */}
            <input tw='hidden'
                type="file" 
                onChange={handleFileChange} 
                id="fileInput" 
                accept='image/png, image/jpeg'
            />
            <label htmlFor="fileInput" tw='w-full h-[150px] border-2 border-2nd-color rounded-[10px] cursor-pointer flex items-center justify-center gap-3'>
                Add media
                <img src={addPhotoIcon} tw='h-[25px] w-[25px]' />
            </label>
            {imageUrl &&
            <div tw='h-[250px] flex items-center justify-center pt-3'>
                <img src={imageUrl} tw='h-full' />    
            </div>
            }
            </div>
            <div tw='flex gap-5 items-center justify-center'>
                <button onClick={handleCreatePost} tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                    <Subtitle tw='text-1st-color font-normal'>Create post</Subtitle>
                    <img src={createPostIcon} tw='h-[25px] w-[25px]' />
                </button>
            </div>
        </div>
      </div>
    );
  };
export default CreatePostModal
