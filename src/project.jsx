import React, { useState } from 'react';
import { TextField, IconButton, Grid } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
;
function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, sender: 'user' }]);
      setInputValue('');
      // You can add logic here to send the message to your backend for processing
      fetch('http://localhost:3000/api/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <h2>WhatsApp Chatbot</h2>
        </Grid>
        <Grid item xs={12}>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.sender === 'user' ? 'right' : 'left', marginTop:'32px' }}>
              <span style={{ background: message.sender === 'user' ? '#DCF8C6' : '#E0E0E0', padding: 10, borderRadius: 5 }}>
                {message.text}
              </span>
            </div>
          ))}
        </Grid>
        <Grid item xs={10}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatBot;
