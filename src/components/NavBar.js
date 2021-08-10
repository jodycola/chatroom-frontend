import React from 'react'
import { useHistory } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi'
import styled from 'styled-components';

export default function NavBar({ currentUser, setCurrentUser }) {

    // State and variables
    const history = useHistory();
    const room = (new URLSearchParams(window.location.search)).get('room');

    // Logs a user out and removes local stroage token
    const handleLogout = () => {
        localStorage.removeItem("token")
        setCurrentUser(null)
        history.push(`/`)
    }

    return (
        <NavBarStyled>
        <div className='navbar'>
          <span className="room-title">{room}</span>
          
            {!currentUser ? null : 
            <div className='settings'>
                <BiArrowBack className='back' size='14px' onClick={handleLogout}/>
                <span className='user'>{currentUser.name} </span>
            </div>
            }
        </div>
        </NavBarStyled>
    )
}

// opacity: 0;
// box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
// visibility: hidden;
// transform: translateY(-20px);
// transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;

const NavBarStyled = styled.div`
.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    max-height: 75px;
    border-bottom: 2px #FFF solid;
}

.room-title {
    padding-left: 25px;
    text-transform: capitalize;
    font-size: 50px;
    color: #FFF;
    font-family: Georgia;
    font-weight: bold
}

.settings {
    position: relative;
    top: 20px;
    padding-right: 20px;
    float: right;
    color: #FFF;
    font-size: 24px;
}
`
