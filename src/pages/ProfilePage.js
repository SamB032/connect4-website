import {useAuth0} from '@auth0/auth0-react';
import {useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {getGameData} from '../helpers/ConnectorAPI';
import GameHistory from '../components/gameHistory'
import gameSidebar from '../helpers/gameSidebar';
import '../styles/Profile.css' 


function Profile(){
    const [gameData, setGameData] = useState(null);
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            // If not authenticated, redirect to the login page
            navigate('/');
        }
    }, [isAuthenticated, isLoading, navigate]);

    useEffect(() => {
        const fetchGameData = async (userID) => {
        try {
            const data = await getGameData(userID);
            setGameData(data.reverse());
            } catch (error) {
            console.error(error);
            }
        };

        if (user && isAuthenticated) {
            // Fetch game data if user is authenticated and user object is available
            fetchGameData(user.sub);
        }
    }, [user, isAuthenticated]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
        // User is not authenticated, redirect to login
        loginWithRedirect();
        return null;
    }

    if (!user || !gameData) {
        return <p>User not found. Please try again later.</p>;
    }

    // Call gameSidebar to get the sidebar array when gameData is available
    const sidebarArr = gameSidebar(gameData);

    //Calculates the win loss percentage - excluding draw's
    const wlRatio = (numberOfWins, numberOfLosses) => {
        if (numberOfLosses === 0) {
            return numberOfWins.toFixed(2);
        }
        return String((numberOfWins / numberOfLosses).toFixed(2));
    }

    return (        
        <div className="profile">
           {/* Contains the name and profile picture */}
            <div className="sidebar">

                {user.picture && <img className="picture" src={user.picture} alt="Profile" />}

                <p className="name">{user.name}</p>

                <div className="brief-history">
                    <div className="difficulty-item">
                        <p className="difficulty-name">Easy</p>
                        <p className="wdl">{sidebarArr[0].join(" ")}</p>
                        <p className="ratio">WL: {wlRatio(sidebarArr[0][0], sidebarArr[0][2])}</p>
                    </div>
                    
                    <hr className="divider"/>
                    
                    <div className="difficulty-item">
                        <p className="difficulty-name">Medium</p>
                        <p className="wdl">{sidebarArr[1].join(" ")}</p>
                        <p className="ratio">WL: {wlRatio(sidebarArr[1][0], sidebarArr[1][2])}</p>
                    </div>
            
                    <hr className="divider"/>

                    <div className="difficulty-item">
                        <p className="difficulty-name">Hard</p>
                        <p className="wdl">{sidebarArr[2].join(" ")}</p>
                        <p className="ratio">WL: {wlRatio(sidebarArr[2][0], sidebarArr[2][2])}</p>
                    </div>
                </div>
            </div>

            {/* Contains statistics and game history */}
            <div className="game">
                <p className="history-head">Game History</p>
                <hr className="divider-bold"/>

                <div className="games-scrollable">
                    {gameData ? (
                        <GameHistory gameData={gameData} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profile;