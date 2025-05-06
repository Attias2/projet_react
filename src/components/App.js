import React from 'react';
import '../styles/App.css';
import ShowList from './showList.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/header.css';
import Serie from './serie.js';
import Episode from './episode.js';
import Person from './person.js';
import Character from './character.js';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
        
          <div className="container">
            <nav className="nav">
              <ul className="nav-links">
                        <li>
                          <Link to="/showList">Sérié</Link>
                        </li>
                        <li>
                            <a href="">Acteur</a>
                        </li>
              </ul>
            </nav>
            <button className="menu-toggle" id="menu-toggle">☰</button>
          </div>
          
        </header>
        <Routes>
          <Route path="/" element={<ShowList />} /> 
          <Route path="/showList" element={<ShowList />} />
          <Route path="/serie/:id" element={<Serie />} />
          <Route path="/episode/:id" element={<Episode />} />
          <Route path="/person/:id" element={<Person />} />
          <Route path="/character/:showId/:characterId" element={<Character />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
