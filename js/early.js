function prepareDocument() {
    const root = document.documentElement;

    root.classList.add("js");

    if (!CSS.supports("animation-timeline: view()")) {
        root.classList.add("no-scroll-timeline");
    }
}

prepareDocument();
