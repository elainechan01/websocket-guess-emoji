import actorVerifyAct from './charades.js';

function handleStartActing() {
  const actInput = document.getElementById('act-input');

  actInput.addEventListener('keyup', async (event) => {
    if (event.key === 'Enter') {
      const act = actInput.value;
      try {
        const verifiedAct = await actorVerifyAct(act);
        // Send the verified act to the server (replace with your logic)
        console.log('Verified act:', verifiedAct); // Placeholder

        // Clear the input field for the next act
        actInput.value = '';
      } catch (error) {
        console.error('Error verifying act:', error.message);
        // Display an error message to the user
      }
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  handleStartActing();
});