import './App.css'
import 'bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './components/home';
import ContextProvider from './store/ContextProvider';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './components/login';
import Signup from './components/signup';
import ShowProfile from './components/showProfile';
import UpdateProfile from './components/updateProfile';


function App() {

  return (
    <>
      <ContextProvider>
        <Router>
          <div>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/login" element={<Login/>}/>
              <Route exact path="/signup" element={<Signup/>}/>
              <Route exact path="/profile" element={<ShowProfile/>}/>
              <Route exact path="/update" element={<UpdateProfile/>}/>
            </Routes>
          </div>
        </Router>
        

      </ContextProvider>
    </>
  )
}

export default App
