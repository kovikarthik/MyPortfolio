import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PromptTailorResume from './Blogs/PromptTailorResume';
import Portfolio from './Portfolio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  return (
    <div className="App">
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blogs/prompt-tailor-resume" element={<PromptTailorResume />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
