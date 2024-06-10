import React, { useEffect, useState } from 'react'
import tw from 'twin.macro';
import styled from 'styled-components';
import { getAllPosts } from '../../api/BlogRequests';
import BlogCard from './BlogCard';
import searchIcon from '../../../../assets/blog/search_icon.svg';
import pfp from '../../../../assets/blog/pfp.jpeg';
import addPhotoIcon from '../../../../assets/blog/add-photo-icon.png';
import createPostIcon from '../../../../assets/blog/create-post-icon.png'
import Button from '../../../../components/Button';
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import Text from '../../../../components/Text';
import CreatePostModal from './CreatePostModal';
import axios from 'axios';

interface PostObject {
    post_id: number,
    user_id: number,
    title: string,
    tag: string,
    text_content: string,
    post_date: Date,
    image_url: string,
    like_count: number,
}


const Blogs = () => {
    const [postData, setPostData] = useState<PostObject[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const postsPerPage = 3;

    useEffect(() => {
        const postAsync = async () => {
            try {
                const res = await getAllPosts();
                setPostData(res.data);
            } catch (error) {
                console.log("Error when fetchAllPosts", error);
            }
        };
        postAsync();
    }, []);

    const pageCount = postData ? Math.ceil(postData.length / postsPerPage) : 0;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const filteredPosts = postData.filter(post => 
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.text_content.toLowerCase().includes(search.toLowerCase())    
    );
    // Current posts to be displayed
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

    const paginationStyles = {
        isCurrent: tw` text-white bg-1st-color`,
        isNotCurrent: tw`text-[rgba(199, 199, 199, 1)]`,
    }


    // Change page
    const paginate = (pageNumber:number) => {
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 520, behavior: 'smooth' })
    };

    const Modal = () => {
        const [file, setFile] = useState(null); // State to hold the uploaded file

        const handleFileChange = (event:any) => {
            setFile(event.target.files[0]); // Update the state to hold the selected file
        };
        
        const handleFileUpload = async () => {
            if (!file) {
                alert('Please select a file first!');
                return;
            }

            const formData = new FormData();
            formData.append('filename', file); // Must match the name expected by the backend, i.e., 'filename'
            console.log(file)
        };
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
                <input tw='hidden'
                    type="file" 
                    onChange={handleFileChange} 
                    id="fileInput" 
                />
                <label htmlFor="fileInput" tw='w-full h-[150px] border-2 border-2nd-color rounded-[10px] cursor-pointer flex items-center justify-center gap-3'>
                    Add media
                    <img src={addPhotoIcon} tw='h-[25px] w-[25px]' />
                </label>
                </div>
                <div tw='flex gap-5 items-center justify-center'>
                    <button onClick={handleFileUpload} tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                        <Subtitle tw='text-1st-color font-normal'>Create post</Subtitle>
                        <img src={createPostIcon} tw='h-[25px] w-[25px]' />
                    </button>
                </div>
            </div>
          </div>
        );
      };

    return (
        <div tw='mb-[200px] mt-[219px] flex justify-between'>
        
            <div tw='max-w-[64%] flex flex-col gap-[135px]'>
                {currentPosts.map((data, index) => (
                    <BlogCard key={data.post_id} id={data.post_id} title={data.title} tag={data.tag} content={data.text_content} image_url={data.image_url}/>
                ))}
                
                <div> {/* Pagination UI */}
                    <div tw='flex justify-end mt-[50px]'>
                        {[...Array(pageCount).keys()].map(number => (
                            <button key={number + 1} onClick={() => paginate(number + 1)} tw='w-[35px] h-[35px] mx-[10px] rounded-[50%] font-semibold' style={paginationStyles[currentPage === number + 1 ? "isCurrent" : "isNotCurrent"]}>
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div tw='flex flex-col gap-6'>
                <div tw='shadow-[-2px 4px 31px 9px rgba(242, 244, 255, 1)] rounded-[50px] flex overflow-hidden mt-0.5'>
                    <input type="text" placeholder='Search here...' 
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    tw='w-full max-w-full py-[20px] pr-[84px] pl-[27px] text-black font-normal leading-[1.5rem] rounded-[50px 0px 0px 50px]
                    placeholder:(text-[rgba(217, 221, 254, 1)])
                    ' />
                    <div tw='bg-1st-color flex justify-items-center items-center px-[1.6rem]'>
                        <img src={searchIcon} alt="" tw='max-w-[30px]' />
                    </div>
                </div>


                <div tw='flex flex-col py-5 px-2 rounded-3xl shadow-[-2px 4px 31px 9px rgba(242, 244, 255, 1)]'> {/* Create post div */} 
                    <div tw='flex'> {/* What's on your mind div */} 
                        <div tw='w-10 h-10 rounded-[50%] overflow-hidden'>
                            <img src={pfp} alt="pfp" tw='' />
                        </div>
                        <input type="text" placeholder="What's on your mind?"
                        tw=' w-full rounded-[50px] pl-4 
                        placeholder:(text-[rgba(217, 221, 254, 1)])' />
                    </div>

                    <div tw='mt-6 flex items-center justify-center gap-2'>
                        <div tw='flex items-center justify-center gap-2'>
                            <button tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                                <Subtitle tw='text-1st-color font-normal'>Add a photo</Subtitle>
                                <img src={addPhotoIcon} tw='h-[25px] w-[25px]' />
                            </button>
                            <button onClick={openModal} tw='bg-white flex items-center justify-center gap-2 border-2 border-1st-color rounded-[50px] px-5 py-2'>
                                <Subtitle tw='text-1st-color font-normal'>Create post</Subtitle>
                                <img src={createPostIcon} tw='h-[25px] w-[25px]' />
                            </button>
                            {isModalOpen && <Modal ></Modal>}
                        </div>
                        
                    </div>
                </div>
                
                
                
            </div>
            
        </div>
    )
}

export default Blogs;
