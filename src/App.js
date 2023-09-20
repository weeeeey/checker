export default function App($app) {
    // Initialize your state here if needed
    // const state = {
    //     room: '',
    //     currentUser: {
    //         name: '',
    //         cursor: 0,
    //     },
    //     members: [],
    //     text: '',
    // };

    const $target = document.createElement('div');
    $target.className = 'Nickname';
    $app.append($target);

    const render = () => {
        $target.innerHTML = `
            <h2>닉네임 설정</h2>
            <hr style="width: 100%" />
            <div class="Nickname-form">
                <input
                    id="nickname-input"
                    type="text"
                    placeholder="닉네임을 입력하세요."
                    style="padding: 5px"
                />
                <button id="nickname-entry">입장</button>
            </div>
        `;
    };

    // Render the initial content
    render();

    return {
        // You can expose any functions or properties here if needed
        // getState: () => state,
        // updateState: (newState) => { ... },
    };
}
