import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
const Chat=()=>{
  const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentChat, setCurrentChat] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined);
    const socket = useRef();



    useEffect(()=>{
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      }else{
        setCurrentUser(
           JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    },[])
    useEffect( () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data =  axios.get(`${allUsersRoute}/${currentUser._id}`);
         setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    }, [currentUser]);
    console.log(currentUser)
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
      };
    return (
        <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          <Welcome />
          {/* {currentChat === undefined ? (
          
          ) : (
           
          )} */}

<ChatContainer currentChat={currentChat} socket={socket} />
        </div>
      </Container>
    )
}
export default Chat