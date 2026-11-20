# Aurora Studio: CSS Effects Showcase

A product showcase and creative portfolio built to practice advanced CSS: animations, 3D transforms,
gradients, clipping, masks, blend modes, filters, scroll-driven animations and view transitions.
Task 20 of my Bloomrix internship. No framework or library is used. All products, prices and projects
are sample content.

## Files
- index.html - the page
- css/ - tokens, base, layout, components, hero, products, lab, portfolio, effects, motion
- js/ - small modules for the interactive parts, and early.js (a classic script in the head)
- images/ - the photos used on the page
- screenshots/ and recording/ - evidence of the effects

## CSS structure
tokens.css declares the cascade layers: reset, tokens, base, layout, components, effects, utilities,
motion. A later layer always beats an earlier one, so there is no !important. The motion layer is
last, so the reduced motion rules win over everything.

## Where each requirement is
- Hero with an animated background: hero.css. Gradient blobs drift (transform), a conic gradient ring
  turns, rings and clip-path shapes float, and the heading words appear one after another.
- 3D product cards: products.css. perspective on the parent, preserve-3d on the card, rotateX and
  rotateY, translateZ for depth, image zoom and a sheen. With a mouse and JavaScript the tilt follows
  the pointer. Without JavaScript the hover and focus tilt is fixed.
- Visual effects: glassmorphism (backdrop-filter), gradient text, animated gradients, clip-path shapes,
  image masks, blend modes, an animated border, filters and a 3D flip. All are in the Effects lab.
- Portfolio: six project cards with zoom and lift hover effects, a category filter and a lightbox.
- Scroll animations: effects.css uses animation-timeline: view() for reveals and parallax, and
  scroll() for the progress bar and the hero layers.
- Parallax: hero layers move at two speeds, and the band has three layers at three speeds.
- Navigation: layout.css. Animated underline, hover and focus states, and a mobile menu built with a
  checkbox and :has().
- Components: an accordion (aria-expanded and :has()), a dropdown, a modal and a lightbox (the native
  dialog element), and buttons with a sheen.
- View Transitions: gallery.js. If document.startViewTransition does not exist, the filter just
  changes the cards.
- Reduced motion: motion.css, plus checks in the JavaScript.

## Browser support and fallbacks
- Scroll-driven animations: checked with @supports and CSS.supports. Without support, early.js adds
  no-scroll-timeline, and scroll-fallback.js uses a scroll listener for the progress bar and an
  IntersectionObserver for the reveals. The parallax layers stay still.
- View transitions: checked with typeof document.startViewTransition.
- backdrop-filter, background-clip: text and :has(): checked with @supports, with a solid or simpler
  version as the fallback.
- Support for these features changes. Check MDN or caniuse.com before relying on them.

## Accessibility
- A skip link, labels on every control, and a visible yellow focus ring on every interactive element.
- Text sits on dark panels or on a dark gradient over photos. The colors were chosen for contrast and
  checked in DevTools.
- Decorative elements use aria-hidden. Buttons that toggle use aria-expanded or aria-pressed.
- With reduced motion, animations, parallax, tilt and view transitions are off, and all content is
  visible. The scroll progress bar stays.
- Everything that works with the mouse also works with the keyboard.

## Performance
- Most animations use transform and opacity.
- Not only transform and opacity: the hero gradient word animates background-position, the accordion
  animates grid-template-rows, the shape tile transitions clip-path, and gallery images transition
  filter. Each one is small, and only runs while it is hovered, toggled or in view.
- backdrop-filter is used on the header, three glass panels and the dialog backdrop. There is no
  animated blur.
- will-change is used only on a hovered card and on layers that scroll animations move.
- The pointer tilt reads the card size once, writes a custom property in requestAnimationFrame, and
  lets the CSS animate transform.
- Images have width and height, so the page does not jump while they load.

## Limits
- The page uses one dark theme.
- Parallax needs scroll-driven animations. Without them the layers stay still.
- The tilt follows only a mouse. Touch screens get the fixed hover and focus tilt.
- Without JavaScript the filter, dropdown, dialogs and quick view buttons are hidden or inactive.

## How to run
Open the folder in Visual Studio Code and use Live Server. Modules do not work when index.html is
opened by double-clicking it