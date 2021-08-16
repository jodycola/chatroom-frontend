// URL to API whether in production or development
const api = 'http://localhost:3000/';

const authenticateUserFetch = (token) => {
    return fetch(api + 'auth', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then(response => response.json());
}

const currentRoomFetch = (room) => {
    return fetch(api + 'room/' + room)
    .then(response => response.json());
}

const populateRoomSeletionsFetch = () => {
    return fetch(api + 'rooms')
    .then(response => response.json());
}

const createMessageFetch = (message, user, room) => {
    return fetch(api + 'add', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, user, room })
    })
    .then(response => response.json())
}

const loginFetch = (login) => {
    return fetch(api + 'login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(login),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then((data) => {throw data;})
        }
    })
}

const signupFetch = (signup) => {
    return fetch(api + 'signup', {
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
}

export {
    authenticateUserFetch,
    currentRoomFetch,
    populateRoomSeletionsFetch,
    createMessageFetch,
    loginFetch,
    signupFetch
}