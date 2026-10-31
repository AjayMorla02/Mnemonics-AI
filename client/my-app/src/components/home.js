import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import backgroundImage from './project_img_2.jpg'; // Adjust the path as needed

// Styled components for Home
const HomeContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const LeftContainer = styled.div`
  flex: 0 0 70%; /* Sets a fixed width of 70% */
  background: url(${backgroundImage}) no-repeat center center;
  background-size: cover;
`;

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #000000;
  color: #ffffff;
  padding: 40px;
  flex: 1; /* Allows right container to grow and shrink with screen size */
`;

const ContentWrapper = styled.div`
  width: 100%;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Button = styled.button`
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

const TryNowButton = styled(Button)`
  padding: 15px 30px;
  font-size: 1.2rem;
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <HomeContainer>
      <LeftContainer /> {/* Left container with background image */}
      <RightContainer>
        <ContentWrapper>
          <Title>MnemonicsAI</Title>
          <SubTitle>Unlock Memory with Melodies</SubTitle>
          <Description>
            We're here to make learning fun and memorable. With our AI, we turn
            your study material into catchy songs that stick in your head. No
            more struggling to remember facts or figures—just sing along and
            watch your memory soar. Whether you're a student cramming for exams
            or someone curious to learn new things, MnemonicsAI has got you
            covered. Try it out and discover a whole new way to learn!
          </Description>
          <ButtonContainer>
            <Button onClick={() => navigate('/login')}>Log In</Button>
            <Button onClick={() => navigate('/signup')}>Sign Up</Button>
            <TryNowButton onClick={() => navigate('/demo')}>Try It Now!</TryNowButton>
          </ButtonContainer>
        </ContentWrapper>
      </RightContainer>
    </HomeContainer>
  );
};

export default Home;
