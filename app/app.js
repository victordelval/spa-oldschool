/**
 * RequireJS configuration of the application.
 */

requirejs.config({

        baseUrl: "./",

        shim: {
            "bootstrap": {
                "deps": [ "jquery" ]
            }
        },

        paths: {
            // Core libs
            "text":             "../lib/text",
            "jquery":           "../lib/jquery-3.2.1",
            "bootstrap":        "../lib/bootstrap.bundle.4.0.0-beta.2",
            "handlebars":       "../lib/handlebars-v4.0.10",
            "director":         "../lib/director",
            "pubsub":           "../lib/pubsub",

            // Components libs
            // "pace":             "lib/components/pace/pace.min",
            "alertify":         "../lib/alertify.min",
            // "spin":             "lib/components/spinjs/spin",
            // "leaflet":          "lib/components/leaflet-1.0.3/leaflet",
            // "leafletDraw":      "lib/components/leaflet-draw-0.3/leaflet.draw",


            // Application scripts
            "setup":            "app/core/setup",
            "core":             "app/core",
            "managers":         "app/managers",
            "models":           "app/models",
            "views":            "app/views",

        },


    });



    /**
     * Starting point of the application.
     */

    require(['setup'], function (setup) {
        setup.run();
    });
