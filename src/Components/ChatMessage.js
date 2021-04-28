import {
  Box,
  Text,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
  useDisclosure,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { auth, firestore } from '../firebase';
import userimg from '../Assets/user.png';

const ChatMessage = (props) => {
  const { id, text, uid, photoURL } = props.message;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  const messagesRef = firestore.collection('messages');

  const deleteMessage = async () => {
    await messagesRef.doc(id).delete();
  };

  return (
    <>
      <Box className={`message ${messageClass}`}>
        <Image
          src={photoURL || userimg}
          alt='img'
        />
        {
          messageClass === 'sent' ?
            <Popover placement='bottom-start' isOpen={isOpen}>
              <PopoverTrigger>
                <Text className='message-text' onClick={onOpen}>
                  {text}
                </Text>
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton onClick={onClose} />
                <PopoverBody>
                  Are you sure you want to delete the message?
            </PopoverBody>
                <PopoverFooter d='flex' justifyContent='flex-end'>
                  <ButtonGroup size='sm'>
                    <Button variant='outline' onClick={onClose}>
                      Cancel
                </Button>
                    <Button colorScheme='red' onClick={deleteMessage}>
                      Okay
                </Button>
                  </ButtonGroup>
                </PopoverFooter>
              </PopoverContent>
            </Popover> :
            <Text className='message-text' onClick={onOpen}>
              {text}
            </Text>
        }
      </Box>
      <Box className={`icon ${messageClass}`}>

      </Box>
    </>
  );
};

export default ChatMessage;
