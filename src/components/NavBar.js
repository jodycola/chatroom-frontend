import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { BiArrowBack } from 'react-icons/bi'

export default function NavBar({ currentUser, setCurrentUser }) {

    // STATES AND VARIABLES
    const history = useHistory();
    const room = (new URLSearchParams(window.location.search)).get('room');

    // LOGOUT HANDLER, REMOVE TOKEN, PUSH HISTORY TO HOME PAGE
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

// STYLED COMPONENTS
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
