import $ from "jquery";
import waypoints from "waypoints/lib/noframework.waypoints";

class RevealOnScroll{
    /**
     * @param {Object} inParams
     * @param {Object} inParams.elems - jQuery object
     * @param {string} inParams.offset - waypoints offset
     * @param {number} inParams.transitionDelay
     * @param {string} inParams.addClasses - add extra classes
     */
    constructor(inParams){
        this.properties = $.extend({}, inParams);

        this.hideInitially();
        this.setupTransitionDelay();
        this.setupAddClasses();
        this.createWaypoints();
    }

    hideInitially(){
        this.properties.elems.addClass("reveal-item");
    }

    setupTransitionDelay(){
        if(this.properties.transitionDelay){
            var delay = parseFloat(this.properties.transitionDelay);
            var counter = 0;
            this.properties.elems.each(function(){
                $(this).css("transition-delay", (delay * counter) + "s");
                counter++;
            });
        }
    }

    setupAddClasses(){
        if(typeof this.properties.addClasses == "string"){
            this.properties.elems.addClass(this.properties.addClasses);
        }
    }

    createWaypoints(){
        var that = this;
        this.properties.elems.each(function(index, currentItem){
            new Waypoint({
                element: currentItem,
                handler: function() {
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: that.properties.offset
            });
        });
    }
}

export default RevealOnScroll;