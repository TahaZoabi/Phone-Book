// Function to fetch the modal HTML and append it to the body
async function showModal() {
  try {
    const response = await fetch('components/modal.html');

    if (!response.ok) {
      throw new Error('Error fetching the modal HTML');
    }

    const modalHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Add event listener to close the modal
    document.getElementById('closeBtn').addEventListener('click', closeModal);
  } catch (error) {
    console.error('Error fetching the modal HTML:', error);
  }
}

// Function to remove the modal from the body
function closeModal() {
  const modal = document.getElementById('modal-overlay');
  if (modal) {
    modal.remove();
  }
}

// Event listener to open modal
document.getElementById('showFormBtn').addEventListener('click', showModal);

// Function to fetch the confirmation modal HTML and append it to the body
async function showConfirmModal() {
  try {
    const response = await fetch('components/action_confirm.html');
    const confirmModalHTML = await response.text();
    document.body.insertAdjacentHTML('beforeend', confirmModalHTML);

    // Add event listeners to the buttons
    document
      .getElementById('confirmBtn')
      .addEventListener('click', confirmAction);
    document
      .getElementById('cancelBtn')
      .addEventListener('click', closeConfirmModal);
  } catch (error) {
    console.error('Error fetching the confirmation modal HTML:', error);
  }
}

// Function to close the confirmation modal
function closeConfirmModal() {
  const modal = document.getElementById('confirm-popup');
  if (modal) {
    modal.remove();
  }
}

// Function to handle the confirm action (you can customize this as needed)
function confirmAction() {
  console.log('Action confirmed!');
  closeConfirmModal();
}

// Event listener to open the confirmation modal
document
  .getElementById('deleteBtn')
  .addEventListener('click', showConfirmModal);
