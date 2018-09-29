import MobileMenu from "./modules/MobileMenu";
import RevealOnScroll from "./modules/RevealOnScroll";
import $ from "jquery";

var mobileMenu = new MobileMenu();
new RevealOnScroll({
    elems : $(".feature-item"),
    offset : "85%",
    addClasses : "reveal-item--md-transition"
});
new RevealOnScroll({
    elems : $(".testimonial"),
    offset : "65%",
    addClasses : "reveal-item--md-transition",
    transitionDelay : "0.1s"
});
