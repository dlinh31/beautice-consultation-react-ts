import { useState } from 'react';
import tw from 'twin.macro'
import styled from 'styled-components';
import { useAtom } from 'jotai';
import { userAtom } from '../../../context/userAtom';
import {editUserInfo} from '../../auth/api/UserRequests'
import Title from '../../../components/Title';
import Subtitle from '../../../components/Subtitle';
import Text from '../../../components/Text';
import Button from '../../../components/Button';
import bg from '../../../assets/home1/slide-background.png'
import Background from '../../../components/Background';



const Input = styled.input`
    ${tw`w-full max-w-full p-[0.5rem 1.5rem] border-[1px] border-[#ccc]
    rounded-[0.9375rem] text-black border-[rgba(217, 221, 254, 1)] font-normal leading-[1.5rem]
    placeholder:(text-[rgba(197, 197, 197, 1)])
    `}
`
const InputContainer = styled.div`
    ${tw`flex flex-col gap-3`}
`
const UserProfile = () => {
    const inputStyles = {
        editable: tw` bg-white`,
        notEditable: tw`bg-gray-100`,
    }

    const [user, setUser] = useAtom(userAtom);
    const [isEditing, setIsEditing] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("")

    const toggleEdit = async () => {
        if (!isEditing){
            setIsEditing(!isEditing);
            setFirstName(user.first_name);
            setLastName(user.last_name);
        } else {
            const res = await editUserInfo({email: user.email, first_name: firstName, last_name: lastName})
            if (res.status !== 200){
                setError("Internal server error")
            } else {
                setIsEditing(false);
                setUser(prevUser => ({
                    ...prevUser,
                    first_name: firstName,
                    last_name: lastName
                }));
                setFirstName("")
                setLastName("")
                setSuccess("Profile updated successfully!");

            }
        }
    };

    return (
        <div>
        <Background src={bg} tw='mt-[-200px] ml-[-200px]' />
        <div tw="h-full p-8 mt-20 flex justify-center ">
            <div tw="bg-white p-8 rounded-[50px] shadow-[-2px 4px 31px 9px rgba(242, 244, 255, 1)] w-full max-w-full">
                <div tw="flex justify-between items-center mb-10">
                    <Title tw="text-3xl font-semibold">Your profile</Title>
                    <Button onClick={toggleEdit} tw="bg-3rd-color text-white py-3 px-8">
                        {isEditing ? 'Save' : 'Edit'}
                    </Button>
                </div>
                <div tw="grid grid-cols-2 gap-10 mb-8">
                    <InputContainer>
                        <Subtitle>User ID:</Subtitle>
                        <Input placeholder={user.user_id.toString()} readOnly={true}     
                        tw='placeholder:text-3rd-color' style={inputStyles["notEditable"]} />
                    </InputContainer>

                    <InputContainer>
                        <Subtitle>Email address:</Subtitle>
                        <Input placeholder={user.email} readOnly={!isEditing} style={inputStyles["notEditable"]} />
                    </InputContainer>

                    <InputContainer tw='flex flex-col gap-3'>
                        <Subtitle>First name:</Subtitle>
                        <Input placeholder={user.first_name} readOnly={!isEditing} value={firstName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setFirstName(e.target.value)}}
                         style={inputStyles[isEditing ? "editable" : "notEditable"]} />
                    </InputContainer>

                    <InputContainer>
                        <Subtitle>Last name:</Subtitle>
                        <Input placeholder={user.last_name} readOnly={!isEditing} value={lastName} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setLastName(e.target.value)}}
                         style={inputStyles[isEditing ? "editable" : "notEditable"]} />
                    </InputContainer>
                </div>

                {error && 
                  (<div tw="flex flex-col items-center mb-4 p-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-[50px] relative" role="alert">
                      <strong tw="font-bold">Error!</strong>
                      <span tw="block sm:inline"> {error}</span>
                  </div>)
                }
                 {success && (
                <div tw="flex flex-col items-center mb-4 p-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-[50px] relative" role="alert">
                    <strong tw="font-bold">Success!</strong>
                    <span tw="block sm:inline">{success}</span>
                </div>
                )}
            </div>
        </div>
        </div>
    );
}

export default UserProfile;
