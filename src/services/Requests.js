// URL to API whether in production or development
const api = `${process.env.REACT_APP_API}` || 'http://localhost:3000/';

const authenticateUserFetch = (token) => {
    return fetch(api + 'auth', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => response.json());
}

const populateRoomSeletionsFetch = () => {
    return fetch(api + 'rooms')
    .then(response => response.json());
}

const loginFetch = (login) => {
    return fetch(api + 'login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login}),
    })
}

export {
    authenticateUserFetch,
    populateRoomSeletionsFetch,
    loginFetch
}