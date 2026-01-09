const openModalBtns = document.querySelectorAll(".js-open-modal");
const modalOverlay = document.getElementById("modalOverlay");
const closeModal = document.getElementById("closeModal");

// Open modal
openModalBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    modalOverlay.classList.add("active");
  });
});

// Close modal (X button)
closeModal.addEventListener("click", () => {
  modalOverlay.classList.remove("active");
});

// Close modal when clicking outside
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove("active");
  }
});


/* --- Payment Modal Logic --- */
const continueToPaymentBtn = document.getElementById("continueToPayment");
const paymentModalOverlay = document.getElementById("paymentModalOverlay");
const closePaymentModal = document.getElementById("closePaymentModal");

// Switch from Info Modal to Payment Modal
if (continueToPaymentBtn) {
  continueToPaymentBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("active"); // Close first modal
    paymentModalOverlay.classList.add("active"); // Open second modal
  });
}

// Close Payment Modal (X button)
if (closePaymentModal) {
  closePaymentModal.addEventListener("click", () => {
    paymentModalOverlay.classList.remove("active");
  });
}

// Close Payment Modal when clicking outside
if (paymentModalOverlay) {
  paymentModalOverlay.addEventListener("click", (e) => {
    if (e.target === paymentModalOverlay) {
      paymentModalOverlay.classList.remove("active");
    }
  });
}