const url = new URL(window.location.href);
let currntUser = url.searchParams.get('nickname');

let localData = JSON.parse(window.localStorage.getItem('room'));
let members = localData.members;
let textareaData = localData.textareaData;

if (!currntUser) {
    console.log('로그인 하세요.'); //alert 창으로 대체 할 것
    window.location.href = window.location.origin + `/index.html`;
}
if (!members.some((member) => member.nickname === currntUser)) {
    console.log('닉네임이 존재하지 않습니다.'); //alert 창으로 대체 할 것
    window.location.href = window.location.origin + `/index.html`;
}

const $editorContainer = document.querySelector('#editorContainer');
const members_form = document.querySelector('.members-form');
const cursor = document.createElement('div');

$editorContainer.value = textareaData;

window.addEventListener('storage', (e) => {
    if (e.key == 'room') {
        const newData = JSON.parse(e.newValue);
        const newMembers = newData.members;

        if (newMembers.length != members.length) {
            const addedMember = newMembers[members.length];
            members.append(addedMember);
        } else {
            $editorContainer.value = newData.textareaData;
            textareaData = newData.textareaData;
        }
    }
});

$editorContainer.addEventListener('input', () => {
    let state = {
        members,
        textareaData: $editorContainer.value,
    };
    window.localStorage.setItem('room', JSON.stringify(state));
});

$editorContainer.selectionStart = 10;
$editorContainer.selectionEnd = 10;
