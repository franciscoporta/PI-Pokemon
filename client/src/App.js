import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create'
import Home from './components/Home/Home';
// import Home from './components/Home';
import LandingPage from './components/Landing/LandingPage';


function App() {
  return (
    <Routes>
       
       <Route exact path='/' element={<LandingPage/>} />
       
       <Route exact path='/home' element={<Home/>}/>
       
       <Route exact path='/create' element={<Create/>}/>
       
    </Routes>
  );
}

export default App;
