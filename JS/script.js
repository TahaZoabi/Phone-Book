"use strict";

const showFormBtn = document.getElementById("showFormBtn");
const hideFormBtn = document.querySelector(".cancelBtn");
const contactForm = document.querySelector(".contact-modal");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");
const confirmBtn = document.querySelector(".confirm-btn");
const confirmModal = document.getElementById("confirm-popup");
const cancelBtnConfirmModal = document.getElementById("confirm-cancelBtn");
const confirmBtnConfirmModal = document.getElementById("confirm-confirmBtn");

const openModal = () => {
  contactForm.style.display = "flex";
};
const closeModal = () => {
  contactForm.style.display = "none";
};

const openConfirmModal = () => {
  confirmModal.style.display = "flex";
};
const closeConfirmModal = () => {
  confirmModal.style.display = "none";
};

const actions = () => {
  // do shit later
  console.log("actions were made");
  closeConfirmModal();
};

confirmBtn.addEventListener("click", actions);

editBtn.addEventListener("click", openModal);
deleteBtn.addEventListener("click", openConfirmModal);
cancelBtnConfirmModal.addEventListener("click", closeConfirmModal);

showFormBtn.addEventListener("click", (e) => {
  openModal();
});
hideFormBtn.addEventListener("click", (e) => {
  closeModal();
});
