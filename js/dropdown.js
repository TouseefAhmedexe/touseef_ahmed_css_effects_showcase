export function setupDropdown(onChoose) {
    const dropdown = document.querySelector(".dropdown");

    if (dropdown === null) {
        throw new Error("The dropdown is missing from the page.");
    }

    const button = dropdown.querySelector(".dropdown__button");
    const menu = dropdown.querySelector(".dropdown__menu");
    const isOpen = () => button.getAttribute("aria-expanded") === "true";
    const setOpen = (open) => button.setAttribute("aria-expanded", String(open));

    button.addEventListener("click", () => setOpen(!isOpen()));

    menu.addEventListener("click", (event) => {
        const item = event.target.closest("[data-filter]");

        if (item !== null) {
            setOpen(false);
            onChoose(item.dataset.filter);
        }
    });

    document.addEventListener("click", (event) => {
        if (!dropdown.contains(event.target)) {
            setOpen(false);
        }
    });

    dropdown.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isOpen()) {
            event.preventDefault();
            setOpen(false);
            button.focus();
        }
    });

    dropdown.addEventListener("focusout", (event) => {
        if (event.relatedTarget !== null && !dropdown.contains(event.relatedTarget)) {
            setOpen(false);
        }
    });
}
