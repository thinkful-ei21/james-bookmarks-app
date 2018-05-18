'use strict';

const api = (function(){

    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/james';

    function getBookmarks(callback) {
        $.getJSON(`${BASE_URL}/bookmarks`, callback);
    }

    function createNewBookmark(title, url, desc, rating, callback) {
        const newBookmark = JSON.stringify({
            title: title,
            url: url,
            desc: desc,
            rating: rating,
        });

        console.log(title, url, desc, rating);

        $.ajax({
            url: `${BASE_URL}/bookmarks`,
            method: 'POST',
            contentType: 'application/json',
            data: newBookmark,
            success: callback,
        });
    }

    // function updateBookmark(id, updateData, callback) {
    //     $.ajax({
    //         url: `${BASE_URL}/bookmarks`,
    //         method: 'PATCH',
    //         contentType: 'application/json',
    //         data: updateData,
    //         success: callback,
    //     });
    // }

    function deleteBookmark(id, callback) {
        $.ajax({
            url: `${BASE_URL}/bookmarks/${id}`,
            method: 'DELETE',
            contentType: 'application/json',
            success: callback,
        });
    }

    return {
        getBookmarks,
        createNewBookmark,
        deleteBookmark,
    };


}());