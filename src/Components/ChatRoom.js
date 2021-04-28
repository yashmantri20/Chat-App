import React, { useRef, useState } from 'react';
import { auth, firestore } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import ChatMessage from './ChatMessage';
import firebase from 'firebase';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Switch } from '@chakra-ui/switch';
import { FormControl, FormLabel } from '@chakra-ui/form-control';

const ChatRoom = () => {
  const chatEnd = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [mode, setMode] = useState(false);
  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue('');
    chatEnd.current.scrollIntoView({ behavior: 'smooth' });
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Box className={mode ? 'dark' : 'normal'}>
      <Box className='header'>
        <Text className='header-text'>ChatApp</Text>
        <Box>
          Mode
          <Switch onChange={() => setMode(!mode)} ml={2} />
          <Button className='logout-btn' onClick={signOut}>
            Logout
        </Button>

        </Box>
      </Box>
      <Box className='chatbox'>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
        <span ref={chatEnd}></span>
      </Box>

      <form onSubmit={sendMessage}>
        <input
          className='chat-input'
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder='Enter the message here'
        />
        <Button className='send-btn' type='submit' disabled={!formValue}>
          🕊️
        </Button>
      </form>
    </Box >
  );
};

export default ChatRoom;
