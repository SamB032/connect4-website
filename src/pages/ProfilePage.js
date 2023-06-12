import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getGameData} from '../helpers/ConnectorAPI';

import '../styles/Profile.css' 

function Profile(){
    const [gameData, setGameData] = useState(null);
    const {user, isAuthenticated} = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect the user if they are not logged in
        if (!isAuthenticated) {
          navigate('/');
        }
    }, [isAuthenticated, navigate]);
    
    useEffect(() => {
        fetchData(user.sub);
      }, [user]);
        
      
    async function fetchData(userID) {
        try {
            const data = await getGameData(userID); // Call the getGameData function from your utility file
            setGameData(data);
        } catch (error) {
            console.error(error);
        }
    }
    
    if (!isAuthenticated || !user) {
        return null;
    }

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

                {gameData ? (
                    <div>
                        {JSON.stringify(gameData)}
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Profile;