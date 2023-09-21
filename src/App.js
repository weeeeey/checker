import RoomButton from './RoomButton.js';
import Nickname from './Nickname.js';
import Room from './Room.js';

export default function App($app) {
    // Initialize your state here if needed
    this.state = {
        currentUser: {
            name: '',
            cursor: 0,
        },
        members: [],
        text: '',
    };

    // Check if 'room' key exists in localStorage and set the isRoom state accordingly
    if (window.localStorage.getItem('room')) {
        this.state = JSON.parse(window.localStorage.getItem('room'));
    } else {
        // If 'room' key doesn't exist, create a RoomButton instance
        const roomButton = new RoomButton($app);
        roomButton.render();
    }

    document.addEventListener('roomButtonClicked', () => {
        // Update the state to set isRoom to true
        this.state.isRoom = true;
        // Save the updated state in localStorage
        window.localStorage.setItem(
            'room',
            JSON.stringify({ members: [], text: '' })
        );
        // Render the Nickname content
        renderNicknameContent();
    });

    // Function to render the Nickname content
    const renderNicknameContent = () => {
        const handleNicknameSubmit = (value) => {
            this.state = {
                ...this.state,
                currentUser: {
                    name: value,
                    cursor: 0,
                },
                members: [...this.state.members, value],
            };
            window.localStorage.setItem(
                'room',
                JSON.stringify({
                    members: this.state.members,
                    text: this.state.text,
                })
            );
        };
        const nickname = new Nickname($app, handleNicknameSubmit);
        nickname.render();
    };
    const renderRoom = () => {
        const room = new Room($app, this.state.members);
        room.render();
    };

    // If isRoom is true, show Nickname content; otherwise, show the RoomButton
    if (this.state.isRoom) {
        renderNicknameContent();
    }
    if (this.state.currentUser.name) {
        renderRoom();
    }
}
