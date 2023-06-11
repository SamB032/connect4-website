import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';

import Home from './pages/HomePage';
import Profile from './pages/ProfilePage';
import Navbar from './components/Navbar';
import GameBoard from './components/GameBoard';
import PageNotFound from './pages/PageNotFound';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  useEffect(() => {
    document.title = "Connect4";
  }, []);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:difficulty" element={<GameBoard/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;