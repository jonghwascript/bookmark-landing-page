import "./style.css";

const emailInput = document.querySelector("#email");
const emailForm = emailInput.form;
const emailError = document.querySelector("#email-error");

emailForm.noValidate = true;

function updateEmailError() {
  const isValid = emailInput.validity.valid;
  emailError.hidden = isValid;
  emailInput.setAttribute("aria-invalid", String(!isValid));
  // A hidden element still supplies its text when referenced by ID.
  if (isValid) {
    emailInput.removeAttribute("aria-describedby");
  } else {
    emailInput.setAttribute("aria-describedby", emailError.id);
  }
  return isValid;
}

emailForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!updateEmailError()) {
    emailInput.focus();
  }
});

emailInput.addEventListener("input", () => {
  if (emailInput.getAttribute("aria-invalid") === "true") {
    updateEmailError();
  }
});

const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.querySelector("#mobile-menu");
const closeButton = mobileMenu.querySelector("button");
const desktopViewport = window.matchMedia("(min-width: 64rem)");

menuButton.addEventListener("click", () => {
  if (mobileMenu.open || desktopViewport.matches) return;

  mobileMenu.showModal();
  menuButton.setAttribute("aria-expanded", "true");
});

closeButton.addEventListener("click", () => mobileMenu.close());

// Every close path (button, Escape, link, viewport change) ends here.
mobileMenu.addEventListener("close", () => {
  menuButton.setAttribute("aria-expanded", "false");
  // The dialog returns focus to the trigger, which is hidden on desktop.
  if (desktopViewport.matches) document.querySelector("header a").focus();
});

mobileMenu.addEventListener("click", (event) => {
  // Restore focus after the browser finishes the link's default navigation.
  if (event.target.closest("a")) setTimeout(() => mobileMenu.close(), 0);
});

desktopViewport.addEventListener("change", (event) => {
  if (event.matches) mobileMenu.close();
});

const featureLinks = document.querySelectorAll('nav[aria-label="Features"] a');

featureLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    featureLinks.forEach((featureLink) => {
      const isSelected = featureLink === link;
      const panel = document.getElementById(featureLink.hash.slice(1));

      panel.hidden = !isSelected;

      if (isSelected) {
        featureLink.setAttribute("aria-current", "location");
      } else {
        featureLink.removeAttribute("aria-current");
      }
    });
  });
});
