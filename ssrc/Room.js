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

const createMarker = () => {
    const marker = document.createElement('div');
    marker.className = cursor - marker;
    marker.textContent = currntUser;
    return marker;
};

const getCursorXY = (input, selectionPoint) => {
    const { offsetLeft: inputX, offsetTop: inputY } = input;
    const div = document.createElement('div');
    const copyStyle = getComputedStyle(input);
    for (const prop of copyStyle) {
        div.style[prop] = copyStyle[prop];
    }
    const swap = '.';
    const inputValue =
        input.tagName === 'INPUT'
            ? input.value.replace(/ /g, swap)
            : input.value;
    // set the div content to that of the textarea up until selection
    const textContent = inputValue.substr(0, selectionPoint);
    // set the text content of the dummy element div
    div.textContent = textContent;
    if (input.tagName === 'TEXTAREA') div.style.height = 'auto';
    // if a single line input then the div needs to be single line and not break out like a text area
    if (input.tagName === 'INPUT') div.style.width = 'auto';
    // create a marker element to obtain caret position
    const span = document.createElement('span');
    // give the span the textContent of remaining content so that the recreated dummy element is as close as possible
    span.textContent = inputValue.substr(selectionPoint) || '.';
    // append the span marker to the div
    div.appendChild(span);
    // append the dummy element to the body
    document.body.appendChild(div);
    // get the marker position, this is the caret position top and left relative to the input
    const { offsetLeft: spanX, offsetTop: spanY } = span;
    // lastly, remove that dummy element
    // NOTE:: can comment this out for debugging purposes if you want to see where that span is rendered
    document.body.removeChild(div);
    // return an object with the x and y of the caret. account for input positioning so that you don't need to wrap the input
    return {
        x: inputX + spanX,
        y: inputY + spanY,
    };
};
