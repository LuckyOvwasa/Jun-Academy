// Modal Overlays
const modalCourse1 = document.getElementById("modalOverlayCourse1");
const modalCourse2 = document.getElementById("modalOverlayCourse2");
const modalBundle = document.getElementById("modalOverlayBundle");
const paymentModalOverlay = document.getElementById("paymentModalOverlay");
const successModalOverlay = document.getElementById("successModalOverlay");

// All Modal Close Buttons
const closeBtns = document.querySelectorAll(".js-close-modal");
const closePaymentModalBtn = document.getElementById("closePaymentModal");
const closeSuccessModalBtn = document.getElementById("closeSuccessModal");

// Open Course 1 Modal
document.querySelectorAll(".js-open-modal-c1").forEach(btn => {
  btn.addEventListener("click", () => {
    if (modalCourse1) modalCourse1.classList.add("active");
  });
});

// Open Course 2 Modal
document.querySelectorAll(".js-open-modal-c2").forEach(btn => {
  btn.addEventListener("click", () => {
    if (modalCourse2) modalCourse2.classList.add("active");
  });
});

// Open Bundle Modal
document.querySelectorAll(".js-open-modal-bundle").forEach(btn => {
  btn.addEventListener("click", () => {
    if (modalBundle) modalBundle.classList.add("active");
  });
});

// Close Info Modals
closeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".modal-overlay").forEach(overlay => {
      if (overlay.id !== "successModalOverlay" && overlay.id !== "paymentModalOverlay") {
        overlay.classList.remove("active");
      }
    });
  });
});

// Close Modals on Overlay Backdrop Click
document.querySelectorAll(".modal-overlay").forEach(overlay => {
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) {
      overlay.classList.remove("active");
    }
  });
});

/* --- Continue to Payment Flow --- */
const continuePaymentBtns = document.querySelectorAll(".js-continue-payment");
const selectedCourseTitle = document.getElementById("selectedCourseTitle");
const selectedCoursePriceTag = document.getElementById("selectedCoursePriceTag");
const courseSelect = document.getElementById("courseSelect");

continuePaymentBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const courseType = btn.getAttribute("data-course-type");

    // Close all open info modals
    if (modalCourse1) modalCourse1.classList.remove("active");
    if (modalCourse2) modalCourse2.classList.remove("active");
    if (modalBundle) modalBundle.classList.remove("active");

    // Update Payment Modal Selected Summary
    if (courseType) {
      if (courseSelect) {
        courseSelect.value = courseType;
      }

      if (selectedCourseTitle && selectedCoursePriceTag) {
        if (courseType.includes("UI/UX") && courseType.includes("Live")) {
          selectedCourseTitle.innerText = "UI/UX Design Bootcamp - Live Cohort";
          selectedCoursePriceTag.innerText = "₦50,000";
        } else if (courseType.includes("UI/UX") && courseType.includes("Self-Paced")) {
          selectedCourseTitle.innerText = "UI/UX Design Bootcamp - Self-Paced";
          selectedCoursePriceTag.innerText = "₦35,000";
        } else if (courseType.includes("AI Code") && courseType.includes("Standard")) {
          selectedCourseTitle.innerText = "The AI Code Bootcamp for Designers";
          selectedCoursePriceTag.innerText = "₦150,000";
        } else if (courseType.includes("AI Code") && courseType.includes("Alumni")) {
          selectedCourseTitle.innerText = "The AI Code Bootcamp for Designers (Jun Alumni)";
          selectedCoursePriceTag.innerText = "₦100,000";
        } else if (courseType.includes("Bundle")) {
          selectedCourseTitle.innerText = "All-Access Both Courses Bundle";
          selectedCoursePriceTag.innerText = "₦120,000";
        } else {
          selectedCourseTitle.innerText = courseType;
          selectedCoursePriceTag.innerText = "";
        }
      }
    }

    // Ensure referral input is updated with stored code
    updateReferralCodeInput();

    // Open Payment Modal
    if (paymentModalOverlay) paymentModalOverlay.classList.add("active");
  });
});

