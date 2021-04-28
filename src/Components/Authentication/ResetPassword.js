import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const ResetPassword = ({ setEmail, setToggle, resetPassword }) => {
  return (
    <Box className='login'>
      <Box className='card'>
        <Text className='login-header'>Notify</Text>
        <Text className='login-desc'>Simple And Best Note Taking App</Text>
        <Box className='email-login'>
          <label>
            <b>Email</b>
          </label>
          <input
            type='text'
            placeholder='Enter Email'
            name='email'
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Flex justifyContent='center' mt={4}>
            <Button className='login-btn' onClick={() => setToggle(true)}>
              Go Back
            </Button>
            <Button className='login-btn' onClick={resetPassword}>
              Reset Password
            </Button>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
