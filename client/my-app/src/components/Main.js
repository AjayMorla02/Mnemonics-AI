import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUser, FaInfoCircle } from 'react-icons/fa';
import { generateSong, getChatHistory } from '../services/api';
function Main() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    { text: 'This is a user message.', isUser: true },
    { text: 'This is a response message.', isUser: false },
  ]);
  const [inputValue, setInputValue] = useState('');
  const userEmail = "user@example.com"; // Replace with actual user email
  const userId = 1; // Replace with the actual user ID from your authentication system
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleSubmit = async () => {
    if (inputValue.trim() !== '') {
      const userMessage = { text: inputValue, isUser: true };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await generateSong(inputValue);
        const botMessage = { text: response.song.lyrics || 'No lyrics generated.', isUser: false };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error generating song:', error);
        // Handle error appropriately in your UI
      }

      setInputValue('');
    }
  };

  const handleChatSelect = async (chatIndex) => {
    try {
      const chatHistory = await getChatHistory(userId, chatIndex);
      const formattedMessages = chatHistory.map((history) => ({
        text: history.message,
        isUser: history.isUser, // Adjust this based on your schema
      }));
      setMessages(formattedMessages);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      // Handle error appropriately in your UI
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate('/');
    console.log('Logged out');
  };

  return (
    <div className="MainContainer">
      <Sidebar 
        navigate={navigate} 
        userEmail={userEmail} 
        handleChatSelect={handleChatSelect}
        setShowLogoutConfirm={setShowLogoutConfirm}
      />
      <ChatArea 
        messages={messages} 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        handleSubmit={handleSubmit} 
        navigate={navigate} 
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
        handleLogout={handleLogout}
      />
      <style jsx>{`
        .MainContainer {
          display: flex;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

function Sidebar({ navigate, userEmail, handleChatSelect, setShowLogoutConfirm }) {
  return (
    <div className="Sidebar">
      <SidebarHeader navigate={navigate} />
      <SidebarContent navigate={navigate} userEmail={userEmail} handleChatSelect={handleChatSelect} />
      <style jsx>{`
        .Sidebar {
          flex: 0 0 15%;
          background-color: #2C3E50;
          padding: 20px;
          color: white;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}

function SidebarHeader({ navigate }) {
  return (
    <div className="SidebarHeader">
      <h2>MnemonicsAI</h2>
      <style jsx>{`
        .SidebarHeader {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}

function SidebarContent({ navigate, userEmail, handleChatSelect }) {
  return (
    <div className="SidebarContent">
      <h3>Chat History</h3>
      <div className="ChatButtons">
        <button onClick={() => handleChatSelect(0)}>Chat 1</button>
        <button onClick={() => handleChatSelect(1)}>Chat 2</button>
        <button onClick={() => handleChatSelect(2)}>Chat 3</button>
      </div>
      <div className="Instructions">
        <p>How to use:</p>
        <ul>
          <li>Input Words: Type your words or ideas</li>
          <li>Click "Generate": Hit the button</li>
          <li>Read & Learn: Enjoy the song</li>
          <li>Repeat as Needed: Memorize with melody</li>
        </ul>
      </div>
      <style jsx>{`
        .SidebarContent {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }
        .ChatButtons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
        }
        .ChatButtons button {
          background-color: #34495E; /* Less contrasting color */
          color: white;
          border: none;
          padding: 10px;
          border-radius: 5px;
          cursor: pointer;
        }
        .ChatButtons button:hover {
          background-color: #1F618D; /* Slightly lighter color on hover */
        }
        .Instructions {
          margin-top: 20px;
          color: #ECF0F1;
        }
        .Instructions ul {
          padding-left: 20px;
        }
      `}</style>
    </div>
  );
}

function ChatArea({ messages, inputValue, setInputValue, handleSubmit, navigate, showLogoutConfirm, setShowLogoutConfirm, handleLogout }) {
  return (
    <div className="ChatArea">
      <Header 
        navigate={navigate} 
        showLogoutConfirm={showLogoutConfirm}
        setShowLogoutConfirm={setShowLogoutConfirm}
        handleLogout={handleLogout}
      />
      <ChatContainer messages={messages} />
      <InputContainer 
        inputValue={inputValue} 
        setInputValue={setInputValue} 
        handleSubmit={handleSubmit} 
      />
      <style jsx>{`
        .ChatArea {
          flex: 0 0 85%;
          display: flex;
          flex-direction: column;
          background-color: #ECF0F1;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
function Header({ navigate, showLogoutConfirm, setShowLogoutConfirm, handleLogout }) {
  return (
    <div className="Header">
      <h1>Unlock Memory with Melodies</h1>
      <p>Enter your words or concepts below to generate personalized mnemonic songs</p>
      <div className="HeaderRight">
        <div className="AccountInfo">
          <FaUser style={{ marginRight: '10px' }} />
          <span>user@example.com</span>
        </div>
        <div className="ActionButtons">
          <div className="ActionButton" onClick={() => setShowLogoutConfirm(true)}>
            <FaSignOutAlt />
            <span>Logout</span>
          </div>
          <div className="ActionButton" onClick={() => navigate('/about')}>
            <FaInfoCircle />
            <span>About</span>
          </div>
        </div>
      </div>
      {showLogoutConfirm && (
        <div className="LogoutConfirmCard">
          <p>Are you sure you want to logout?</p>
          <button onClick={handleLogout}>Yes</button>
          <button onClick={() => setShowLogoutConfirm(false)}>No</button>
        </div>
      )}
      <style jsx>{`
        .Header {
          padding: 20px;
          text-align: center;
          background-color: #2980B9;
          color: white;
          position: relative;
          margin-bottom: 10px;
        }
        .HeaderRight {
          position: absolute;
          top: 20px;
          right: 20px;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
        .AccountInfo {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
        .ActionButtons {
          display: flex;
          gap: 20px;
        }
        .ActionButton {
          display: flex;
          align-items: center;
          cursor: pointer;
          gap: 5px;
        }
        .LogoutConfirmCard {
          position: absolute;
          top: 50px;
          right: 20px;
          background: white;
          color: black;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .LogoutConfirmCard button {
          margin: 5px;
        }
      `}</style>
    </div>
  );
}

function ChatContainer({ messages }) {
  return (
    <div className="ChatContainer">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`ChatMessage ${message.isUser ? 'UserMessage' : 'BotMessage'}`}
        >
          {message.text}
        </div>
      ))}
      <style jsx>{`
        .ChatContainer {
          flex: 1;
          padding: 20px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ChatMessage {
          padding: 10px;
          border-radius: 5px;
          max-width: 70%;
        }
        .UserMessage {
          align-self: flex-end;
          background-color: #2980B9;
          color: white;
        }
        .BotMessage {
          align-self: flex-start;
          background-color: #BDC3C7;
          color: black;
        }
      `}</style>
    </div>
  );
}

function InputContainer({ inputValue, setInputValue, handleSubmit }) {
  return (
    <div className="InputContainer">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
        placeholder="Type your message..."
      />
      <button onClick={handleSubmit}>Generate</button>
      <style jsx>{`
        .InputContainer {
          display: flex;
          padding: 20px;
          background-color: #34495E;
        }
        .InputContainer input {
          flex: 1;
          padding: 10px;
          margin-right: 10px;
          border: none;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .InputContainer button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          background-color: #2980B9;
          color: white;
          cursor: pointer;
        }
        .InputContainer button:hover {
          background-color: #1F618D;
        }
      `}</style>
    </div>
  );
}

export default Main;
