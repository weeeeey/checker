export default function App($app) {
    // Initialize your state here if needed
    this.state = {
        isRoom: false,
        currentUser: {
            name: '',
            cursor: 0,
        },
        members: [],
        text: '',
    };
    const $room_make_btn = document.getElementById('room-make');
    $room_make_btn.addEventListener('click', () => {
        this.state.isRoom = true;

        window.localStorage.setItem('room', JSON.stringify(this.state));
    });
    this.localStorage = JSON.parse(window.localStorage.getItem('room'));
    console.log(this.localStorage);
    // const $target = document.createElement('div');
    // $target.className = 'Nickname';
    // $app.append($target);

    // this.render = () => {
    //     $target.innerHTML = `
    //         <h2>닉네임 설정</h2>
    //         <hr style="width: 100%" />
    //         <div class="Nickname-form">
    //             <input
    //                 id="nickname-input"
    //                 type="text"
    //                 placeholder="닉네임을 입력하세요."
    //                 style="padding: 5px"
    //             />
    //             <button id="nickname-entry">입장</button>
    //         </div>
    //     `;
    // };

    // // Render the initial content
    // this.render();
}
