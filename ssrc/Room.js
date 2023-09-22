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
