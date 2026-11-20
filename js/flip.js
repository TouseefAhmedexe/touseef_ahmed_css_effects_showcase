export function setupFlip() {
    document.querySelectorAll(".flip__button").forEach((button) => {
        button.addEventListener("click", () => {
            const isPressed = button.getAttribute("aria-pressed") === "true";

            button.setAttribute("aria-pressed", String(!isPressed));
        });
    });
}
