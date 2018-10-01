import $ from "jquery";
import "waypoints/lib/noframework.waypoints";
import "jquery-smooth-scroll";

class StickyHeader{
    constructor(){
        this.siteHeader = $(".site-header");
        this.headerTriggerElement = $(".large-hero__title");
        this.pageSections = $(".page-section");
        this.headerLinks = $(".primary-nav__item");

        this.addSmoothScroll();
        this.createHeaderWaypoints();
        this.createPageSectionWaypoints();
    }

    addSmoothScroll(){
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoints(){
        var that = this;
        new Waypoint({
            group: "header",
            element: that.headerTriggerElement[0],
            handler: function (direction) {
                if(direction == "down"){
                    that.siteHeader.addClass("site-header--md-dark")
                }else{
                    that.siteHeader.removeClass("site-header--md-dark")
                }
            }
        });
    }

    createPageSectionWaypoints(){
        var that = this;

        var scrollDownOffset = 0.25;
        var scrollUpOffset = 0.65;

        this.pageSections.each(function (index, currentPageSection) {
            var linkId = $(currentPageSection).attr("data-matching-link");

            // enter page section on scroll down
            new Waypoint({
                group: "pageSections.scrollDown.enter",
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "down") {
                        that.selectPrimaryNavItem(linkId);
                    }
                },
                offset: function(){
                    return $(window).height() * scrollDownOffset;
                }
            });

            // leave page section on scroll down
            new Waypoint({
                group: "pageSections.scrollDown.leave",
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "down") {
                        that.unselectPrimaryNavItem(linkId);
                    }
                },
                offset: function(){
                    return -$(this.element).outerHeight() + $(window).height() * scrollDownOffset;
                }
            });
    
            // enter page section on scroll up
            new Waypoint({
                group: "pageSections.scrollUp.enter",
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up") {
                        that.selectPrimaryNavItem(linkId);
                    }
                },
                offset: function(){
                    return -$(this.element).outerHeight() + $(window).height() * scrollUpOffset;
                }
            });

            // leave page section on scroll up
            new Waypoint({
                group: "pageSections.scrollUp.leave",
                element: currentPageSection,
                handler: function (direction) {
                    if (direction == "up") {
                        that.unselectPrimaryNavItem(linkId);
                    }
                },
                offset: function(){
                    return $(window).height() * scrollUpOffset;
                }
            });
        });
    }

    selectPrimaryNavItem(inId){
        $(inId).addClass("primary-nav__item--is-selected");
    }

    unselectPrimaryNavItem(inId){
        $(inId).removeClass("primary-nav__item--is-selected");
    }
}

export default StickyHeader;