document.addEventListener('DOMContentLoaded', () => {
    const apiBase = 'http://localhost:3000/api';

    // Event Handlers for Authentication
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                const response = await fetch(`${apiBase}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                });
                const data = await response.json();
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            } catch (err) {
                console.error(err);
            }
        });
    }

    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            try {
                await fetch(`${apiBase}/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });
                window.location.href = 'login.html';
            } catch (err) {
                console.error(err);
            }
        });
    }

    // Event Handlers for Events
    if (document.getElementById('events-list')) {
        const fetchEvents = async () => {
            try {
                const response = await fetch(`${apiBase}/events`);
                const events = await response.json();
                const eventsList = document.getElementById('events-list');
                events.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.innerHTML = `
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                        <a href="event-details.html?id=${event._id}">View Details</a>
                    `;
                    eventsList.appendChild(eventItem);
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchEvents();
    }

    if (document.getElementById('all-events-list')) {
        const fetchAllEvents = async () => {
            try {
                const response = await fetch(`${apiBase}/events`);
                const events = await response.json();
                const allEventsList = document.getElementById('all-events-list');
                events.forEach(event => {
                    const eventItem = document.createElement('div');
                    eventItem.innerHTML = `
                        <h3>${event.title}</h3>
                        <p>${event.description}</p>
                        <a href="event-details.html?id=${event._id}">View Details</a>
                    `;
                    allEventsList.appendChild(eventItem);
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchAllEvents();
    }

    if (document.getElementById('event-title')) {
        const fetchEventDetails = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const eventId = urlParams.get('id');
            try {
                const response = await fetch(`${apiBase}/events/${eventId}`);
                const event = await response.json();
                document.getElementById('event-title').innerText = event.title;
                document.getElementById('event-description').innerText = event.description;
                document.getElementById('event-date').innerText = new Date(event.date).toLocaleDateString();
                document.getElementById('event-created-by').innerText = event.createdBy.username;
                document.getElementById('rsvp-button').addEventListener('click', async () => {
                    try {
                        const token = localStorage.getItem('token');
                        await fetch(`${apiBase}/events/${eventId}/rsvp`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        alert('RSVP successful');
                    } catch (err) {
                        console.error(err);
                    }
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchEventDetails();
    }
});
