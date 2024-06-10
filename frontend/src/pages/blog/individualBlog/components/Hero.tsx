import { useEffect, useState } from 'react';
import tw from 'twin.macro';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { getPostById } from '../../api/BlogRequests';
import { getUserFromId } from '../../../auth/api/AuthRequests'
import Title from '../../../../components/Title';
import Subtitle from '../../../../components/Subtitle';
import Text from '../../../../components/Text';

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

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const res = await getPostById(parseInt(postId));
        setPost(res.data);
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
    if (post) {
      fetchUser();
    }
  }, [post]);

  if (!post) return <div tw="flex justify-center items-center h-screen">Loading...</div>; // Enhanced loading state

  return (
    <Container>
      <Image src={post.image_url} alt="Blog Post" />
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
  );
}

export default Hero;

const Container = styled.div`
  ${tw`mb-[100px] mt-[50px] flex justify-between`}
`;

const Image = styled.img`
  ${tw`w-full h-auto max-w-[40%] rounded-lg shadow-lg`}
`;

const Content = styled.div`
  ${tw`max-w-[58%] flex flex-col gap-[20px]`}
`;

const AuthorDate = styled.div`
  ${tw`text-sm text-gray-600`}
`;

