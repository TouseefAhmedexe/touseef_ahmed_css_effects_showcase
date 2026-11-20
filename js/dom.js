export function requireElement(id) {
    const element = document.getElementById(id);

    if (element === null) {
        throw new Error(`The element #${id} is missing from the page.`);
    }

    return element;
}

export function closeOnBackdrop(dialog) {
    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
}
