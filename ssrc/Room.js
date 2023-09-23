const url = new URL(window.location.href);
let currntUser = url.searchParams.get('nickname');

if (!window.localStorage.getItem('room')) {
    window.location.href = window.location.origin;
    console.log('방을 만드세요.');
}
let localData = JSON.parse(window.localStorage.getItem('room'));
let members = localData.members;
let textareaData = localData.textareaData;

if (!currntUser) {
    window.location.href = window.location.origin + `/index.html`;
    console.log('로그인 하세요.'); //alert 창으로 대체 할 것
}
if (!members.some((member) => member.nickname === currntUser)) {
    window.location.href = window.location.origin + `/index.html`;
    console.log('닉네임이 존재하지 않습니다.'); //alert 창으로 대체 할 것
}

const $editorContainer = document.querySelector('#editorContainer');
const members_form = document.querySelector('.members-form');
const member_list = document.querySelector('.member-list');
const member_alarm = document.querySelector('.member-alarm');

const cursor_marker = document.createElement('span');
cursor_marker.className = 'cursor-marker';

$editorContainer.value = textareaData;
member_alarm.innerHTML = `${
    members[members.length - 1].nickname
} 님이 입장했습니다.`;
members.forEach((member) => {
    const element = document.createElement('div');
    element.innerHTML = member.nickname;
    member_list.append(element);
});

window.addEventListener('storage', (e) => {
    if (e.key == 'room') {
        const newData = JSON.parse(e.newValue);
        const newMembers = newData.members;

        if (newMembers.length != members.length) {
            const addedMember = newMembers[members.length];
            members.push(addedMember);

            const element = document.createElement('div');
            element.innerHTML = addedMember.nickname;
            member_list.append(element);

            member_alarm.innerHTML = '';
            member_alarm.innerHTML = `${addedMember.nickname} 님이 입장했습니다.`;
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

// 커서 마커
const createMarker = () => {
    const marker = document.createElement('div');
    marker.offsetTop;
    marker.offsetLeft;
    marker.className = 'cursor-marker';
    marker.textContent = currntUser;
    return marker;
};

// textarea End Cursor 위치를 통해 마커가 표시 될 x,y 값 구하기
const getCursorXY = (text, selectionEndPoint) => {
    const { offsetTop: textTop, offsetLeft: textLeft } = text;
    const tempDiv = document.createElement('div');
    const copyStyle = getComputedStyle(text);
    for (let prop of copyStyle) {
        tempDiv.style[prop] = copyStyle[prop];
    }
    const textValue = text.value;
    const selectedTextContent = textValue.substr(0, selectionEndPoint);
    tempDiv.textContent = selectedTextContent;
    tempDiv.style.height = 'auto';

    const tempSpan = document.createElement('span');
    tempSpan.textContent = textValue.substr(selectionEndPoint);
    tempDiv.appendChild(tempSpan);
    document.body.appendChild(tempDiv);
    const { offsetTop: tempTop, offsetLeft: tempLeft } = tempSpan;
    document.body.removeChild(tempDiv);

    const x = textTop + tempTop;
    const y = textLeft + tempLeft;
    for (let i = 0; i < members.length; i++) {
        if (members[i].nickname === currntUser) {
            members[i].x = x;
            members[i].y = y;
            break;
        }
    }

    return { x, y };
};
