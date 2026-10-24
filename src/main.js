import "./style.css";

const menuButton = document.querySelector('[aria-controls="mobile-menu"]');
const mobileMenu = document.querySelector("#mobile-menu");
const closeButton = mobileMenu.querySelector("button");

function closeMenu() {
  mobileMenu.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.focus();
}

menuButton.addEventListener("click", () => {
  mobileMenu.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  closeButton.focus();
});

closeButton.addEventListener("click", closeMenu);

mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !mobileMenu.hidden) closeMenu();
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
