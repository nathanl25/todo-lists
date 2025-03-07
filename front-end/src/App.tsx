// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';

import { BrowserRouter, Route, Routes } from 'react-router';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';

// import { useEffect } from 'react';
function App() {
  // useEffect(() => {
  //   fetch('http://127.0.0.1:8080/category')
  //     .then((response) => response.json())
  //     .then((data) => console.log(data));
  // }, []);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
