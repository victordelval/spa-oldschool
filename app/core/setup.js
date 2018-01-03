/**
 * App setup and initializer.
 * @module setup
 */

define([
    // "pace",
    "jquery",
    "alertify",
    "managers/navigator",
    // "core/ajax"

], function ($, alertify, navigator) {
// ], function (pace, $, alertify, navigator, apiAjax) {

    "use strict"

    var state;
    // var config;

    /**
     * Resolve the application config and initialize managers passing the corresponding config.
     */
    function init() {
        if (state === "running") return;
        console.log(">>>> Setup >> init ")
        _checkUserIsLogged().then(function (data) {
            console.log(">>>> Setup >> running ")
            state = "running";
            if (data.user) alertify.success('You are logged in!');
            else alertify.error('You are not logged!');
            navigator.init(data);
            // apiAjax.init();
        });
    }

    /**
     * Auxiliar private to check auth via ajax
     */
    function _checkUserIsLogged() {
        return $.ajax({
            type: 'GET',
            url: "../data/user.json",
            error: function (data) {
                alertify.error('Error in Ajax request to check if user is logged!');
            }
        });


    }


    /**
     * Module api
     */
    return {
        run: init
    }

});