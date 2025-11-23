'use strict';

// Utility function to safely get elements
const getElement = (selector) => document.getElementById(selector);
const getElements = (selector) => document.querySelectorAll(selector);

// Utility function to show/hide modals using modern method
const toggleModal = (modal, isOpen) => {
  modal?.classList.toggle('hidden', !isOpen);
};

// Modal management function
const initPhotoModal = () => {
  const profilePhoto = getElement('profile-photo');
  const photoModal = getElement('photo-modal');
  const photoModalCloseButtons = getElements('#photo-modal .close-button, #photo-modal .modal-close-btn');

  if (!profilePhoto || !photoModal) return;

  const openModal = () => photoModal.style.display = 'block';
  const closeModal = () => photoModal.style.display = 'none';

  profilePhoto.addEventListener('click', openModal);
  
  photoModalCloseButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  window.addEventListener('click', (event) => {
    if (event.target === photoModal) closeModal();
  });
};

// Contact form confirmation modal
const initContactFormModal = () => {
  const contactForm = getElement('contact-form');
  const confirmModal = getElement('confirm-modal');
  const confirmSubmitBtn = getElement('confirm-submit-btn');
  const cancelSubmitBtn = getElement('cancel-submit-btn');

  if (!contactForm || !confirmModal) return;

  let isConfirmed = false;

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isConfirmed) {
      confirmModal.style.display = 'block';
    } else {
      // Use modern alert or consider implementing actual form submission with fetch
      console.log('Form submitted successfully (Simulated)');
      isConfirmed = false;
      contactForm.reset();
      confirmModal.style.display = 'none';
    }
  };

  const closeConfirmModal = () => {
    confirmModal.style.display = 'none';
    isConfirmed = false;
  };

  contactForm.addEventListener('submit', handleFormSubmit);

  confirmSubmitBtn?.addEventListener('click', () => {
    confirmModal.style.display = 'none';
    isConfirmed = true;
    contactForm.dispatchEvent(new Event('submit'));
  });

  cancelSubmitBtn?.addEventListener('click', closeConfirmModal);

  window.addEventListener('click', (event) => {
    if (event.target === confirmModal) closeConfirmModal();
  });
};

// Initialize all modals when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initPhotoModal();
  initContactFormModal();
});