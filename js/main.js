import { setupAccordion } from "./accordion.js";
import { setupLightbox, setupQuickView } from "./dialogs.js";
import { setupDropdown } from "./dropdown.js";
import { setupFlip } from "./flip.js";
import { setupGallery } from "./gallery.js";
import { setupMobileMenu } from "./nav.js";
import { setupScrollFallback } from "./scroll-fallback.js";
import { setupTilt } from "./tilt.js";

function revealJavaScriptControls() {
    document.querySelectorAll("[data-requires-js]").forEach((element) => {
        element.hidden = false;
    });
}

function goToPortfolio() {
    const title = document.getElementById("portfolio-title");

    if (title === null) {
        return;
    }

    title.scrollIntoView();
    title.focus({ preventScroll: true });
}

function start() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const gallery = setupGallery(reducedMotion);

    revealJavaScriptControls();
    setupMobileMenu();
    setupDropdown((category) => {
        gallery.setCategory(category);
        goToPortfolio();
    });
    setupAccordion();
    setupQuickView();
    setupLightbox(gallery.visibleItems);
    setupTilt(document.querySelectorAll(".product"), reducedMotion);
    setupFlip();
    setupScrollFallback();
}

start();
