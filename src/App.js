import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {useEffect} from 'react';

import Home from './pages/HomePage';
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
          <Route path="/connect4" element={<Home />} />
          <Route path="/connect4/game/:difficulty" element={<GameBoard/>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;