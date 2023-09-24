const App = document.querySelector('.App');
const $roomBtn = document.querySelector('#room-make');
const nickname = document.querySelector('.Nickname');

const nicknameForm = document.querySelector('.Nickname-form');
const $nicknameInput = document.querySelector('#nickname-input');

let state = {
    members: [],
    textareaData: '',
};

if (window.localStorage.getItem('room')) {
    const temp = document.createElement('div');
    temp.innerHTML = 'editor room이 존재합니다. 닉네임으로 접속해보세요.';
    temp.style.color = 'red';
    App.insertBefore(temp, App.firstChild);
    $roomBtn.style.display = 'none';
} else {
    nickname.style.display = 'none';
}

$roomBtn.addEventListener('click', () => {
    window.localStorage.setItem('room', JSON.stringify(state));
    $roomBtn.style.display = 'none';
    nickname.style.display = 'block';
});

const handleNicknameForm = (value) => {
    const $warn = document.querySelector('#warn');
    let localData = JSON.parse(window.localStorage.getItem('room'));
    let membersNickname = localData.members.map((member) => member.nickname);
    if (value == '') {
        $warn.innerHTML = '닉네임을 입력하세요!';
    } else if (membersNickname.includes(value)) {
        $warn.innerHTML = '닉네임이 중복됩니다!';
    } else {
        localData = {
            ...localData,
            members: [...localData.members, { nickname: value, x: 8, y: 10 }],
        };
        window.localStorage.setItem('room', JSON.stringify(localData));
        window.location.href =
            window.location.origin + `/room.html?nickname=${value}`;
    }
};

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleNicknameForm($nicknameInput.value);
});
