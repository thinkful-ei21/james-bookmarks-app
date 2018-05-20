/* global bookmarks, api, store */

'use strict';

$(document).ready(function(){
    bookmarks.bindEventListeners();
    bookmarks.render();

    api.getBookmarks(items => {

        items.forEach(bookmark => {
            store.addItem(bookmark);
        });
        bookmarks.render();
    });
});