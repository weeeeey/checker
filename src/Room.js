function saveMessage(message) {
    var messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push(message);
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// 로컬 스토리지에서 메시지 불러오기
function loadMessages() {
    return JSON.parse(localStorage.getItem('chatMessages')) || [];
}

// 새 메시지를 입력한 후 저장
var messageInput = document.getElementById('messageInput');
var sendButton = document.getElementById('sendButton');

sendButton.addEventListener('click', function () {
    var message = messageInput.value;
    saveMessage(message);
    messageInput.value = ''; // 입력 필드 비우기
    displayMessages();
});

function watchInputValue(inputId, callback) {
    const inputElement = document.getElementById(inputId);

    // Add an event listener to the input element
    inputElement.addEventListener('input', function () {
        const value = inputElement.value;
        callback(value);
    });
}

// 메시지를 화면에 표시
function displayMessages() {
    var messageContainer = document.getElementById('messageContainer');
    var messages = loadMessages();
    const messageInput = document.getElementById('messageInput');

    messageInput.addEventListener('change', () => {
        saveMessage(messageInput.value);
        displayMessages();
    });
    watchInputValue(messageInput, () => {
        saveMessage(messageInput.value);
        displayMessages();
    });

    messageContainer.innerHTML = '';
    messages.forEach(function (message) {
        var messageElement = document.createElement('div');
        messageElement.textContent = message;
        messageContainer.appendChild(messageElement);
    });
}

// 페이지 로드 시 메시지 표시
window.addEventListener('load', function () {
    displayMessages();
});

export default function Room($app, initialMembers) {
    console.log(initialMembers);

    this.$textarea = document.createElement('textarea');
    this.$textarea.id = 'editorContainer';
    this.$textarea.rows = '32';
    this.$textarea.cols = '60';

    this.members = document.createElement('div');
    this.members.className = 'members';
    this.members.innerHTML = `
            <div style="padding: 10px 4px">참여자 목록</div>
            <hr style="width: 100%; border: 1; margin: 0" />
            <div class="members-form">
                ${initialMembers.map((name) => `<div>${name}</div>`).join('')}
                <div class="member-entry"></div>
            </div>
    `;

    function handleStorageChange(event) {
        if (event.key === 'room') {
            const newValue = JSON.parse(event.newValue);
            const newMember = newValue.members[newValue.members.length - 1];

            console.log('members가 변경되었습니다:', newMember);
        }
    }

    // storage 이벤트 리스너 등록
    window.addEventListener('storage', handleStorageChange);

    this.render = () => {
        $app.innerHTML = '';
        $app.append(this.$textarea);
        $app.append(this.members);
    };
    this.render();
}
// <!-- <textarea
//                 id="editorContainer"
//                 rows="32"
//                 cols="60"
//             ></textarea>
//             <div class="members">
//                 <div style="padding: 10px 4px">참여자 목록</div>
//                 <hr style="width: 100%; border: 1; margin: 0" />
//                 <div class="members-form">
//                     <li class="member-list">asd</li>
//                     <span class="member-alarm">asd 입장</span>
//                 </div>
//             </div> -->
