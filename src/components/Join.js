import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { populateRoomSeletionsFetch, loginFetch, signupFetch } from '../services/Requests';

export default function Join({ currentUser, setCurrentUser }) {

    // STATES AND VARIABLES
    const [front, setFront] = useState(false);
    const [roomArray, setRoomArray] = useState([]);
    const [login, setLogin] = useState({ name: "", password: "", room: "General" })
    const [signup, setSignup] = useState({ name: "", password: "", verify: "" })
    const [errors, setErrors] = useState([]);


    // HISTORY HOOK NAVIGATES PAGES
    const history = useHistory();


    // POPULATES DROPDOWN ROOM SELECTIONS
    useEffect(() => {
    let mounted = true;

    populateRoomSeletionsFetch().then(data => {
        if (mounted) setRoomArray(data)
    })
        return () => { mounted = false };
    }, [setRoomArray]);
    
    const listRooms = roomArray.map((room) => {
        return <option key={room.id} value={room.title}>{room.title}</option>
    }, []);


    // LOGIN HANDLER
    const handleLogin = (e) => {
        e.preventDefault();
        loginFetch(login)
        .then(data => { 
            setCurrentUser(data.user);
            localStorage.setItem("token", data.token);
            history.push(`/chat?&room=${login.room}`);
            setLogin({
                name: "",
                password: "",
                room: "General"
            })
        })
        .catch(data => {
            setErrors(data.errors);
        })
    };


    // SIGNUP HANDLER
    const handleSignup = (e) => {
        e.preventDefault();
        if ( signup.password === signup.verify ) {
            signupFetch(signup)
            setSignup({ name: "", password: "", verify: "" });
            setFront(!front);
        }
        else
            setErrors(["The passwords you entered did not match"])
    };

    // STYLING HANDLER TOGGLE LOGIN/SIGNUP FORMS
    const flipCard = (e) => {
        setFront(!front);
        setLogin({ name: "", password: "", room: "General" });
        setSignup({ name: "", password: "", verify: "" });
        setErrors([]);
    }

    return (
        <JoinStyled>
            <div className={`card ${front ? "is-flipped" : ""}`}>
                <div className="card__face card__face--front">
                    <div className="inner">
                        <h1> Let's Chat </h1>
                        <form onSubmit={handleLogin}>
                        <input 
                            placeholder="Name" 
                            className="input"
                            name="name"
                            type="text"
                            value={login.name}
                            onChange={(e) => setLogin({
                                ...login, [e.target.name]: e.target.value})}
                        />

                        <input 
                            placeholder="Password" 
                            className="input"
                            name="password"
                            type="password"
                            value={login.password}
                            onChange={(e) => setLogin({
                                ...login, [e.target.name]: e.target.value})}
                        />

                        <select
                            className="select"
                            name="room"
                            value={login.room}
                            onChange={(e) => setLogin({
                                ...login, [e.target.name]: e.target.value})}
                        >
                        {listRooms}
                        </select>

                        {errors.map((error) => (
                        <p key={error} style={{ color: "red" }}>
                            {error}
                        </p>))}

                        <button 
                            className="button mt-20" 
                            type="submit"
                        >
                        LOG IN
                        </button>
                        </form>

                        <button
                            onClick={(e) => flipCard(e)}
                            className="button mt-20"
                            style={{background: "#16D400"}}
                            type="submit"
                        >
                        SIGN UP
                        </button>
                    </div>
                </div>

                <div className="card__face card__face--back">
                    <div className="inner">
                        <h1> Sign up here </h1>
                        <form onSubmit={handleSignup}>
                        <input 
                            placeholder="Name" 
                            className="input"
                            name="name"
                            type="text"
                            value={signup.name}
                            onChange={(e) => setSignup({
                                ...signup, [e.target.name]: e.target.value})}
                        />

                        <input 
                            placeholder="Password" 
                            className="input"
                            name="password"
                            type="password"
                            value={signup.password}
                            onChange={(e) => setSignup({
                                ...signup, [e.target.name]: e.target.value})}
                        />

                        <input 
                            placeholder="Verify Password" 
                            className="input"
                            name="verify"
                            type="password"
                            value={signup.verify}
                            onChange={(e) => setSignup({
                                ...signup, [e.target.name]: e.target.value})}
                        />

                        {errors.map((error) => (
                        <p key={error} style={{ color: "red" }}>
                            {error}
                        </p>))}

                        <button 
                            className="button mt-20" 
                            type="submit"
                        >
                        SIGN UP
                        </button>
                        </form>

                        <button
                            onClick={(e) => flipCard(e)}
                            className="button mt-20"
                            style={{background: "#F97C00"}}
                            type="submit"
                        >
                        LOG IN
                        </button>
                    </div>
                </div>
            </div>
        </JoinStyled>
    )
}

// STYLED COMPONENTS
const JoinStyled = styled.div`
* {
    box-sizing: border-box;
}

.card {
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
}

.card.is-flipped {
  transform: rotateY(180deg);
}

.card__face {
    position: absolute;
    left: 40%;
    width: 40vh;
    height: 100vh;
    display: flex;
    justifiy-content: center;
    text-align: center;
    align-items: center;
    background-color: #1A1A1D;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}

.card__face--back {
  transform: rotateY(180deg);
}

.input {
    margin-top: 5px;
    padding: 15px 15px;
    width: 100%;
}

.select {
    margin-top: 5px;
    width: 100%;
    padding: 15px 15px;
}

h1 {
    color: #FFF;
    font-size: 2.5rem;
    padding-bottom: 10px;
    border-bottom: 2px solid #FFF;
}

button {
    margin-top: 20px;
    color: #FFF !important;
    background: #2979FF;
    padding: 20px;
    border-radius: 10px;
    display: inline-block;
    border: none;
    width: 100%;
}

button:hover {
    background: #6ba2ff;
}

@media (min-width: 320px) and (max-width: 480px) {
    .outer {
        height: 100%;
        width: 100%;
    }
}
`
