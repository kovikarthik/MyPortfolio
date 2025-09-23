import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromptTailorResume from './Blogs/PromptTailorResume';
import Portfolio from './Portfolio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import OnAppLoading from './OnAppLoading/OnAppLoading';
function App() {  

  const canvasRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Loading animation
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) {
    return (
      <>  
        <OnAppLoading />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      {/* Enhanced Three.js Background */}
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
      <ToastContainer 
        draggable
       />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blogs/prompt-tailor-resume" element={<PromptTailorResume />} />
            <Route path="*" element={<Portfolio />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
