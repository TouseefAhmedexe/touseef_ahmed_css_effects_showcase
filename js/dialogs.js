import { closeOnBackdrop, requireElement } from "./dom.js";

export function setupQuickView() {
    const dialog = requireElement("quick-view");
    const media = requireElement("quick-view-media");
    const title = requireElement("quick-view-title");
    const price = requireElement("quick-view-price");
    const text = requireElement("quick-view-text");
    const features = requireElement("quick-view-features");

    document.querySelectorAll("[data-quick-view]").forEach((button) => {
        button.addEventListener("click", () => {
            const card = button.closest(".product__card");
            const image = card.querySelector(".product__image").cloneNode(true);

            image.className = "modal__image";
            media.textContent = "";
            media.append(image);
            title.textContent = card.querySelector(".product__title").textContent;
            price.textContent = card.querySelector(".product__price").textContent;
            text.textContent = card.querySelector(".product__text").textContent;
            features.textContent = "";
            card.querySelectorAll(".product__features li").forEach((item) => {
                features.append(item.cloneNode(true));
            });
            dialog.showModal();
        });
    });

    dialog.querySelectorAll("[data-close]").forEach((button) => {
        button.addEventListener("click", () => dialog.close());
    });
    closeOnBackdrop(dialog);
}

export function setupLightbox(getItems) {
    const dialog = requireElement("lightbox");
    const gallery = requireElement("gallery");
    const media = requireElement("lightbox-media");
    const category = requireElement("lightbox-category");
    const title = requireElement("lightbox-title");
    const text = requireElement("lightbox-text");
    const counter = requireElement("lightbox-counter");
    const previous = requireElement("lightbox-prev");
    const next = requireElement("lightbox-next");
    const close = requireElement("lightbox-close");
    let items = [];
    let index = 0;

    function show(newIndex) {
        index = (newIndex + items.length) % items.length;

        const item = items[index];
        const image = item.querySelector(".project__image").cloneNode(true);

        image.className = "lightbox__image";
        media.textContent = "";
        media.append(image);
        category.textContent = item.querySelector(".project__category").textContent;
        title.textContent = item.querySelector(".project__title").textContent;
        text.textContent = item.querySelector(".project__text").textContent;
        counter.textContent = `${index + 1} of ${items.length}`;
        previous.disabled = items.length < 2;
        next.disabled = items.length < 2;
    }

    gallery.addEventListener("click", (event) => {
        const button = event.target.closest(".project__open");

        if (button === null) {
            return;
        }

        items = getItems();

        const startIndex = items.indexOf(button.closest(".project"));

        if (startIndex === -1) {
            return;
        }

        show(startIndex);
        dialog.showModal();
    });

    previous.addEventListener("click", () => show(index - 1));
    next.addEventListener("click", () => show(index + 1));
    close.addEventListener("click", () => dialog.close());

    dialog.addEventListener("keydown", (event) => {
        if (event.key === "ArrowLeft" && items.length > 1) {
            show(index - 1);
        }

        if (event.key === "ArrowRight" && items.length > 1) {
            show(index + 1);
        }
    });

    closeOnBackdrop(dialog);
}
