import './App.css';
import Portfolio from './Portfolio';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  return (
    <div className="App">
        <ToastContainer />
        <Portfolio />
    </div>
  );
}

export default App;
