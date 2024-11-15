// function actorVerifyAct(act) {
//     return fetch('/verify_act', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ act })
//     })
//     .then(response => response.json())
//     .then(data => {
//     if (data.error) {
//         throw new Error(data.error); // Handle errors from the server
//     }
//     return data.act; // Return the verified act
//     });
// }

function actorPlay(act, actorInputBox, actorFeedbackText, sharedDisplay) {
/*
Reset actor's screen
*/
    sharedDisplay.textContent = act;
}

export { actorPlay };