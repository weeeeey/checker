const roomCreateBtn = document.getElementById('room_create');
const roomsId = document.getElementById('rooms');
const a = document.createElement('div');

const roomsList = ['first room', 'second room', 'third room'];
roomsList.forEach((room) => {
    liRoom = document.createElement('div');
    liRoom.className = 'room_list';
    liRoom.innerHTML = room;
    roomsId.appendChild(liRoom);
});
