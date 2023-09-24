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

$editorContainer.value = textareaData;
member_alarm.innerHTML = `${
    members[members.length - 1].nickname
} 님이 입장했습니다.`;
members.forEach((member) => {
    const element = document.createElement('div');
    element.innerHTML = member.nickname;
    member_list.append(element);
});

// ******  커서 마커 구현 부분  *********

const setMemberPosition = (x, y) => {
    for (let i = 0; i < members.length; i++) {
        if (members[i].nickname === currntUser) {
            members[i].x = x;
            members[i].y = y;
            break;
        }
    }
};
const createMarker = (nickname) => {
    const marker = document.createElement('div');
    marker.className = 'cursor-marker';
    marker.textContent = nickname;
    return marker;
};

// textarea End Cursor 위치를 통해 마커가 표시 될 x,y 값 구하기
const getCursorXY = (text, selectionEndPoint) => {
    const { offsetTop: textTop, offsetLeft: textLeft } = text;
    const tempP = document.createElement('p');
    const copyStyle = getComputedStyle(text);
    for (let prop of copyStyle) {
        tempP.style[prop] = copyStyle[prop];
    }
    const textValue = text.value;
    const selectedTextContent = textValue.substr(0, selectionEndPoint);
    tempP.textContent = selectedTextContent;
    tempP.style.height = 'auto';

    const tempSpan = document.createElement('span');
    tempSpan.textContent = textValue.substr(selectionEndPoint);
    tempP.appendChild(tempSpan);
    document.body.appendChild(tempP);
    const { offsetTop: tempTop, offsetLeft: tempLeft } = tempSpan;
    document.body.removeChild(tempP);

    const x = textTop + tempTop;
    const y = textLeft + tempLeft;
    setMemberPosition(x, y);

    return { x, y };
};

const showingCursor = (text) => {
    const {
        offsetTop,
        offsetLeft,
        offsetHeight,
        offsetWidth,
        scrollTop,
        scrollLeft,
    } = text;

    const { lineHeight, paddingRight } = getComputedStyle(text);
    const members = JSON.parse(window.localStorage.getItem('room')).members;
    for (const member of members) {
        const { x, y } = member;
        // left position에 대해 left position의 최대값은 text 가로폭 - right 패딩값
        // text의 현재 가로 스크롤 값도 계산
        const newLeft = Math.min(
            x - scrollLeft,
            offsetLeft + offsetWidth - parseInt(paddingRight, 10)
        );
        // top position에 대해 최대값은 text 높이 - line 높이
        // text의 세로 스크롤 값 위치도 계산
        const newTop = Math.min(
            y - scrollTop,
            offsetTop + offsetHeight - parseInt(lineHeight, 10)
        );
        text._MARKER = createMarker(member.nickname);
        text.appendChild(text._MARKER);
        text._MARKER.setAttribute(
            'style',
            `left:${newLeft}px ; top:${newTop}px `
        );
    }
};

// showingCursor($editorContainer);

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
        } else {
            $editorContainer.value = JSON.parse(
                window.localStorage.getItem('room')
            ).textareaData;
        }
    }
});

$editorContainer.addEventListener('input', () => {
    getCursorXY($editorContainer, $editorContainer.selectionEnd);

    let state = {
        members,
        textareaData: $editorContainer.value,
    };
    window.localStorage.setItem('room', JSON.stringify(state));
    showingCursor($editorContainer);
});

$editorContainer.addEventListener('click', () => {
    getCursorXY($editorContainer, $editorContainer.selectionEnd);
    let state = {
        members,
        textareaData: $editorContainer.value,
    };
    window.localStorage.setItem('room', JSON.stringify(state));
    showingCursor($editorContainer);
});
