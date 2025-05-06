import logo from '../assets/image.png';
import '../styles/header.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import ShowList from './showList.js';
import Serie from './serie.js';




function Header() {
    return (
        
        <header className="header">
            <div className="container">
            <nav className="nav">
                <ul className="nav-links">
                
                    <li>
                        <a href="">Personnage</a>
                    </li>
                    <li>
                        <a href="">Acteur</a>
                    </li>
                </ul>
            </nav>
            <button className="menu-toggle" id="menu-toggle">☰</button>
            </div>
        </header>
    )
}

export default Header

