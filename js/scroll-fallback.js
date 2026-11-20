import { requireElement } from "./dom.js";

export function setupScrollFallback() {
    const root = document.documentElement;

    if (!root.classList.contains("no-scroll-timeline")) {
        return false;
    }

    const bar = requireElement("progress-bar");
    const revealItems = [...document.querySelectorAll(".reveal")];
    let waiting = false;

    function updateProgress() {
        const maximum = root.scrollHeight - window.innerHeight;
        const ratio = maximum <= 0 ? 0 : Math.min(window.scrollY / maximum, 1);

        bar.style.setProperty("--progress", ratio.toFixed(4));
    }

    window.addEventListener(
        "scroll",
        () => {
            if (waiting) {
                return;
            }

            waiting = true;
            window.requestAnimationFrame(() => {
                updateProgress();
                waiting = false;
            });
        },
        { passive: true }
    );
    window.addEventListener("resize", updateProgress);
    updateProgress();

    if (!("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return true;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
    return true;
}
