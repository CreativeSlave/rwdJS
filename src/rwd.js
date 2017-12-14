/**
 *
 * @type {{getInstance}}
 */
let RWD = (function RWD() {
    let rwdinstance;
    /**
     * ## RWDjs is a Singleton
     * Responsive Events to complement Bootstrap
     *
     * It's amazing how many times I needed to invoke an event based on the
     * media query styles found in TW Bootstrap to accompany CSS changes to achieve
     * user interface goals. One might not think they need it unil they do, and then
     * they just find an ugly work around. BUT, this is so simple it's hard to believe
     * this was not included with bootstrap.
     *
     * Events use the following keys: ["xs", "sm", "md", "lg", "lx"];
     * I hope you notice the simularity in Bootstrap's column css classNames.
     * The intention is to keep this VERY simple, and easy to remember.
     *
     * #### KISS - Keep It Simple
     *
     * @usage rwd.on("xs",function(){})
     *
     * @usage
     * ```javascript
     * // Get the instance
     * let rwd = RWD.getInstance();
     * // Add and Event; This will trigger for a small screen.
     * rwd.on("sm", function(){ ...  });
     *
     *
     * let rwd = RWD.getInstance(); // Singleton
     * // Create an Event for Phones
     * rwd.on("xs", function () {
         *    console.log("RWD: Mobile; This fires if and when the screen is set for Mobile Phones, just like media queries.");
         * })
     *
     * // Create an Event for Tablets
     * rwd.on("sm", function () {
         *    console.log("RWD: Tablets; This fires if and when the screen is set for Tablets, just like media queries.");
         * });
     *
     * ```
     * @type {{getInstance}}
     * @author Drew Ambrose
     *
     * MIT
     **/
    let rwd = {
        size: "",
        lastEvent: "",
        config: [],
        /**
         * ## Invoke all events
         * @private
         * @param size
         */
        invoke: function (size) {
            if (rwd.events[size] && rwd.lastEvent !== size) {
                let eventList = rwd.events[size];
                let len = eventList.length;
                for (let index = 0; index < len; index++) {
                    if (rwd.events[size][index].func !== "") {
                        rwd.events[size][index].func(rwd.events[size][index].args);
                    }
                }
                rwd.lastEvent = size;
            }
        },
        /**
         * Object Map of Events
         * Keys: "xs", "sm", "md", "lg", "lx"
         * @public
         */
        events: {},
        /**
         * ## "rwd.on(String, Function)" Event
         * @public
         * @param size
         * @param func
         * @param args
         */
        on: function (size, func, args) {
            rwd.addEvent(size, func, args);
            rwd.onload();
        },
        addEvent: function (size, func, args) {
            if (!rwd.events[size]) {
                rwd.events[size] = [];
            }
            rwd.events[size].push(
                {
                    args: args || [],
                    func: func || function (args) {
                    }
                }
            );
        },
        /**
         * ## Get Size (String)
         * @public
         * Returns one of the following: "xs", "sm", "md", "lg", "lx";
         * @returns {String}
         */
        getSize: function () {
            return rwd.dimensions.checkSize(jQuery(window).width()).size;
        },
        /**
         * dimensions
         * @private
         */
        dimensions: {
            box: "",
            sizes: [
                {name: "xs", w: 576},
                {name: "sm", w: 768},
                {name: "md", w: 992},
                {name: "lg", w: 1200},
                {name: "xl", w: 1900}
                ],
            checkSize: function (w) {
                let hasChanged = false;
                let newBoxSize = "";
                let xs = rwd.dimensions.sizes[0];
                for (let b in rwd.dimensions.sizes) {
                    let box = rwd.dimensions.sizes[b];
                    if (w < xs.w) {
                        newBoxSize = xs.name;
                    }
                    if (w >= box.w) {
                        newBoxSize = box.name;
                    }
                }
                if (newBoxSize !== rwd.dimensions.box) {
                    hasChanged = true;
                    rwd.dimensions.box = newBoxSize;
                }
                return {changed: hasChanged, size: newBoxSize};
            }
        },
        /**
         * hasLoaded
         * @private
         */
        hasLoaded: false,
        /**
         * OnLoad
         * @public
         */
        onload: function () {
            setTimeout(function () {
                let w = jQuery(window).width();
                if (!rwd.hasLoaded && w) {
                    let ws = rwd.dimensions.checkSize(w).size;
                    // console.log("OnLoad: call '" + ws + "'")
                    rwd.invoke(ws);
                    rwd.hasLoaded = true;
                }
            }, 50);
        }
    };
    /**
     * rwd.init()
     * Initiates the RWD Class
     * @private
     */
    rwd.init = function init() {
        if(!jQuery){
            console.warn("This version of RWDjs requires jQuery.");
        } else {
            jQuery(window).resize(function () {
                let w = jQuery(window).width();
                let ws = rwd.dimensions.checkSize(w);
                if (ws.changed) {
                    try {
                        rwd.invoke(ws.size);
                    } catch (lgError) {
                    }
                }
            });
        }

    };
    return {
        /**
         * ## RWDjs is a Singleton
         *
         * @purpose It's amazing how many times I needed to invoke an event based on the
         * media query styles found in TW Bootstrap to accompany CSS changes to achieve
         * user interface goals. One might not think they need it unil they do, and then
         * they just find an ugly work around. BUT, this is so simple it's hard to believe
         * this was not included with bootstrap.
         *
         * Events use the following keys: ["xs", "sm", "md", "lg", "lx"];
         * I hope you notice the simularity in Bootstrap's column css classNames.
         * The intention is to keep this VERY simple, and easy to remember.
         *
         * #### KISS - Keep It Simple
         *
         * @usage
         * ```javascript
         * // Get the instance
         * let rwd = RWD.getInstance();
         * // Add and Event; This will trigger for a small screen.
         * rwd.on("sm", function(){ ...  });
         *
         *
         * let rwd = RWD.getInstance(); // Singleton
         * // Create an Event for Phones
         * rwd.on("xs", function () {
         *    console.log("RWD: Mobile; This fires if and when the screen is set for Mobile Phones, just like media queries.");
         * })
         *
         * // Create an Event for Tablets
         * rwd.on("sm", function () {
         *    console.log("RWD: Tablets; This fires if and when the screen is set for Tablets, just like media queries.");
         * });
         *
         * ```
         * @type {{getInstance}}
         * @author Drew Ambrose
         *
         * MIT
         **/
        getInstance: function () {
            if (!rwdinstance) {
                rwdinstance = {
                    events:  rwd.events,
                    onload:  rwd.onload,
                    getSize: rwd.getSize,
                    on: rwd.on,
                    init: rwd.init()
                };
                rwdinstance.init();
            }
            return rwdinstance;
        }
    }
})();