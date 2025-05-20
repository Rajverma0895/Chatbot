document.addEventListener('DOMContentLoaded', () => {
    const messagesContainer = document.getElementById('messagesContainer');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const modelSelector = document.getElementById('modelSelector');
    const clearHistoryButton = document.getElementById('clearHistoryButton');

    // Settings Modal Elements
    const settingsButton = document.getElementById('settingsButton');
    const settingsModal = document.getElementById('settingsModal');
    const closeSettingsButton = document.getElementById('closeSettingsButton');
    const saveSettingsButton = document.getElementById('saveSettingsButton');
    const apiKeyMock1Input = document.getElementById('apiKeyMock1');
    const apiKeyMock2Input = document.getElementById('apiKeyMock2');

    let chatHistory = [];
    const HISTORY_STORAGE_KEY = 'chatHistory';
    const API_KEY_MOCK1 = 'apiKey_mockLLM1';
    const API_KEY_MOCK2 = 'apiKey_mockLLM2';

    // --- LLM Preference ---
    const savedLLM = localStorage.getItem('selectedLLM');
    if (savedLLM) {
        modelSelector.value = savedLLM;
    }
    modelSelector.addEventListener('change', () => {
        localStorage.setItem('selectedLLM', modelSelector.value);
    });

    // --- Chat History ---
    function saveChatHistory() {
        localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(chatHistory));
    }

    function appendMessage(text, type, isRestoring = false) {
        const messageDiv = document.createElement('div');
        if (type === 'user') {
            messageDiv.classList.add('user-message');
        } else if (type === 'bot') {
            messageDiv.classList.add('bot-message');
        } else if (type === 'error') {
            messageDiv.classList.add('bot-message', 'error-message');
        }
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        if (!isRestoring) {
            chatHistory.push({ text: text, type: type });
            saveChatHistory();
        }
    }

    function loadChatHistory() {
        const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
        if (storedHistory) {
            chatHistory = JSON.parse(storedHistory);
            chatHistory.forEach(message => {
                appendMessage(message.text, message.type, true);
            });
        }
    }

    clearHistoryButton.addEventListener('click', () => {
        chatHistory = [];
        saveChatHistory();
        messagesContainer.innerHTML = '';
        const clearedMsg = document.createElement('div');
        clearedMsg.textContent = "Chat history cleared.";
        clearedMsg.style.textAlign = "center";
        clearedMsg.style.color = "#888";
        clearedMsg.style.fontStyle = "italic";
        clearedMsg.style.padding = "10px";
        messagesContainer.appendChild(clearedMsg);
        setTimeout(() => {
            if (messagesContainer.contains(clearedMsg)) {
                messagesContainer.removeChild(clearedMsg);
            }
        }, 3000);
    });

    // --- Settings Modal Logic ---
    function loadSettings() {
        apiKeyMock1Input.value = localStorage.getItem(API_KEY_MOCK1) || '';
        apiKeyMock2Input.value = localStorage.getItem(API_KEY_MOCK2) || '';
    }

    settingsButton.addEventListener('click', () => {
        loadSettings();
        settingsModal.style.display = 'block';
    });

    closeSettingsButton.addEventListener('click', () => {
        settingsModal.style.display = 'none';
    });

    saveSettingsButton.addEventListener('click', () => {
        localStorage.setItem(API_KEY_MOCK1, apiKeyMock1Input.value.trim());
        localStorage.setItem(API_KEY_MOCK2, apiKeyMock2Input.value.trim());
        settingsModal.style.display = 'none';
        // Optional: Add user feedback like an alert or a temporary message
        alert("Settings saved!"); 
    });

    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
    });

    // --- Message Handling ---
    async function handleSendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            appendMessage(text, 'user');
            messageInput.value = '';

            try {
                const llmProvider = modelSelector.value;
                let apiKey = "";
                if (llmProvider === 'mockLLM1') {
                    apiKey = localStorage.getItem(API_KEY_MOCK1) || '';
                } else if (llmProvider === 'mockLLM2') {
                    apiKey = localStorage.getItem(API_KEY_MOCK2) || '';
                }

                const response = await getLLMResponse(text, llmProvider, apiKey);

                if (response && response.success) {
                    appendMessage(response.message, 'bot');
                } else {
                    appendMessage(response.message || "Error: Could not get response from LLM.", 'error');
                }
            } catch (error) {
                console.error("Error calling LLM:", error);
                appendMessage("Error: An unexpected error occurred while contacting the LLM.", 'error');
            }
        }
    }

    sendButton.addEventListener('click', handleSendMessage);
    messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Initial Load
    loadChatHistory();
});
