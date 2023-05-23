import React, {useState, useEffect} from "react";
import {Link, useLocation} from 'react-router-dom';

import '../styles/Navbar.css';
import ReorderIcon from '@mui/icons-material/Reorder';
import Button from 'react-bootstrap/Button';

function Navbar() {
    const [expandNavbar, setExpandNavbar] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setExpandNavbar(false);
    }, [location]);

    return (
        <div className="navbar" id={expandNavbar ? "open": "close"}>
            <div className="toggleButton">
                <button onClick={() => {setExpandNavbar((prev) => !prev)}}> 
                    <ReorderIcon/> 
                </button>
            </div>
            <div className="links">
                <Button href="#">Login</Button>
            </div>
        </div>
    )
}

export default Navbar;