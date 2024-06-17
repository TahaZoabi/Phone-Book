"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Variables and buttons
  const showFormBtn = document.getElementById("showFormBtn");
  const hideFormBtn = document.querySelector(".cancelBtn");
  const contactForm = document.querySelector(".contact-modal");
  const saveConfirmBtn = document.getElementById("saveBtn");
  const confirmForm = document.getElementById("confirm-popup");
  const cancelBtn = document.getElementById("confirm-cancelBtn");
  const confirmBtn = document.getElementById("confirm-confirmBtn");
  const deleteAllBtn = document.getElementById("delete-all");
  const confirmText = document.getElementById("confirm-text");
  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");

  const searchInput = document.getElementById("search-input");
  let contactIndex = -1;
  const contactsList = document.querySelector(".phone-contact-list");

  // create contacts array of objects
  let contacts = [
    {
      Name: "John Smith",
      PhoneNumber: "555-123-4567",
      Address: "123 Main Street, Anytown, USA",
      Email: "john.smith@example.com",
    },
    {
      Name: "Emily Johnson",
      PhoneNumber: "555-987-6543",
      Address: "456 Oak Avenue, Anycity, USA",
      Email: "emily.johnson@example.com",
    },
    {
      Name: "Michael Brown",
      PhoneNumber: "555-555-5555",
      Address: "789 Elm Street, Anystate, USA",
      Email: "michael.brown@example.com",
    },
    {
      Name: "Sarah Davis",
      PhoneNumber: "555-222-3333",
      Address: "321 Pine Road, Anyvillage, USA",
      Email: "sarah.davis@example.com",
    },
    {
      Name: "Christopher Wilson",
      PhoneNumber: "555-444-7777",
      Address: "654 Maple Lane, Anysuburb, USA",
      Email: "christopher.wilson@example.com",
    },
  ];

  // Create names array
  let contactNames = contacts.map((person) => person.Name);

  // Sort the contacts array by name
  function sortContacts() {
    contacts.sort((a, b) => a.Name.localeCompare(b.Name));
  }

  // Function to add or update a contact
  function addOrUpdateContact() {
    const contact = {
      Name: nameInput.value.trim(),
      PhoneNumber: phoneInput.value.trim(),
      Address: addressInput.value.trim(),
      Email: emailInput.value.trim(),
    };

    // Check if the contact name already exists
    const nameExists = contactNames.some(
      (name, index) =>
        name.toLowerCase() === contact.Name.toLowerCase() &&
        index !== contactIndex,
    );

    if (nameExists) {
      setError(nameInput, "Contact name already exists in the book");
      return;
    }

    if (contactIndex === -1) {
      // Add new contact
      contacts.push(contact);
      contactNames.push(contact.Name);
      clearInputFields();
    } else {
      // Update existing contact
      contacts[contactIndex] = contact;
    }

    // Reset contactIndex
    contactIndex = -1;

    // Close modal
    closeModal();
    sortContacts();
    displayContacts();
  }

  // Function to delete all contacts
  function deleteAllContacts() {
    contacts = [];
    contactNames = [];
    contactsList.innerHTML = ""; // Clear the contacts list
    closeConfirmModal();
    displayEmptyListMessage();
  }

  // Event listener for delete all button
  deleteAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    confirmText.textContent = "Are you sure you want to delete all contacts?";
    openConfirmModal(deleteAllContacts);
  });

  // Function to refresh the contacts list UI
  function displayContacts(filteredContacts = contacts) {
    contactsList.innerHTML = "";
    filteredContacts.forEach((person) => {
      const userContact = document.createElement("div");
      userContact.classList.add("user-card");

      // mouse over to add the hover background color change
      userContact.addEventListener("mouseover", () => {
        userContact.classList.add("hover");
      });

      userContact.addEventListener("mouseout", () => {
        userContact.classList.remove("hover");
      });
      const userPic = document.createElement("img");
      userPic.classList.add("user-pic");
      userPic.src = "./images/user.png"; // Placeholder image source
      userPic.alt = "User Avatar";

      const userInfo = document.createElement("div");
      userInfo.classList.add("info");

      const userName = document.createElement("span");
      userName.classList.add("name");
      userName.textContent = person.Name;

      const userDescription = document.createElement("span");
      userDescription.classList.add("description");
      userDescription.textContent = person.PhoneNumber;

      userInfo.appendChild(userName);
      userInfo.appendChild(userDescription);

      const userActions = document.createElement("div");
      userActions.classList.add("status");

      const editButton = document.createElement("div");
      editButton.classList.add("edit");
      editButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit">
          <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
          <path d="m15 5 4 4" />
        </svg>`;
      editButton.addEventListener("click", function () {
        editContact(person.Name);
      });

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2">
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" x2="10" y1="11" y2="17" />
          <line x1="14" x2="14" y1="11" y2="17" />
        </svg>`;
      deleteButton.addEventListener("click", function () {
        confirmText.textContent = `Are you sure you want to delete ${person.Name}?`;
        openConfirmModal(() => deleteContact(person));
      });

      userActions.appendChild(editButton);
      userActions.appendChild(deleteButton);

      userContact.appendChild(userPic);
      userContact.appendChild(userInfo);
      userContact.appendChild(userActions);

      contactsList.appendChild(userContact);
    });

    displayEmptyListMessage();
  }

  // Function to display or hide empty list message
  function displayEmptyListMessage() {
    const emptyListMessage = document.getElementById("empty-list");
    if (contacts.length === 0) {
      emptyListMessage.style.display = "block";
    } else {
      emptyListMessage.style.display = "none";
    }
  }

  // Function to edit a contact
  function editContact(name) {
    contactIndex = contacts.findIndex((contact) => contact.Name === name);
    const contact = contacts[contactIndex];
    nameInput.value = contact.Name;
    phoneInput.value = contact.PhoneNumber;
    addressInput.value = contact.Address;
    emailInput.value = contact.Email;
    openModal();
  }

  // Function to delete a contact
  function deleteContact(contact) {
    const index = contacts.indexOf(contact);
    if (index !== -1) {
      contacts.splice(index, 1);
      displayContacts();
    }
  }

  // Function to open and close the contact modal
  function openModal() {
    contactForm.style.display = "flex";
  }

  function closeModal() {
    contactForm.style.display = "none";
    clearInputFields(); // Clear input fields on close
  }

  // Function to open and close the confirmation modal
  function openConfirmModal(callback) {
    confirmForm.style.display = "flex";
    confirmBtn.addEventListener("click", function handler() {
      callback();
      confirmBtn.removeEventListener("click", handler); // Remove the event listener after use
      closeConfirmModal();
    });
  }

  function closeConfirmModal() {
    confirmForm.style.display = "none";
  }

  // Function to clear input fields
  function clearInputFields() {
    nameInput.value = "";
    phoneInput.value = "";
    addressInput.value = "";
    emailInput.value = "";
    clearError(nameInput);
    clearError(phoneInput);
  }

  // Function to filter contacts by name
  function filterContacts(searchedName) {
    const filteredContacts = contacts.filter((contact) =>
      contact.Name.toLowerCase().includes(searchedName.toLowerCase()),
    );
    displayContacts(filteredContacts);
  }

  // Event listener for search input field
  searchInput.addEventListener("input", function () {
    filterContacts(searchInput.value);
  });

  // Event listener for save button in the contact modal
  saveConfirmBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (validateInputs()) {
      addOrUpdateContact();
    }
  });

  // Event listener for cancel button in the contact modal
  hideFormBtn.addEventListener("click", function () {
    closeModal();
    closeConfirmModal();
  });

  // Event listener for cancel button in the confirmation modal
  cancelBtn.addEventListener("click", closeConfirmModal);

  function setError(element, message) {
    const errorDiv = document.createElement("div");
    const errorDisplay = element.parentElement.querySelector(".error");
    errorDisplay.appendChild(errorDiv);
    if (errorDisplay) {
      errorDisplay.textContent = message;
    }
    errorDiv.classList.add("error");
  }

  // Function to clear error message for a specific input field
  function clearError(element) {
    const errorDisplay = element.parentElement.querySelector(".error");
    if (errorDisplay) {
      errorDisplay.textContent = "";
    }
    element.classList.remove("error");
  }

  function validateInputs() {
    clearError(nameInput);
    clearError(phoneInput);
    clearError(emailInput);

    if (nameInput.value.trim() === "") {
      setError(nameInput, "Contact name is required");
      return false;
    }
    if (phoneInput.value.trim() === "") {
      setError(phoneInput, "Contact phone number is required");
      return false;
    } else if (phoneInput.value.trim().length !== 10) {
      setError(phoneInput, "Phone number must be 10 digits");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (
      emailInput.value.trim() !== "" &&
      !emailRegex.test(emailInput.value.trim())
    ) {
      setError(emailInput, "Invalid email format");
      return false;
    }

    return true;
  }

  // Event listener for show form button to open modal
  showFormBtn.addEventListener("click", function () {
    openModal();
  });

  // Initial sort and display of contacts
  sortContacts();
  displayContacts();
});
