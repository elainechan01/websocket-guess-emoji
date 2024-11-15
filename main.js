import { actorPlay } from './charades.js';

// Server to Browser

function actorShowFeedback(message, actorFeedbackText) {
/*
Helper Function: shows message when invalid act was input by acotr
*/
    actorFeedbackText.textContent = message;
}

function actorReceiveAct(websocket, actorInputBox, actorFeedbackText, sharedDisplay) {
/*
Receives act from actor and displays it to clients
*/
    websocket.addEventListener('message', ({ data }) => {
        const event = JSON.parse(data);
        switch (event.type) {
            case 'play':
                console.log("Received a play", event.act);
                actorPlay(event.act, actorInputBox, actorFeedbackText, sharedDisplay);
                break;
            case 'error':
                console.log("Error, not an emoji string");
                actorShowFeedback(event.message, actorFeedbackText);
                break;
            default:
                throw new Error(`Unsupported event type: ${event.type}`);
        }
    });
}

// Browser to Server

function actorSendAct(websocket, actorInputBox, actorSendButton) {
    actorSendButton.addEventListener('click', () => {
        const event = {
            type: 'play',
            act: actorInputBox.textContent,
        };
        websocket.send(JSON.stringify(event));
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const sharedDisplay = document.getElementById('prompt');
    const inputBox = document.getElementById('input');
    const sendButton = document.getElementById('send-button');
    const feedbackText = document.getElementById('feedback');
    
    const websocket = new WebSocket('ws://localhost:8523/');

    actorReceiveAct(websocket, inputBox, feedbackText, sharedDisplay);
    actorSendAct(websocket, inputBox, sendButton);
});