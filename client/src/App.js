import { Route, Routes } from 'react-router-dom';
import './App.css';
import Create from './components/Create/Create'
import Details from './components/Details/Details';
import Home from './components/Home/Home';
import LandingPage from './components/Landing/LandingPage';


function App() {
  return (
    <Routes>
       
       <Route exact path='/' element={<LandingPage/>} />
       
       <Route exact path='/home' element={<Home/>}/>
       
       <Route exact path='/create' element={<Create/>}/>
       
       <Route exact path='/details/:id' element={<Details/>}/>
       
    </Routes >
  );
}

export default App;
