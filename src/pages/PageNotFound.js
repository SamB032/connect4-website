import {Link} from 'react-router-dom';
import '../styles/PageNotFound.css';

function PageNotFound() {
    return (
        <div className="Page Not found">
            <h1 style={{color: "white"}}>Error 404 Page not found</h1>
            {/* Needs to render a return button */}
      
            <div className="div-button">
                <Link to="/">
                    <button className="custom-btn-pnf">Return to home</button>
                </Link>
            </div>
        </div>
    );
}

export default PageNotFound;