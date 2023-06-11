import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import '../styles/Profile.css' 

function Profile(){
    const {user, isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect the user if they are not logged in
        if (!isAuthenticated) {
          navigate('/');
        }
    }, [isAuthenticated, navigate]);
        
    if (!isAuthenticated) {
        return null; // or render a loading spinner or a message
    }
    // const userId =    user.sub;

    return (
        <div className="profile">
           {/* Contains the name and profile picture */}
            <div className="sidebar">
                <img className="picture" src={user.picture} alt="Profile" />
                <p className="name">{user.name}</p>

                <div className="brief-history">
                    <div className="difficulty-item">
                        <p className="difficulty-name">Easy</p>
                        <p className="wdl">5 1 0</p>
                    </div>
                    
                    <hr className="divider"/>
                    
                    <div className="difficulty-item">
                        <p className="difficulty-name">Medium</p>
                        <p className="wdl">4 4 2</p>
                    </div>
            
                    <hr className="divider"/>

                    <div className="difficulty-item">
                        <p className="difficulty-name">Hard</p>
                        <p className="wdl">4 5 2</p>
                    </div>
                </div>

            </div>

            {/* Contains statistics and game history */}
            <div className="games">
                <p className="history-head">Game Infomation</p>

                <hr className="divider-bold"/>


            </div>


        </div>
    )
}

export default Profile;