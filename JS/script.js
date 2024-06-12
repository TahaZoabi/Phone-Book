'use strict'

// declare variables that are needed for the DOM
const fullForm = document.querySelector(".form-container");
const modalForm = document.querySelector(".modal-overlay");

// function to open/show form
const openModal = () => {
    fullForm.style.display = "block";
    modalForm.style.display = "block";
};

// function to close/hide form
const closeModal = () => {
    fullForm.style.display = "none";
    modalForm.style.display = "none";
};

// event handler for add contact btn to open form
showFormBtn.addEventListener("click", function (e) {
    e.preventDefault();
    clearInputFields(); // reset the inputs to empty strings
    openModal();
});

// event handler for close form btn to hide form
closeFormBtn.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
});