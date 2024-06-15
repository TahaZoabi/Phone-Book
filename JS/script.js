"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Variables and buttons
  const showFormBtn = document.getElementById("showFormBtn");
  const hideFormBtn = document.querySelector(".cancelBtn");
  const contactForm = document.querySelector(".contact-modal");
  const editBtn = document.getElementById("editBtn");
  const deleteBtn = document.getElementById("deleteBtn");
  const saveConfirmBtn = document.getElementById("saveBtn");
  const confirmForm = document.getElementById("confirm-popup");
  const cancelBtn = document.getElementById("confirm-cancelBtn");
  const confirmBtn = document.getElementById("confirm-confirmBtn");
  const deleteAllBtn = document.getElementById("delete-all");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const addressInput = document.getElementById("address");
  const emailInput = document.getElementById("email");

  const contactsList = document.querySelector(".phone-contact-list");

  // Initial contacts array
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

  // Function to add or update a contact
  function addOrUpdateContact() {
    const contact = {
      Name: nameInput.value.trim(),
      PhoneNumber: phoneInput.value.trim(),
      Address: addressInput.value.trim(),
      Email: emailInput.value.trim(),
    };
    contacts.push(contact);
    refreshContactList(); // Update the UI
  }

  // Function to delete all contacts
  function deleteAllContacts() {
    contacts = [];
    refreshContactList(); // Update the UI
  }

  // Event listener for delete all button
  deleteAllBtn.addEventListener("click", function (event) {
    event.preventDefault();
    openConfirmModal();
  });

  // Refresh the contacts list UI
  function refreshContactList() {
    contactsList.innerHTML = ""; // Clear existing list
    contacts.forEach((person) => {
      const userContact = document.createElement("div");
      userContact.classList.add("user-card");

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
      userDescription.textContent = "Lorem ipsum dolor.";

      userInfo.appendChild(userName);
      userInfo.appendChild(userDescription);

      const userActions = document.createElement("div");
      userActions.classList.add("status");

      const editButton = document.createElement("div");
      editButton.classList.add("edit");
      editButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil" role="img" aria-label="Edit">
                    <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                    <path d="m15 5 4 4" />
                </svg>`;
      editButton.addEventListener("click", () => {
        openModal();
      });

      const deleteButton = document.createElement("div");
      deleteButton.classList.add("delete");
      deleteButton.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2" role="img" aria-label="Delete">
                    <path d="M3 6h18" />
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    <line x1="10" x2="10" y1="11" y2="17" />
                    <line x1="14" x2="14" y1="11" y2="17" />
                </svg>`;
      deleteButton.addEventListener("click", () => {
        openConfirmModal();
      });

      userActions.appendChild(editButton);
      userActions.appendChild(deleteButton);

      userContact.appendChild(userPic);
      userContact.appendChild(userInfo);
      userContact.appendChild(userActions);

      contactsList.appendChild(userContact);
    });
  }

  // Function to open and close the contact modal
  function openModal() {
    contactForm.style.display = "flex";
  }

  function closeModal() {
    contactForm.style.display = "none";
  }

  // Function to open and close the confirmation modal
  function openConfirmModal() {
    confirmForm.style.display = "flex";
  }

  function closeConfirmModal() {
    confirmForm.style.display = "none";
  }

  // Function to handle actions
  function actions() {
    console.log("Action performed");
    closeModal();
    closeConfirmModal();
  }

  // Event listeners
  saveConfirmBtn.addEventListener("click", actions);
  cancelBtn.addEventListener("click", closeConfirmModal);
  confirmBtn.addEventListener("click", function (event) {
    event.preventDefault();
    actions();
  });

  showFormBtn.addEventListener("click", openModal);
  hideFormBtn.addEventListener("click", function (event) {
    closeModal();
    closeConfirmModal();
  });

  // Initial load of contacts
  refreshContactList();
});
