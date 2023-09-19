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
