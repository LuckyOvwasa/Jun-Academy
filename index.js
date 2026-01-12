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
if (closeModal) {
  closeModal.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
  });
}

// Close modal when clicking outside
if (modalOverlay) {
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("active");
    }
  });
}


/* --- Payment Modal Logic --- */
const continueToPaymentBtn = document.getElementById("continueToPayment");
const paymentModalOverlay = document.getElementById("paymentModalOverlay");
const closePaymentModal = document.getElementById("closePaymentModal");

// Switch from Info Modal to Payment Modal
if (continueToPaymentBtn) {
  continueToPaymentBtn.addEventListener("click", () => {
    modalOverlay.classList.remove("active");
    paymentModalOverlay.classList.add("active");
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


/* --- Form Submission & Success Modal Logic --- */
// const successModalOverlay = document.getElementById("successModalOverlay");
// const closeSuccessModalBtn = document.getElementById("closeSuccessModal");
// const paymentForm = document.querySelector(".confirm-form");

// if (paymentForm) {
//   paymentForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(paymentForm);
//     const actionUrl = paymentForm.getAttribute("action");

//     const submitBtn = paymentForm.querySelector("button[type='submit']");
//     const originalBtnText = submitBtn.innerText;
//     submitBtn.innerText = "Submitting...";
//     submitBtn.disabled = true;

//     fetch(actionUrl, {
//       method: "POST",
//       body: formData,
//       headers: {
//         'Accept': 'application/json'
//       }
//     })
//       .then(response => {
//         if (response.ok) {
//           // Success
//           if (paymentModalOverlay) paymentModalOverlay.classList.remove("active");

//           if (successModalOverlay) {
//             // Small delay to ensure payment modal is gone and transition is smooth
//             setTimeout(() => {
//               successModalOverlay.classList.add("active");
//               successModalOverlay.style.display = "flex"; // Force display
//             }, 100);
//           }
//           paymentForm.reset();
//         } else {
//           alert("There was an issue submitting the form. Please try again.");
//           console.error("Form submission failed:", response);
//         }
//       })
//       .catch(error => {
//         console.error("Error:", error);
//         alert("There was an error submitting the form. Please check your connection and try again.");
//       })
//       .finally(() => {
//         submitBtn.innerText = originalBtnText;
//         submitBtn.disabled = false;
//       });
//   });
// }

// // Close Success Modal
// if (closeSuccessModalBtn) {
//   closeSuccessModalBtn.addEventListener("click", () => {
//     if (successModalOverlay) {
//       successModalOverlay.classList.remove("active");
//       successModalOverlay.style.display = ""; // Clear inline style
//     }
//   });
// }

// // Close Success Modal when clicking outside
// if (successModalOverlay) {
//   successModalOverlay.addEventListener("click", (e) => {
//     if (e.target === successModalOverlay) {
//       successModalOverlay.classList.remove("active");
//       successModalOverlay.style.display = ""; // Clear inline style
//     }
//   });
// }

/* --- Form Submission & Success Modal Logic --- */
const successModalOverlay = document.getElementById("successModalOverlay");
const closeSuccessModalBtn = document.getElementById("closeSuccessModal");
const paymentForm = document.querySelector(".confirm-form");

if (paymentForm) {
  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(paymentForm);
    const actionUrl = paymentForm.getAttribute("action");

    const submitBtn = paymentForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;

    fetch(actionUrl, {
      method: "POST",
      body: formData,
      headers: {
        "Accept": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          // Close payment modal
          paymentModalOverlay.classList.remove("active");

          // Open success modal (after payment modal closes)
          setTimeout(() => {
            successModalOverlay.classList.add("active");
          }, 150);

          paymentForm.reset();
        } else {
          alert("There was an issue submitting the form. Please try again.");
        }
      })
      .catch(() => {
        alert("Network error. Please try again.");
      })
      .finally(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
      });
  });
}

// Close success modal
if (closeSuccessModalBtn) {
  closeSuccessModalBtn.addEventListener("click", () => {
    successModalOverlay.classList.remove("active");
  });
}

// Close success modal on overlay click
if (successModalOverlay) {
  successModalOverlay.addEventListener("click", (e) => {
    if (e.target === successModalOverlay) {
      successModalOverlay.classList.remove("active");
    }
  });
}
