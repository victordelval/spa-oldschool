/**
 * DOM API (core module).
 * @module dom
 */

define(["jquery"], function ($) {

    "use strict"

    // vanilla

    var global = document;

    function getById(elemId) {
        return global.getElementById(elemId);
    }

    /**
     * This module is an abstraction to manipulate the DOM.
     * Now the implementation it is done with jQuery, but could be converted to vanilla js.
     */

    // TODO
    // prepend = prependId + prependClass(es)
    function prependToId(elemId, html) {
        $("#" + elemId).prepend(html);
    }


    function appendToId(elemId, html) {
        $("#" + elemId).append(html);
    }


    function emptyId(elemId) {
        $("#" + elemId).empty();
    }


    function removeId(elemId) {
        $("#" + elemId).remove();
    }


    return {
        // vanilla
        getById: getById,

        // jquery
        prependToId: prependToId,
        appendToId: appendToId,
        emptyId: emptyId,
        removeId: removeId
    }

});