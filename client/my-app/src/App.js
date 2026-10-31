import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';
import About from './components/About';
import Main from './components/Main';
import DemoPage from './demo';

function App() {
  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      event.stopPropagation();

      const userConfirmed = window.confirm("Are you sure you want to go back?");
      if (userConfirmed) {
        window.history.pushState(null, null, window.location.pathname);
      } else {
        
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
