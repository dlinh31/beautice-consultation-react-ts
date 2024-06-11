import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../api/BlogRequests';
import { getUserFromId } from '../../../auth/api/AuthRequests'
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import Text from '../../../../components/Text';
import Background from '../../../../components/Background';
import bg from '../../../../assets/home1/slide-background.png'
import bg2 from  '../../../../assets/home1/slide-background-2.png'
interface DisplayPostObject {
  post_id: number;
  user_id: number;
  title: string | null;
  tag: string | null;
  text_content: string;
  post_date: Date;
  image_url: string;
  like_count: number;
}

const Hero = () => {
  const { postId } = useParams<{postId?: string}>();
  const [post, setPost] = useState<DisplayPostObject>();
  const [userPost, setUserPost] = useState("");
  const [error, setError] = useState(false);
  
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try{
          const res = await getPostById(parseInt(postId));
          if (res.status === 400) {
            setError(true);
            return
          }
          setPost(res.data);
        } catch(error){
          setError(true);
          return
        }
        
      }
    };

    fetchPost();
  }, [postId]); 

  useEffect(() => {
    const fetchUser = async () => {
      if (post) { 
        const res = await getUserFromId(post.user_id);
        setUserPost(res.data.first_name + ' ' + res.data.last_name)
      }
    };
    if (post && post.user_id) {
      fetchUser();
    }
  }, [post]);

  if (!post) return <div tw="flex justify-center items-center h-screen">Cannot find post </div>;

  return (
    <div>
      <Background src={bg} tw='mt-[-200px] ml-[-200px]' />
    
      <Container>
        <Image src={post.image_url} alt="Blog Post" tw='w-full h-full'/>
        <Content>
          <Title>{post.title || 'No Title'}</Title>
          <AuthorDate>
            <p>Author: {userPost}</p>
            <p>Date posted: {new Date(post.post_date).toLocaleDateString()}</p>
            <p>Likes: {post.like_count}</p>
          </AuthorDate>
          <Subtitle>{post.tag || 'No Tag'}</Subtitle>
          <Text>{post.text_content}</Text>
        </Content>
      </Container>
      <Background src={bg2} tw='mt-[-300px] ml-[400px]'/>
    </div>
  );
}

export default Hero;

const Container = styled.div`
  ${tw`mb-[100px] mt-[50px] flex flex-col justify-between`}
`;

const Image = styled.img`
  ${tw`w-full h-auto max-w-[70%] rounded-lg shadow-lg mb-5`}
`;

const Content = styled.div`
  ${tw`max-w-[70%] flex flex-col gap-[20px]`}
`;

const AuthorDate = styled.div`
  ${tw`text-sm text-gray-600`}
`;

