"use strict";

const showFormBtn = document.getElementById("showFormBtn");
const hideFormBtn = document.getElementById("cancelBtn");
const contactForm = document.querySelector(".contact-modal");

const openModal = () => {
  contactForm.style.display = "flex";
};
const closeModal = () => {
  contactForm.style.display = "none";
};

showFormBtn.addEventListener("click", (e) => {
  openModal();
});
hideFormBtn.addEventListener("click", (e) => {
  closeModal();
});
