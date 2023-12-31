export default function Nickname($app, onSubmit) {
    this.initialState = JSON.parse(window.localStorage.getItem('room')).members;

    this.$target = document.createElement('div');
    this.$target.className = 'Nickname';

    this.render = () => {
        this.$target.innerHTML = `
            <h2>닉네임 설정</h2>
            <hr style="width: 100%" />
            <form  class="Nickname-form">
                <input
                    id="nickname-input"
                    type="text"
                    placeholder="닉네임을 입력하세요."
                    style="padding: 5px"
                />
                <div class="Warn"></div>
                <button id="nickname-entry">입장</button>
            </form>
        `;
        const form = this.$target.querySelector('.Nickname-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = this.$target.querySelector('#nickname-input');
            const nickname = input.value.trim();

            const warn = this.$target.querySelector('.Warn');

            if (nickname === '') {
                warn.innerHTML = '닉네임을 입력하세요';
            } else if (this.initialState.includes(nickname)) {
                warn.innerHTML = '닉네임이 중복됩니다.';
            } else {
                onSubmit(nickname);
                warn.innerHTML = '';
            }
        });

        $app.innerHTML = '';
        $app.append(this.$target);
    };

    // Render the initial Nickname content
    this.render();
}
