import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { login } from '../services/api';
import backgroundImage from './project_img_2.jpg';

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const LeftContainer = styled.div`
  flex: 0 0 70%;
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
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
  color: white;
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: white;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  width: 80%;
  max-width: 300px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #fff;

  input {
    border: none;
    flex: 1;
    padding: 10px;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 10px;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  width: 80%;
  max-width: 300px;

  &:hover {
    background-color: #0056b3;
  }

  &.google-login {
    background-color: #db4437;

    &:hover {
      background-color: #c23321;
    }
  }
`;

const Message = styled.p`
  color: ${(props) => (props.error ? 'red' : 'green')};
`;

const Terms = styled.p`
  margin: 10px 0;
  font-size: 0.8em;
  color: white;

  a {
    color: white;
    text-decoration: underline;
  }
`;

const SignUpLink = styled.p`
  margin-top: 20px;
  font-size: 0.9em;
  color: white;

  a {
    color: white;
    text-decoration: underline;

    &:hover {
      color: #007bff;
    }
  }
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = {
      username: email,
      password,
    };

    try {
      const response = await login(user);

      if (response) {
        setMessage('Login successful!');
        navigate('/main');
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        setError('Rate limit exceeded, please try again later.');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    }
  };

  return (
    <LoginContainer>
      <LeftContainer />
      <RightContainer>
        <Title>Welcome Back!</Title>
        <Subtitle>Please login to your account</Subtitle>
        <Form>
          {message && <Message>{message}</Message>}
          {error && <Message error>{error}</Message>}
          <Input>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Input>
          <Input>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </Input>
          <Button onClick={handleLogin}>Login</Button>
          <Button className="google-login">Login with Google</Button>
          <SignUpLink>
            Don't have an account? <a href="/signup">Sign Up</a>
          </SignUpLink>
        </Form>
        <Terms>
          By logging in, you agree to our <a href="/terms">Terms of Service</a>.
        </Terms>
      </RightContainer>
    </LoginContainer>
  );
}

export default Login;
