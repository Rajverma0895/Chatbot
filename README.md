# Feature-Rich Web Chatbot Interface

## Description

This project is a client-side web-based chatbot interface designed for interacting with various Large Language Models (LLMs). Its goal is to provide a user-friendly and feature-rich experience for testing and using different LLMs. The interface is built using HTML, CSS, and JavaScript, running entirely in the browser without requiring a backend for its core functionality (though a backend is recommended for production API key management).

## Features

*   **Interactive Chat Interface:** Modern and responsive design for sending and receiving messages.
*   **LLM Model Selection:** Allows users to choose from a list of LLM providers. Currently, this features mock LLMs ("LLM Provider 1 (Mock)", "LLM Provider 2 (Mock)") for demonstration and development.
*   **Chat History:** Automatically saves your conversation to your browser's `localStorage`, allowing you to resume previous chats.
*   **Clear Chat History:** Provides a button to easily clear the current chat history from the interface and `localStorage`.
*   **Settings Panel for API Key Management:** A user-friendly settings panel allows users to input API keys for the different LLM providers.
    *   For the current mock LLMs, these keys are for demonstration purposes.
    *   API keys are stored in `localStorage`.
*   **Responsive Design:** The interface adapts to different screen sizes for usability on desktop and mobile devices.
*   **Modern UI/UX:** Styled for a clean, intuitive, and pleasant user experience.

## Setup Instructions

1.  **Clone or Download:**
    *   Clone the repository: `git clone <repository-url>`
    *   Or download the ZIP file and extract it.

2.  **No Build Steps Required:**
    *   This project runs entirely on the client-side. Simply open the `index.html` file in your web browser.

3.  **Understanding `.env.example`:**
    *   You will find an `.env.example` file in the project.
    *   Typically, you would copy this file to `.env` and configure it with your API keys for a backend server to securely manage them.
    *   **However, this project currently runs entirely on the client-side.** API keys are not read from `.env` by the client-side code.
    *   For the current client-side implementation, API keys for LLM providers are managed via the "Settings" panel in the UI and are stored in your browser's local storage.

## Configuration - API Keys

This chatbot interface is designed to connect to various LLM providers. API keys are required to authenticate with these services.

1.  **Accessing Settings:**
    *   Click the "Settings" button in the top control bar of the application.

2.  **Adding API Keys:**
    *   In the Settings panel, you will find input fields for the available LLM providers:
        *   **LLM Provider 1 API Key:** Corresponds to "LLM Provider 1 (Mock)" in the dropdown.
        *   **LLM Provider 2 API Key:** Corresponds to "LLM Provider 2 (Mock)" in the dropdown.
    *   Enter your API key for the respective provider in the corresponding input field.
    *   Click "Save Settings". The keys will be saved to your browser's local storage.

3.  **API Key Security Note:**
    *   API keys entered in the Settings panel are stored in your browser's **local storage**.
    *   This approach is convenient for development and personal use but is **not secure for production applications or shared environments.**
    *   For production, API keys should always be managed by a secure backend server that makes requests to the LLM providers on behalf of the client.

## How to Use

1.  **Open the Application:** Open the `index.html` file in a modern web browser.
2.  **Select LLM Provider:** Choose your desired LLM provider from the "Choose LLM:" dropdown menu (e.g., "LLM Provider 1 (Mock)").
3.  **Configure API Key (if needed):**
    *   Click the "Settings" button.
    *   Enter the API key for the selected LLM provider.
    *   Click "Save Settings".
4.  **Chat:**
    *   Type your message into the input field at the bottom of the chatbox.
    *   Press "Enter" or click the "Send" button.
    *   Your message and the LLM's response will appear in the chat window.
5.  **View Chat History:** Previous messages are loaded automatically from your browser's local storage when you open the application.
6.  **Clear Chat History:** Click the "Clear History" button to remove all messages from the interface and local storage.

## Future Development

Potential future enhancements for this project include:

*   **Integration with Actual LLM APIs:** Replacing the mock LLM functions with real API calls to services like OpenAI, Google Gemini, Anthropic Claude, etc.
*   **Secure Backend for API Key Management:** Implementing a server-side component to handle API keys securely, preventing their exposure on the client-side.
*   **Streaming Responses:** Displaying LLM responses token by token as they are generated for a more interactive feel.
*   **User Authentication:** Adding user accounts to manage multiple users' chat histories and settings securely.
*   **More Themes:** Allowing users to choose different visual themes for the interface.
*   **Advanced Chat Features:** Implementing features like message editing, deleting individual messages, message search, etc.
*   **Configuration for Model Parameters:** Allowing users to adjust parameters like temperature, max tokens, etc., for LLM providers via the settings panel.
*   **Export/Import Chat History:** Functionality to download and upload chat history.
