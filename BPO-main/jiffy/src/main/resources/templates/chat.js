document.addEventListener("DOMContentLoaded", function () {
    let socket = new SockJS('/chat-websocket');
    let stompClient = Stomp.over(socket);
    let messagesDiv = document.getElementById("messages");
    let messageInput = document.getElementById("messageInput");
    let sendButton = document.getElementById("sendButton");

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/messages', function (messageOutput) {
            let message = JSON.parse(messageOutput.body);
            let messageElement = document.createElement("div");
            messageElement.classList.add("p-2", "my-2", "bg-gray-600", "rounded");
            messageElement.textContent = message;
            messagesDiv.appendChild(messageElement);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    });

    sendButton.addEventListener("click", function () {
        let message = messageInput.value.trim();
        if (message) {
            stompClient.send("/app/chat", {}, message);
            messageInput.value = "";
        }
    });
});
