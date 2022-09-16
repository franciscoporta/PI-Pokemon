import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Nav from './components/Nav';

function App() {
  return (
    <Routes>
       <Route exact path='/' element={<LandingPage/>} />
       <Route exact path='/home' element={<Home/>}/>
    </Routes>
  );
}

export default App;
