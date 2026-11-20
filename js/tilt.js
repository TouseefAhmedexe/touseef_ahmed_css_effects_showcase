const MAX_TILT = 8;

export function setupTilt(hosts, reducedMotion) {
    hosts.forEach((host) => {
        const card = host.querySelector(".product__card");

        if (card === null) {
            return;
        }

        let bounds = null;
        let frame = 0;

        host.addEventListener("pointerenter", (event) => {
            if (event.pointerType === "mouse") {
                bounds = host.getBoundingClientRect();
            }
        });

        host.addEventListener("pointermove", (event) => {
            if (bounds === null || reducedMotion.matches) {
                return;
            }

            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            window.cancelAnimationFrame(frame);
            frame = window.requestAnimationFrame(() => {
                card.style.setProperty("--tilt-x", `${(-y * MAX_TILT * 2).toFixed(1)}deg`);
                card.style.setProperty("--tilt-y", `${(x * MAX_TILT * 2).toFixed(1)}deg`);
            });
        });

        host.addEventListener("pointerleave", () => {
            bounds = null;
            window.cancelAnimationFrame(frame);
            card.style.removeProperty("--tilt-x");
            card.style.removeProperty("--tilt-y");
        });
    });
}
