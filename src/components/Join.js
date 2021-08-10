import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export default function Join({ currentUser, setCurrentUser }) {

    // States and variables
    const [login, setLogin] = useState({ name: "", password: "", room: "General" })
    const [signup, setSignup] = useState({ name: "", password: "", verify: "" })
    const [roomArray, setRoomArray] = useState([]);
    const [errors, setErrors] = useState([]);
    const [front, setFront] = useState(false);

    // Router hooks
    const history = useHistory();

    // Fetches a list of rooms
    // Returns dropdown select options
    useEffect(() => {
    fetch(`${process.env.REACT_APP_API}rooms`)
        .then(res => res.json())
        .then(data => setRoomArray(data))
    }, [setRoomArray]);
    
    const listRooms = roomArray.map((room) => {
        return <option key={room.id} value={room.title}>{room.title}</option>
    }, []);


    // Transition handler for CSS animation
    const flip = (e) => {
        setFront(!front);
        setLogin({ name: "", password: "", room: "General" });
        setSignup({ name: "", password: "", verify: "" });
        setErrors([]);
    }

    // Login handler put into custom hooks
    const handleLogin = (e) => {
        e.preventDefault();
        fetch(`${process.env.REACT_APP_API}login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login),
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then((data) => {
                    throw data;
                })
            }
          })
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

    // Signup handler
    const handleSignup = (e) => {
        e.preventDefault();
        if ( signup.password === signup.verify ) {
            fetch(`${process.env.REACT_APP_API}signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup),
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    return res.json().then((data) => {
                        throw data;
                    });
                }
            })
            setSignup({ name: "", password: "", verify: "" });
            setFront(!front);
        }
        else
            setErrors(["The passwords you entered did not match"])
    };

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
                        onClick={(e) => flip(e)}
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
                        onClick={(e) => flip(e)}
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

// CSS
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