// Close Payment Modal
if (closePaymentModalBtn) {
  closePaymentModalBtn.addEventListener("click", () => {
    paymentModalOverlay.classList.remove("active");
  });
}

// Dynamic update if user manually changes dropdown selection inside payment form
if (courseSelect) {
  courseSelect.addEventListener("change", (e) => {
    const val = e.target.value;
    if (val.includes("UI/UX") && val.includes("Live")) {
      selectedCourseTitle.innerText = "UI/UX Design Bootcamp - Live Cohort";
      selectedCoursePriceTag.innerText = "₦50,000";
    } else if (val.includes("UI/UX") && val.includes("Self-Paced")) {
      selectedCourseTitle.innerText = "UI/UX Design Bootcamp - Self-Paced";
      selectedCoursePriceTag.innerText = "₦35,000";
    } else if (val.includes("AI Code") && val.includes("Standard")) {
      selectedCourseTitle.innerText = "The AI Code Bootcamp for Designers";
      selectedCoursePriceTag.innerText = "₦150,000";
    } else if (val.includes("AI Code") && val.includes("Alumni")) {
      selectedCourseTitle.innerText = "The AI Code Bootcamp for Designers (Jun Alumni)";
      selectedCoursePriceTag.innerText = "₦100,000";
    } else if (val.includes("Bundle")) {
      selectedCourseTitle.innerText = "All-Access Both Courses Bundle";
      selectedCoursePriceTag.innerText = "₦120,000";
    }
  });
}

/* --- Curriculum Tabs Switching --- */
const tabBtns = document.querySelectorAll(".curriculum-tab-btn");
const tabPanes = document.querySelectorAll(".curriculum-tab-pane");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const targetTabId = btn.getAttribute("data-tab");

    // Remove active class from all buttons and panes
    tabBtns.forEach(b => b.classList.remove("active"));
    tabPanes.forEach(pane => pane.classList.remove("active"));

    // Set active on clicked button and target pane
    btn.classList.add("active");
    const targetPane = document.getElementById(targetTabId);
    if (targetPane) targetPane.classList.add("active");
  });
});

/* --- Form Submission & Success Modal Logic --- */
const paymentForm = document.querySelector(".confirm-form");

// Dynamically set _next URL to return to current page with ?submitted=true
const formSubmitNextInput = document.getElementById("formSubmitNextInput");
if (formSubmitNextInput) {
  const currentOrigin = window.location.origin + window.location.pathname;
  formSubmitNextInput.value = currentOrigin + "?submitted=true";
}

// Check if returning from a successful FormSubmit redirect
const urlCheckParams = new URLSearchParams(window.location.search);
if (urlCheckParams.get("submitted") === "true") {
  if (successModalOverlay) {
    successModalOverlay.classList.add("active");
  }

  // --- Meta Pixel: Track Registration Event ---
  if (typeof fbq !== 'undefined') {
    const courseName = selectedCourseTitle ? selectedCourseTitle.innerText : 'Jun Academy Course';
    fbq('track', 'CompleteRegistration', {
      content_name: courseName,
      currency: 'NGN'
    });
  }

  // Clean URL without page refresh
  try {
    window.history.replaceState({}, document.title, window.location.pathname);
  } catch (e) {
    console.warn("Unable to update browser history URL:", e);
  }
}

if (paymentForm) {
  const submitBtn = paymentForm.querySelector("button[type='submit']");
  const originalBtnText = submitBtn ? submitBtn.innerText : "Submit Enrollment";
  let formSubmitted = false;

  paymentForm.addEventListener("submit", function () {
    formSubmitted = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "Submitting...";
    }
    // No preventDefault here — the browser needs to do a real POST
    // so the file input actually gets uploaded to formsubmit.co.
  });

  const hiddenIframe = document.getElementById("formsubmitHiddenIframe");
  if (hiddenIframe) {
    hiddenIframe.addEventListener("load", function () {
      // Ignore the iframe's initial blank load — only react once a real submit happened
      if (!formSubmitted) return;
      formSubmitted = false;

      if (successModalOverlay) {
        successModalOverlay.classList.add("active");
      }
      if (paymentModalOverlay) {
        paymentModalOverlay.classList.remove("active");
      }
      paymentForm.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }

      if (typeof fbq !== 'undefined') {
        const courseName = selectedCourseTitle ? selectedCourseTitle.innerText : 'Jun Academy Course';
        fbq('track', 'CompleteRegistration', {
          content_name: courseName,
          currency: 'NGN'
        });
      }
    });
  }
}


