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

// 마커 랜덤 색

const getCursorXY = (text, selectionPoint) => {
    const { offsetLeft: textX, offsetTop: textY } = text;
    const p = document.createElement('p');
    const copyStyle = getComputedStyle(text);
    for (const prop of copyStyle) {
        p.style[prop] = copyStyle[prop];
    }

    const textValue = text.value;
    const textContent = textValue.substr(0, selectionPoint);
    p.textContent = textContent;
    p.style.height = 'auto';

    const span = document.createElement('span');
    span.textContent = textValue.substr(selectionPoint) || '.';
    p.appendChild(span);
    document.body.appendChild(p);
    const { offsetLeft: spanX, offsetTop: spanY } = span;
    document.body.removeChild(p);

    members.forEach((member) => {
        if (member.nickname === currntUser) {
            member.x = textX + spanX;
            member.y = textY + spanY;
        }
    });
};

const createMarker = (content) => {
    const marker = document.createElement('span');
    marker.className = `text__marker ${content}`;
    marker.textContent = content;

    return marker;
};

const showMarker = (text) => {
    const {
        offsetLeft,
        offsetTop,
        offsetHeight,
        offsetWidth,
        scrollLeft,
        scrollTop,
    } = text;
    const { lineHeight, paddingRight } = getComputedStyle(text);

    for (const member of members) {
        if (member.nickname === currntUser) {
            continue;
        }
        const { x, y } = member;
        if (x === 0 && y === 0) {
            continue;
        }

        const existingMarker = document.querySelector(
            `.text__marker.${member.nickname}`
        );
        if (existingMarker) {
            document.body.removeChild(existingMarker);
        }

        text.__MARKER = createMarker(member.nickname);
        document.body.appendChild(text.__MARKER);

        const newLeft = Math.min(
            x - scrollLeft,
            offsetLeft + offsetWidth - parseInt(paddingRight, 10)
        );
        const newTop = Math.min(
            y - scrollTop,
            offsetTop + offsetHeight - parseInt(lineHeight, 10)
        );

        text.__MARKER.setAttribute(
            'style',
            `left: ${newLeft}px; top: ${newTop}px; `
        );
        const tempSpan = document.createElement('span');
        tempSpan.className = 'text__marker__arrow';
        text.__MARKER.append(tempSpan);
    }
};

window.addEventListener('load', () => {
    $editorContainer.value = textareaData;
    member_alarm.innerHTML = `${
        members[members.length - 1].nickname
    } 님이 입장했습니다.`;
    members.forEach((member) => {
        const element = document.createElement('div');
        element.innerHTML = member.nickname;
        member_list.append(element);
    });
    showMarker($editorContainer);
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
        } else {
            const temp = JSON.parse(window.localStorage.getItem('room'));
            $editorContainer.value = temp.textareaData;
            members = JSON.parse(JSON.stringify(temp.members));
            showMarker($editorContainer);
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
});

$editorContainer.addEventListener('click', () => {
    getCursorXY($editorContainer, $editorContainer.selectionEnd);
    let state = {
        members,
        textareaData: $editorContainer.value,
    };
    window.localStorage.setItem('room', JSON.stringify(state));
    showMarker($editorContainer);
});
