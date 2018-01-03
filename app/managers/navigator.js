/**
 * State navigation manager (application controller).
 * @module managers/navigation
 */

define([
    "director",
    "views/dashboard/dashboardView"

], function (director, dashboardView) {

    "use strict"

    var config;
    var router;

    // State cache
    // TODO - Provisional solution to clean page before render the current one...
    var previousPage;
    var currentPage;

    /**
     *
     * @param {*} setup
     */
    function init(setup) {
        config = setup || {};
        console.log(">>>> NAVIGATOR")
        console.log(config)
        dashboardView.load(config);
        _initRouter();
    }

    /**
     * Router setup and initialization
     * @returns {Router} Director's Router
     */
    function _initRouter() {

        router = Router;

        // customization
        var notFound = function () {
            router.setRoute('/');
        };
        var options = {
            notfound: notFound,
        }
        router.configure(options);

        // add routes
        _addRoutes(router);

        // finally, init the navigation
        router.init('/');

        return router;
    }


    /**
     * Maps the urls (pages) with corresponding handlers
     */
    function _addRoutes(router) {

        var initialMap = function () {
            // _navigateToPage('map', 'initial');
            router.setRoute('/rock-climbing');
        };

        var rockClimbing = function (areaId, sectionId) {
            _navigateToPage('map', 'rock-climbing', arguments);
        };

        var mountaineering = function () {
            _navigateToPage('map', 'mountaineering', arguments);
        };

        var trekking = function () {
            _navigateToPage('map', 'trekking', arguments);
        };

        var userHandler = function () {
            _navigateToPage('user');
        };

        var communityHandler = function () {
            _navigateToPage('community');
        };

        var appHandler = function () {
            _navigateToPage('app');
        };

        var errorHandler = function () {
            _navigateToPage('error');
        };


        // home page (default)
        router.on('/', home);

        // locations list
        router.on('/mountaineering', locationsListHandler);

        // locations map
        router.on('/locations-map/', locationsMapHandler);

        // user profile page
        router.on('/profile', profileHandler);

        // not found page
        router.on('/not-found', notFoundHandler);

        // error page
        router.on('/error', errorHandler);

    }


    /**
     * App state changes (dashboard and pages)
     * @param {*} page
     * @param {*} context
     */

    function _navigateToPage(page, context, args) {
        if (!page) return;
        _updatePageState(page);
        // dashboard view controller
        dashboardView.loadPage(currentPage, previousPage, context, args);
    }


    function _updatePageState(page) {
        previousPage = currentPage;
        currentPage = page;
    }


    return {
        init: init
    }

});