// if (paymentForm) {
//   paymentForm.addEventListener("submit", function () {
//     const submitBtn = paymentForm.querySelector("button[type='submit']");
//     if (submitBtn) {
//       submitBtn.innerText = "Submitting...";
//     }
//   });
// }

// Close success modal
if (closeSuccessModalBtn) {
  closeSuccessModalBtn.addEventListener("click", () => {
    if (successModalOverlay) successModalOverlay.classList.remove("active");
  });
}

/* --- Clipboard Copy Logic --- */
const copyBtns = document.querySelectorAll(".copy-icon");
const copyToast = document.getElementById("copyToast");

if (copyBtns.length > 0) {
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-target");
      const accountElem = targetId ? document.getElementById(targetId) : null;
      if (!accountElem) return;

      const number = accountElem.innerText.trim();

      navigator.clipboard.writeText(number)
        .then(() => {
          const originalIcon = btn.innerText;
          btn.innerText = "check";

          if (copyToast) {
            copyToast.classList.add("show");
            setTimeout(() => {
              copyToast.classList.remove("show");
            }, 2000);
          }

          setTimeout(() => {
            btn.innerText = originalIcon;
          }, 1500);
        })
        .catch(err => {
          console.error("Copy failed:", err);
          alert("Unable to copy account number. Please copy manually.");
        });
    });
  });
}

/* --- Referral / Promo Code Handling --- */
const referralCodeInput = document.getElementById("referralCodeInput");

// Extract referral code from URL query parameters (e.g. ?ref=FUNKE, ?code=FUNKE, ?referrer=FUNKE)
function getUrlReferralCode() {
  const urlParams = new URLSearchParams(window.location.search);
  return (urlParams.get("ref") || urlParams.get("code") || urlParams.get("referrer") || urlParams.get("src") || "").trim();
}

// Capture & store referral code if present in URL
const urlRefCode = getUrlReferralCode();
if (urlRefCode) {
  try {
    sessionStorage.setItem("jun_referral_code", urlRefCode.toUpperCase());
    sessionStorage.setItem("jun_ref_from_url", "true");
  } catch (e) {
    console.warn("Unable to save referral code to sessionStorage:", e);
  }
}

// Pre-fill input field with stored referral code
function updateReferralCodeInput() {
  if (!referralCodeInput) return;
  try {
    const savedCode = sessionStorage.getItem("jun_referral_code");
    const isFromUrl = sessionStorage.getItem("jun_ref_from_url") === "true";

    if (savedCode) {
      referralCodeInput.value = savedCode;
      if (isFromUrl) {
        referralCodeInput.readOnly = true;
        referralCodeInput.classList.add("readonly-ref-input");
        referralCodeInput.title = "Referral code applied automatically via referral link";
      }
    }
  } catch (e) {
    console.warn("Unable to read referral code from sessionStorage:", e);
  }
}

// Save manual edits to sessionStorage (only when not locked by URL)
if (referralCodeInput) {
  referralCodeInput.addEventListener("input", (e) => {
    if (referralCodeInput.readOnly) return;
    const codeVal = e.target.value.trim().toUpperCase();
    try {
      if (codeVal) {
        sessionStorage.setItem("jun_referral_code", codeVal);
      } else {
        sessionStorage.removeItem("jun_referral_code");
      }
    } catch (e) {
      console.warn("Unable to update referral code in sessionStorage:", e);
    }
  });
}

// Initial populate on script load
updateReferralCodeInput();

