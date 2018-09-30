import $ from "jquery";

import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import StickyHeader from "./modules/StickyHeader";

new MobileMenu();
new RevealOnScroll({
    elems : $(".feature-item"),
    offset : "85%",
    addClasses : "reveal-item--md-transition-fast",
    transitionDelay : "0.15s"
});
new RevealOnScroll({
    elems : $(".testimonial"),
    offset : "65%",
    addClasses : "reveal-item--md-transition",
    transitionDelay : "0.1s"
});
new StickyHeader();