import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import demoVideo from './demovideo2.mp4'; // Adjust the path as needed

// Styled components
const DemoContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const LeftContainer = styled.div`
  flex: 0 0 70%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
`;

const VideoWrapper = styled.div`
  width: 80%;
  height: 80%;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #ffffff;
  padding: 40px;
  flex: 1;
`;

const ContentWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin-bottom: 30px;
`;

const TryNowButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DemoPage = () => {
  const navigate = useNavigate();

  const handleDemo = () => {
    navigate('/main');
    // Set a timeout to navigate to login page after 5 minutes
    setTimeout(() => navigate('/login'), 300000); // 300000ms = 5 minutes
  };

  return (
    <DemoContainer>
      <LeftContainer>
        <VideoWrapper>
          <Video controls>
            <source src={demoVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </Video>
        </VideoWrapper>
      </LeftContainer>
      <RightContainer>
        <ContentWrapper>
          <Title>Try It Out!</Title>
          <Description>
            Experience the innovative features of MnemonicsAI. Our AI-powered tool helps you learn languages using mnemonic songs and real-time feedback. Join us and make learning fun and memorable!
          </Description>
          <TryNowButton onClick={handleDemo}>Try It Now!</TryNowButton>
        </ContentWrapper>
      </RightContainer>
    </DemoContainer>
  );
};

export default DemoPage;
