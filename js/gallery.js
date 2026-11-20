import { requireElement } from "./dom.js";

export function setupGallery(reducedMotion) {
    const gallery = requireElement("gallery");
    const status = requireElement("filter-status");
    const radios = [...document.querySelectorAll('input[name="category"]')];
    const items = [...gallery.querySelectorAll(".project")];

    const matches = (item, category) => category === "all" || item.dataset.category === category;
    const visibleItems = () => items.filter((item) => !item.hidden);

    function apply(category) {
        items.forEach((item) => {
            item.hidden = !matches(item, category);
        });
        status.textContent = `Showing ${visibleItems().length} of ${items.length} projects.`;
    }

    function update(category) {
        const canTransition = typeof document.startViewTransition === "function" && !reducedMotion.matches;

        if (canTransition) {
            document.startViewTransition(() => apply(category));
        } else {
            apply(category);
        }
    }

    radios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (radio.checked) {
                update(radio.value);
            }
        });
    });

    apply(radios.find((radio) => radio.checked)?.value ?? "all");

    return {
        visibleItems,
        setCategory(category) {
            const radio = radios.find((item) => item.value === category);

            if (radio === undefined) {
                return false;
            }

            radio.checked = true;
            update(category);
            return true;
        }
    };
}
