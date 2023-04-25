import './App.css';
import './index.css'
import Header from './widgets/Header.js';
import { Outlet, Link } from "react-router-dom";



function App() {

  return (
    <div className="body">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
