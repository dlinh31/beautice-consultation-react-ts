import { useRef, useState } from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import addPhotoIcon from '../../../../assets/blog/add-photo-icon.png';
import createPostIcon from '../../../../assets/blog/create-post-icon.png'
import { postObject, uploadPostPhoto, createPost } from '../../api/BlogRequests';
import cross from '../../../../assets/home1/navbar-cross.png';
import { useAtom } from "jotai";
import { userAtom } from '../../../../context/userAtom';



const CreatePostModal = ({onClose}: {onClose: () => void}) => {
    const [file, setFile] = useState(null); // State to hold the uploaded file
    const [imageUrl, setImageUrl] = useState("")
    const [user] = useAtom(userAtom);
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const titleRef = useRef<HTMLInputElement>(null);
    const tagRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    const handleFileChange = (event: any) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > 1024 * 1024) { // (1MB = 1024 * 1024 bytes)
                setError("File size should not exceed 1MB.");
                setFile(null);
                setImageUrl("");
                return;
            }

            setError("");
            setFile(selectedFile);
            setImageUrl(URL.createObjectURL(selectedFile));
        }
    };

    const handleUploadFile = async () => {
        if (file){
        const formData = new FormData();
        formData.append('filename', file); // Must match the name expected by the backend, i.e., 'filename'
        const res = await uploadPostPhoto(formData)
        console.log(res?.data?.downloadURL)
        return(res?.data?.downloadURL)
        }
    }
    
    const handleCreatePost = async () => {
        setLoading(true);  // Start loading
        try {
            const downloadUrl = await handleUploadFile();
            if (downloadUrl) {
                const title = titleRef.current?.value || "";
                const tag = tagRef.current?.value || "";
                const content = contentRef.current?.value || "";
                const postData: postObject = {
                    user_id: user.user_id,
                    title: title,
                    tag: tag,
                    text_content: content,
                    post_date: new Date(),
                    image_url: downloadUrl,
                    like_count: 0
                };
                await createPost(postData);
                console.log('Post created successfully');
                onClose();  // Optionally close the modal on success
            }
        } catch (error) {
            console.error('Error creating post:', error);
        } finally {
            setLoading(false);  // Stop loading regardless of outcome
        }
    };
    
    return (
      <div tw="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40"> {/* darked background div */}
        <div tw="bg-white p-5 rounded-[30px] max-w-[70%] w-full flex flex-col">
            <button onClick={onClose}> 
                <img src={cross} tw='w-4 float-right' />
            </button>
            <Title tw='text-2xl self-center justify-self-center '>Create post</Title>
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
                        {error && (
                  <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline"> {error}</span>
                  </div>)}
            <div tw='flex gap-5 items-center justify-center'>

                <button onClick={handleCreatePost} tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                {loading ? (
                    <div tw="flex items-center">
                        <img src="/path/to/spinner.gif" tw="h-[25px] w-[25px]" alt="Loading" />
                        Loading...
                    </div>
                ) : (
                <>   
                    <Subtitle tw='text-1st-color font-normal'>Create post</Subtitle>
                    <img src={createPostIcon} tw='h-[25px] w-[25px]' />
                    </>
                )}
                </button>
            </div>
        </div>
      </div>
    );
  };
export default CreatePostModal
