import { requireElement } from "./dom.js";

export function setupAccordion() {
    const accordion = requireElement("accordion");

    accordion.addEventListener("click", (event) => {
        const button = event.target.closest(".accordion__button");

        if (button === null) {
            return;
        }

        const isOpen = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isOpen));
    });
}
