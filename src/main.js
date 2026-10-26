import "./style.css";

const emailInput = document.querySelector("#email");
const emailForm = emailInput.form;
const emailError = document.querySelector("#email-error");

emailForm.noValidate = true;

function updateEmailError() {
  const isValid = emailInput.validity.valid;
  emailError.hidden = isValid;
  emailInput.setAttribute("aria-invalid", String(!isValid));
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
const backgroundStates = new Map();
const desktopViewport = window.matchMedia("(min-width: 64rem)");

function getMenuControls() {
  return [...mobileMenu.querySelectorAll("a[href], button, [tabindex]")].filter(
    (element) =>
      element.tabIndex >= 0 &&
      !element.matches(":disabled") &&
      !element.closest("[inert]") &&
      element.checkVisibility({ visibilityProperty: true }),
  );
}

function focusMenu() {
  const controls = getMenuControls();
  const target = controls.includes(closeButton) ? closeButton : controls[0];
  (target ?? mobileMenu).focus();
}

function closeMenu() {
  if (mobileMenu.hidden) return;

  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  backgroundStates.forEach((wasInert, element) => {
    element.inert = wasInert;
  });
  backgroundStates.clear();

  const focusTarget = desktopViewport.matches
    ? document.querySelector("header a")
    : menuButton;
  focusTarget.focus();
}

menuButton.addEventListener("click", () => {
  if (!mobileMenu.hidden || desktopViewport.matches) return;

  mobileMenu.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  focusMenu();
  [...document.body.children].forEach((element) => {
    if (element !== mobileMenu && element instanceof HTMLElement) {
      backgroundStates.set(element, element.inert);
      element.inert = true;
    }
  });
});

closeButton.addEventListener("click", closeMenu);

mobileMenu.addEventListener("click", (event) => {
  // Restore focus after the browser finishes the link's default navigation.
  if (event.target.closest("a")) setTimeout(closeMenu, 0);
});

document.addEventListener("keydown", (event) => {
  if (mobileMenu.hidden) return;

  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
  } else if (event.key === "Tab") {
    const controls = getMenuControls();
    const first = controls[0];
    const last = controls.at(-1);
    const active = document.activeElement;

    if (!controls.length) {
      event.preventDefault();
      mobileMenu.focus();
    } else if (!controls.includes(active)) {
      event.preventDefault();
      (event.shiftKey ? last : first).focus();
    } else if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

document.addEventListener("focusin", (event) => {
  if (!mobileMenu.hidden && !mobileMenu.contains(event.target)) focusMenu();
});

desktopViewport.addEventListener("change", (event) => {
  if (event.matches) closeMenu();
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
