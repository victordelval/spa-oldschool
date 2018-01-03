/**
 * Dashboard frame (view controller).
 * @module view/dashboard/dashboardAppView
 */

define([
    // "core/dom",
    "managers/connector",
    "alertify",
    // components
    "views/dashboard/components/menu-dashboard/dashboardMenu",
    "views/dashboard/components/modal/modal",
    // views
    "views/home/homePageView",
    "views/locations-list/locationsListPageView",
    "views/locations-map/locationsMapPageView",
    "views/profile/profilePageView"

], function (
    DOM, connector, alertify,
    DashboardMenu, Modal, LoginForm, RegisterForm,
    mapPageView, userMainPageView, communityMainPageView, appMainPageView) {

    "use strict"

    /**
     * This view is responsible for the representation of the Dashboard
     * controlling the behavior of the corresponding Dashboard object.
     * Only answers requests from the navigation manager.
     * Only talks to pages view controllers (lower level)
     * Has some components (dashboard menu)
     * Listen to global dashboard events
     */


    var dashboard;
    var dashboardId = "dashboard";

    var config; // the user data, if logged


    /**
     * Initialize the dashboard creating and setting up the object,
     * and rendering the dashboard frame templates.
     * @param {GlobalConfig} config
     */
    function load(inputConfig) {

        config = inputConfig;

        // init dashboard components
        var dashboardMenu = new DashboardMenu("dashboardMenu", dashboardId);
        dashboardMenu.render(config);

        var dashboardModal = new Modal("dashboardModal", dashboardId)
        // see TODO s below
        var loginForm = new LoginForm("loginForm", dashboardId)
        var registerForm = new RegisterForm("registerForm", dashboardId)

        // Logout
        $(document).on('click', '#logoutBtn', function () {
            logout();
        });

        // TODO - remove DOM manipulation from components and do it here...

        // Login
        // TODO - check if fuser is already logged to build the form or not
        $(document).on('click', '#loginBtn', function () {
            // show modal with login form
            dashboardModal.empty();
            var form = loginForm.render();
            dashboardModal.update({
                title: "Login form",
                body: form,
                footer: false, // to hide
            });
            dashboardModal.show();
        });

        $(document).on('submit', '#loginForm', function (event) {
            event.preventDefault();
            var credentials = $("#loginForm").serialize();
            login(credentials);
        });

        // register
        // TODO - check if fuser is already logged to build the form or not
        $(document).on('click', '#registerBtn', function () {
            // show modal with register form
            dashboardModal.empty();
            var form = registerForm.render();
            dashboardModal.update({
                title: "Register form",
                body: form,
                footer: false, // to hide
            });
            dashboardModal.show();
        });

        $(document).on('submit', '#registerForm', function () {
            // register();
            event.preventDefault();
            var userData = $("#registerForm").serialize();
            register(dashboardModal, userData);
        });
    }


    /**
     * Calls the view controller of the target page passing the config..
     *
     * @param {*} page
     * @param {*} previousPage
     * @param {*} context
     */
    function loadPage(page, previousPage, context, args) {

        // check to clean completely the previous page first
        // if the navigation its between subpages (tabs/section),
        // then page view controller takes care of it (realm/host pages)

        var insidePage = false;
        if (previousPage) {
            if (previousPage !== page) {
                _emptyPage(previousPage);
            } else {
                insidePage = true;
            }
        }

        // page controller

        switch (page) {

            case "map":
                var mapConfig = {
                    mode: "2d",
                    scope: context,
                    args: args,
                    user: config
                }

                if (!insidePage) {
                    mapPageView.load(mapConfig);
                } else {
                    mapPageView.loadResource(mapConfig);
                }

                break;

            case "user":
                userMainPageView.load();
                break;

            case "community":
                communityMainPageView.load();
                break;

            case "app":
                appMainPageView.load();
                break;

            case "error":
                // errorPageView.load();
                break;

            default:
                return;
        }
    }


    function _emptyPage(page) {

        // call pages destroy
        if (page === "map") {
            mapPageView.destroy();
        }

        // finally ensure all sub nodes are removed
        DOM.emptyId(page + 'Page');
    }


    // AUTH FUNCTIONS

    function logout() {
        var promise = connector.logout();
        promise.then(function () {
            location.reload();
        });
    }


    function login(credentials) {
        var errorPanel = DOM.getById("loginFormErrors");

        var promise = connector.login(credentials);
        promise.done(function (data) {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                errorPanel.style.display = "none";
                // TODO - avoid full reload but update app
                location.reload();

            } else {
                errorPanel.innerHTML = data.message;
                errorPanel.style.display = "block";
            }

        }).fail(function () {
            errorPanel.innerHTML = "Some error has occurred";
            errorPanel.style.display = "block";
        });
        // promise.then(function (data) {
        //     // location.reload();
        // });

    }

    function register(dashboardModal, userData) {
        var errorPanel = DOM.getById("registerFormErrors");

        var promise = connector.register(userData);
        promise.done(function (data) {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                errorPanel.style.display = "none";
                // TODO - avoid full reload but update app
                // location.reload();
                dashboardModal.hide();
                alertify.success('Congrats! You are you of us... login now!');

            } else {
                var errors = "";
                for (var key in data) {
                    // skip loop if the property is from prototype
                    if (!data.hasOwnProperty(key)) continue;

                    errors += data[key] + "<br>";
                }
                errorPanel.innerHTML = errors;
                errorPanel.style.display = "block";
            }

        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.log(">>> FAIL")
            console.log(jqXHR)
            console.log(textStatus)
            console.log(errorThrown)
            errorPanel.innerHTML = "Some error has occurred";
            errorPanel.style.display = "block";
        });
    }


    return {
        load: load,
        loadPage: loadPage,
    }

});