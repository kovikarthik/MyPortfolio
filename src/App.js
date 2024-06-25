import React from 'react';
import Header from './Components/Header';
import About from './Components/About';
import Projects from './Components/Projects';
import Contact from './Components/Contact';
import HomeScreen from './Components/homescreen';


function App() {
  return (
    <>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HomeScreen />
      <div className="container mx-auto px-4">
        <About />
        <Projects />
        <Contact />
      </div>
    </div>
    </>
  );
}

export default App;
