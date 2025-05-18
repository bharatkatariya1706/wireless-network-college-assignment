document.addEventListener('DOMContentLoaded', function () {
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendMessageBtn = document.getElementById('send-message');

    // Predefined responses for the chatbot
    const botResponses = {
        'hello': 'Hi there! How can I help you today?',
        'hi': 'Hello! How can I assist you?',
        'how are you': 'I\'m just a simple bot, but I\'m functioning well! How about you?',
        'what is javascript': 'JavaScript is a programming language that enables interactive web pages. It\'s an essential part of web applications.',
        'what can you do': 'I can answer simple questions about JavaScript and web development. Try asking me something!',
        'bye': 'Goodbye! Have a great day!',
        'thank you': 'You\'re welcome! Anything else I can help with?',
        'thanks': 'No problem! Let me know if you need anything else.',
        'help': 'You can ask me about JavaScript, web development, or just say hello!'
    };

    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
        messageElement.textContent = text;

        chatMessages.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to get bot response
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase().trim();

        // Check for exact matches
        if (botResponses[userMessage]) {
            return botResponses[userMessage];
        }

        // Check for partial matches
        for (const key in botResponses) {
            if (userMessage.includes(key)) {
                return botResponses[key];
            }
        }

        // Default response if no match found
        return "I'm not sure how to respond to that. Can you try asking something else about JavaScript or web development?";
    }

    // Function to handle sending a message
    function sendMessage() {
        const userMessage = userMessageInput.value.trim();

        if (userMessage === '') {
            return;
        }

        // Add user message to chat
        addMessage(userMessage, true);

        // Clear input field
        userMessageInput.value = '';

        // Simulate bot thinking with a slight delay
        setTimeout(() => {
            const botResponse = getBotResponse(userMessage);
            addMessage(botResponse);
        }, 500);
    }

    // Event listener for send button
    sendMessageBtn.addEventListener('click', sendMessage);

    // Event listener for Enter key
    userMessageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Initial bot greeting
    setTimeout(() => {
        addMessage('Hello! I\'m a simple JavaScript chatbot. How can I help you today?');
    }, 500);
});