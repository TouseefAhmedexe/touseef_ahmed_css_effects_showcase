import { requireElement } from "./dom.js";

export function setupMobileMenu() {
    const toggle = requireElement("nav-toggle");
    const nav = document.querySelector(".site-nav");

    if (nav === null) {
        throw new Error("The navigation is missing from the page.");
    }

    nav.addEventListener("click", (event) => {
        if (event.target.closest("a, [data-filter]") !== null) {
            toggle.checked = false;
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && toggle.checked && !event.defaultPrevented) {
            toggle.checked = false;
            toggle.focus();
        }
    });
}
