import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Define styled components
const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100vh;
  padding: 20px;
  background-color: #f0f4f8;
`;

const Header = styled.header`
  width: 100%;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Footer = styled.footer`
  width: 100%;
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  text-align: center;
`;

const Heading = styled.h1`
  margin-bottom: 20px;
  font-size: 2.5em;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
  width: 80%;
`;

const Paragraph = styled.p`
  margin: 10px 0;
  font-size: 1.2em;
  color: #555;
  text-align: center;
  max-width: 800px;
  line-height: 1.6;
`;

const Highlight = styled.span`
  color: #3498db;
  font-weight: bold;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: white;
  color: #3498db;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin: 0 10px;

  &:hover {
    background-color: #f0f4f8;
  }
`;

function About() {
  const navigate = useNavigate();

  return (
    <AboutContainer>
      <Header>
        <Button onClick={() => navigate('/')}>Home</Button>
        <Button onClick={() => navigate('/main')}>Back</Button>
      </Header>
      <div>
        <Heading>About Us</Heading>
        <Paragraph>
          Welcome to our <Highlight>AI-Powered Language Mnemonics</Highlight> application! We are passionate about the power of mnemonics and their effectiveness in aiding memory retention. Just like teaching the alphabet to children using the tune of "Twinkle Twinkle Little Star," our goal is to harness the potential of Artificial Intelligence to create engaging and memorable learning experiences.
        </Paragraph>
        <Paragraph>
          Our objective is to develop an AI program for teachers that enables students to learn and remember course material through customized songs. By analyzing data and organizing it into rhyming lines and melodies, our AI tool helps transform complex information into easily digestible and memorable content.
        </Paragraph>
        <Paragraph>
          We believe that music and rhythm can significantly enhance the learning process, making it more enjoyable and effective. With our AI-powered tool, educators can create personalized learning aids that cater to the unique needs of their students, ensuring a more inclusive and impactful educational experience.
        </Paragraph>
        <Paragraph>
          Join us on this exciting journey to revolutionize education with the power of AI and mnemonics!
        </Paragraph>
      </div>
      <Footer>
        &copy; 2024 AI-Powered Language Mnemonics. All rights reserved.
      </Footer>
    </AboutContainer>
  );
}

export default About;
