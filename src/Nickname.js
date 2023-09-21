export default function Nickname($app, onSubmit) {
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
                <button id="nickname-entry">입장</button>
            </form>
        `;
        const form = this.$target.querySelector('.Nickname-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = this.$target.querySelector('#nickname-input');
            const nickname = input.value.trim();

            if (nickname !== '') {
                // Call the onSubmit callback with the entered nickname
                onSubmit(nickname);
            }
        });

        $app.innerHTML = '';
        $app.append(this.$target);
    };

    // Render the initial Nickname content
    this.render();
}
