'use strict';

const api = (function(){

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com';

    function getBookmarks(callback) {
        $.getJSON(BASE_URL, callback);
    }

    function createNewBookmark(name) {
        

    }

    return {
        getBookmarks,
    };


}());